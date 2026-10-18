#!/usr/bin/env python3
"""Step 3: extract structured data from the current static pages.

Writes (never guesses; a value not found on the page stays empty):
  src/_data/providers/<slug>.yml   one record per provider review page
  src/_data/categories/<slug>.yml  category / region page content (intro, explainer, FAQ)
  src/_data/rankings.yml           ranked lists per category / region, in live order

Ratings are taken only from each provider's own review page. Ratings shown on
category pages and other providers' pages are kept as `legacy_rating_shown`
for reference; see reports/rating-conflicts.csv.

Run from the repo root: python3 scripts/extract.py
"""
import datetime
import pathlib
import re

import yaml

from sitelib import (clean, issues, page_type, pages, parse_rating,
                     slug_from_href, soup)

OUT = pathlib.Path("src/_data")


def iso_date(text):
    if not text:
        return None
    try:
        return datetime.datetime.strptime(text.strip(), "%b %d, %Y").date().isoformat()
    except ValueError:
        return None


def reviewer_and_date(s):
    byline = clean(s.select_one(".byline-text")) or ""
    m = re.search(r"Reviewed by (.+?) · Last verified (.+)$", byline)
    if not m:
        return None, None
    name, _, cred = m.group(1).partition(", ")
    return {"name": name, "credential": cred or None}, iso_date(m.group(2))


def meta(s, name):
    tag = s.select_one(f'meta[name="{name}"]')
    return tag["content"] if tag and tag.has_attr("content") else None


def strip_label(text, label):
    return re.sub(rf"^{label}\s*:?\s*", "", text or "").strip() or None


def section_paragraphs(sec):
    return [clean(p) for p in sec.find_all("p", recursive=False) if clean(p)] if sec else []


def extract_provider(url, s):
    slug = url.strip("/").split("/", 1)[1]
    crumbs = s.select("nav.breadcrumb li")
    name = re.sub(r"\s+Review$", "", clean(crumbs[-1]) or slug)
    primary = crumbs[1].select_one("a[href]") if len(crumbs) > 2 else None
    reviewer, verified = reviewer_and_date(s)
    logo = s.select_one(".review-hero__logo")
    verdict_link = s.select_one(".score-verdict a")
    visit = s.select_one("section .btn-primary[href^='http']")
    pricing = s.select_one("#pricing")
    note = s.select_one(".editorial-note")
    reviews = s.select_one("#reviews")

    def verdict_blocks(heading_word):
        out, active = [], False
        for el in reviews.select(".mini-grid > div > *") if reviews else []:
            if el.name == "p" and "review-verdict-block" not in (el.get("class") or []):
                active = heading_word in (clean(el) or "").lower()
                continue
            if active and "review-verdict-block" in (el.get("class") or []):
                out.append(clean(el.select_one("p")))
        return out

    return {
        "slug": slug,
        "name": name,
        "alternate_names": [],
        "status": "published",
        "seo": {
            "title": clean(s.select_one("title")),
            "description": meta(s, "description"),
            "h1": clean(s.select_one("h1")),
        },
        "logo": {
            "src": logo["src"] if logo and logo.has_attr("src") else None,
            "background": (re.search(r"background:\s*([^;]+)", logo.get("style", "")) or [None, None])[1] if logo else None,
        },
        "tagline": clean(s.select_one(".review-hero__sub")),
        "score": parse_rating(clean(s.select_one(".score-badge"))),
        "grade": (clean(s.select_one(".score-verdict")) or "").split(" · ")[0] or None,
        "primary_category": slug_from_href(primary["href"]) if primary else None,
        "legacy_rank_claim": clean(verdict_link),
        "categories": [slug_from_href(a["href"]) for a in s.select("section a.tag-pill[href]") if slug_from_href(a["href"])],
        "link": {
            "url": visit["href"] if visit else None,
            "type": None,  # affiliate | paid | none — set by the owner
            "legacy_rel": " ".join(visit.get("rel", [])) if visit else None,
        },
        "reviewer": reviewer,
        "last_verified": verified,
        "verdict": strip_label(clean(s.select_one(".callout")), "Quick verdict"),
        "what_is": section_paragraphs(s.select_one("#what-is")),
        "features": [re.sub(r"^[•·]\s*", "", clean(li) or "") for li in s.select("#features li")],
        "pricing": {
            "summary": " ".join(section_paragraphs(pricing)[:1]) or None,
            "plans": [{
                "tier": clean(c.select_one(".pricing-card__tier")),
                "price": clean(c.select_one(".pricing-card__price")),
                "note": clean(c.select_one(".pricing-card__note")),
                "extra": clean(c.select_one(".pricing-card__trial")),
            } for c in s.select(".pricing-card")],
            "legacy_verified_note": next((clean(p) for p in (pricing.select("p") if pricing else [])
                                          if (clean(p) or "").startswith("Pricing verified")), None),
            "verified": None,
            "items": [],  # sourced price points: {label, value, kind: official|third_party, source, verified}
        },
        "facts": [{"label": clean(r.select_one("dt")), "value": clean(r.select_one("dd")), "source": None}
                  for r in s.select(".quick-facts .fact-row")],
        "pros": [clean(li) for li in s.select("#pros-cons .pros-list li")],
        "cons": [clean(li) for li in s.select("#pros-cons .cons-list li")],
        "alternatives": [{
            "slug": slug_from_href(tr.select_one("a[href]")["href"]) if tr.select_one("a[href]") else None,
            "name": clean(tr.select_one(".provider-name-cell")),
            "best_for": clean(tr.select("td")[2]) if len(tr.select("td")) > 2 else None,
        } for tr in s.select("#alternatives tbody tr")],
        "choose_instead": [{
            "slug": slug_from_href(p.select_one("a[href]")["href"]) if p.select_one("a[href]") else None,
            "text": re.sub(r"^Choose .+? instead if\s*", "", clean(p) or ""),
        } for p in s.select("#alternatives p") if (clean(p) or "").startswith("Choose ")],
        "user_reviews": {
            "legacy_note": clean(reviews.select_one("h2 + p")) if reviews else None,
            "praise": verdict_blocks("praise"),
            "criticize": verdict_blocks("critic"),
            "by_profile": verdict_blocks("profile"),
        },
        "faq": [{"q": clean(d.select_one("summary")), "a": clean(d.select_one("p"))}
                for d in s.select("#faq details.faq-item")],
        # Not on the current pages — filled during research (see reports/content-gaps.csv)
        "segments": [],
        "capabilities": {},
        "certifications": [],
        "user_ratings": [],
        "use_case_verdicts": [],
        "score_breakdown": [],
        "hands_on": None,
        "sources": [],
        "entity": {"wikidata": None, "kg_mid": None, "same_as": []},
        "legacy_issues": issues(s),
        "legacy_editorial_note": strip_label(clean(note), "Editorial note \\(pre-publish\\)") if note else None,
    }


