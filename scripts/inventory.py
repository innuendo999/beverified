#!/usr/bin/env python3
"""Step 2: content inventory.

Outputs (in reports/):
  content-inventory.csv  one row per page on the site + GSC metrics
  gsc-missing-urls.csv   URLs Google shows impressions for that the site no longer has
  rating-conflicts.csv   every place a provider's rating is shown, where values differ

Run from the repo root: python3 scripts/inventory.py
"""
import re
from collections import defaultdict

from sitelib import (clean, gsc_pages, issues, page_type, pages, parse_rating,
                     slug_from_href, soup, write_csv)

INV_FIELDS = ["url", "type", "title", "h1", "words", "providers_listed", "rating_shown",
              "pricing_present", "faq_count", "last_verified", "reviewer", "issues",
              "gsc_clicks", "gsc_impressions", "gsc_position", "decision", "notes"]


def main():
    gsc = gsc_pages()
    rows = []
    ratings = defaultdict(list)  # slug -> [(where, value)]
    names = {}

    for url, path in pages():
        s = soup(path)
        kind = page_type(s, url)
        main = s.select_one("main") or s
        text = clean(main) or ""
        byline = clean(s.select_one(".byline-text")) or ""
        m = re.search(r"Reviewed by (.+?) · Last verified (.+)$", byline)
        listed = []

        if kind == "provider":
            slug = url.strip("/").split("/", 1)[1]
            names[slug] = re.sub(r"\s+Review$", "", clean(s.select("nav.breadcrumb li")[-1]) or slug)
            badge = parse_rating(clean(s.select_one(".score-badge")))
            ratings[slug].append((f"{url} (own score)", badge))
            for a in s.select(".compare-table tbody tr"):
                link = a.select_one("a[href]")
                cells = a.select("td")
                if link and len(cells) >= 2:
                    ratings[slug_from_href(link["href"])].append((f"{url} (alternatives table)", parse_rating(clean(cells[1]))))
            for a in s.select("nav.related-list a[href]"):
                ratings[slug_from_href(a["href"])].append((f"{url} (sidebar competitors)", parse_rating(clean(a.select_one(".rating")))))
            rating_shown = badge
        else:
            rating_shown = None

        if kind == "category":
            for art in s.select("article.provider-article"):
                link = art.select_one(".provider-article__actions a.btn-outline[href]")
                slug = slug_from_href(link["href"]) if link else None
                listed.append(slug or clean(art.select_one(".provider-article__title")))
                if slug:
                    ratings[slug].append((f"{url} (ranked card)", parse_rating(clean(art.select_one(".provider-article__rating")))))
            for tr in s.select(".compare-table tbody tr[data-name]"):
                link = tr.select_one("a[href]")
                slug = slug_from_href(link["href"]) if link else None
                if slug:
                    ratings[slug].append((f"{url} (compare table)", float(tr["data-rating"])))

        if kind == "home":
            for a in s.select("a.provider-mini[href]"):
                ratings[slug_from_href(a["href"])].append(("/ (top rated strip)", parse_rating(clean(a.select_one(".provider-mini__rating")))))

        g = gsc.get(url, {})
        rows.append({
            "url": url, "type": kind,
            "title": clean(s.select_one("title")), "h1": clean(s.select_one("h1")),
            "words": len(text.split()),
            "providers_listed": " | ".join(x for x in listed if x),
            "rating_shown": rating_shown,
            "pricing_present": "y" if s.select_one("#pricing, .pricing-card, .price-from") else "n",
            "faq_count": len(s.select("details.faq-item")),
            "last_verified": m.group(2) if m else None,
            "reviewer": m.group(1) if m else None,
            "issues": " ".join(issues(s)),
            "gsc_clicks": g.get("clicks", 0), "gsc_impressions": g.get("impressions", 0),
            "gsc_position": g.get("position"),
        })

    rows.sort(key=lambda r: -r["gsc_impressions"])
    write_csv("reports/content-inventory.csv", rows, INV_FIELDS)

    site_urls = {r["url"] for r in rows}
    missing = [{"url": u, **v} for u, v in gsc.items() if u not in site_urls]
    missing.sort(key=lambda r: -r["impressions"])
    for r in missing:
        r["section"] = r["url"].strip("/").split("/")[0] or "/"
    write_csv("reports/gsc-missing-urls.csv", missing,
              ["url", "section", "clicks", "impressions", "position"])

    conflicts = []
    for slug, items in sorted(ratings.items()):
        if not slug:
            continue
        values = {v for _, v in items if v is not None}
        if len(values) > 1:
            for where, v in items:
                conflicts.append({"provider": slug, "shown_at": where, "rating": v,
                                  "distinct_values": " / ".join(str(x) for x in sorted(values))})
    write_csv("reports/rating-conflicts.csv", conflicts,
              ["provider", "distinct_values", "shown_at", "rating"])

    by_type = defaultdict(int)
    for r in rows:
        by_type[r["type"]] += 1
    print("pages:", dict(by_type))
    print("pages with issues:", sum(1 for r in rows if r["issues"]))
    print(f"GSC URLs missing from site: {len(missing)} "
          f"({sum(r['impressions'] for r in missing)} impressions, {sum(r['clicks'] for r in missing)} clicks)")
    print("providers with conflicting ratings:", len({c['provider'] for c in conflicts}))


if __name__ == "__main__":
    main()