def extract_category(url, s):
    slug = url.strip("/").split("/", 1)[1]
    reviewer, verified = reviewer_and_date(s)
    providers = []
    for art in s.select("article.provider-article"):
        link = art.select_one(".provider-article__actions a.btn-outline[href]")
        pills = [clean(p) for p in art.select(".meta-pill")]
        providers.append({
            "slug": slug_from_href(link["href"]) if link else None,
            "name": clean(art.select_one(".provider-article__title")),
            "award": re.sub(r"^#\d+\s*", "", clean(art.select_one(".rank-badge")) or "") or None,
            "tagline": clean(art.select_one(".provider-article__tagline")),
            "coverage": next((strip_label(p, "Coverage") for p in pills if p.startswith("Coverage")), None),
            "size": next((strip_label(p, "Size") for p in pills if p.startswith("Size")), None),
            "pros": [clean(li) for li in art.select(".pros-list li")],
            "cons": [clean(li) for li in art.select(".cons-list li")],
            "legacy_price_shown": clean(art.select_one(".price-from__value")),
            "legacy_rating_shown": parse_rating(clean(art.select_one(".provider-article__rating"))),
            "segments": [],
        })
    main = s.select_one("main.page-main")
    explainer = []
    if main:
        for sec in main.find_all("section", recursive=False):
            if sec.get("id") in ("compare-table", "faq"):
                continue
            explainer.append(str(sec))
    category = {
        "slug": slug,
        "url": url,
        "seo": {"title": clean(s.select_one("title")), "description": meta(s, "description"),
                "h1": clean(s.select_one("h1"))},
        "breadcrumb_label": clean(s.select("nav.breadcrumb li")[-1]),
        "quick_answer": strip_label(clean(s.select_one(".callout")), "Quick answer"),
        "reviewer": reviewer,
        "last_verified": verified,
        "legacy_stats": [{"value": clean(st.select_one(".stat__value")), "label": clean(st.select_one(".stat__label"))}
                         for st in s.select(".editorial-byline .stat")],
        "explainer_html": explainer,  # legacy markup; rewrite into fields when the template is built
        "faq": [{"q": clean(d.select_one("summary")), "a": clean(d.select_one("p"))}
                for d in s.select("details.faq-item")],
        "adjacent": [],
        "capability_columns": [],
        "faq_templates": [],
        "legacy_issues": issues(s),
    }
    return category, {"title": category["seo"]["h1"], "providers": providers}


def dump(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(yaml.safe_dump(data, sort_keys=False, allow_unicode=True, width=100000), encoding="utf-8")


def main():
    rankings, n_prov, n_cat, empty = {}, 0, 0, []
    for url, path in pages():
        s = soup(path)
        kind = page_type(s, url)
        if kind == "provider":
            rec = extract_provider(url, s)
            for key in ("name", "score", "verdict", "features", "pros", "cons", "faq"):
                if not rec[key]:
                    empty.append(f"{rec['slug']}: {key}")
            dump(OUT / "providers" / f"{rec['slug']}.yml", rec)
            n_prov += 1
        elif kind == "category":
            cat, ranking = extract_category(url, s)
            dump(OUT / "categories" / f"{cat['slug'].replace('/', '-')}.yml", cat)
            rankings[cat["slug"]] = ranking
            n_cat += 1
    dump(OUT / "rankings.yml", rankings)
    print(f"providers: {n_prov}, categories: {n_cat}")
    print("empty key fields:", empty or "none")


if __name__ == "__main__":
    main()
