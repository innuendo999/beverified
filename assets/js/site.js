// BeVerified — progressive enhancement only. Every page is fully usable with
// this script disabled: all providers/categories are already present and
// linked in the HTML. This script only adds live search/filter/sort/paginate
// behavior on top of that baseline.
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || navToggle.contains(e.target)) return;
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------------- Homepage / directory search-chip fill ---------------- */
  document.querySelectorAll('[data-chip-fill]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var input = document.querySelector('[data-search-input]');
      if (!input) return;
      input.value = chip.getAttribute('data-chip-fill');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    });
  });

  /* ---------------- Homepage: filter category/region cards by search ---------------- */
  var homeSearch = document.querySelector('[data-home-search]');
  if (homeSearch) {
    var homeCards = Array.prototype.slice.call(document.querySelectorAll('[data-home-card]'));
    var homeEmptyMsgs = document.querySelectorAll('[data-home-empty]');
    var applyHomeFilter = function () {
      var q = homeSearch.value.trim().toLowerCase();
      var groups = {};
      homeCards.forEach(function (card) {
        var group = card.getAttribute('data-home-group');
        var name = (card.getAttribute('data-name') || '').toLowerCase();
        var desc = (card.getAttribute('data-desc') || '').toLowerCase();
        var match = !q || name.indexOf(q) !== -1 || desc.indexOf(q) !== -1;
        card.hidden = !match;
        groups[group] = groups[group] || 0;
        if (match) groups[group]++;
      });
      homeEmptyMsgs.forEach(function (msg) {
        var group = msg.getAttribute('data-home-empty');
        msg.hidden = !q || (groups[group] || 0) > 0;
      });
    };
    homeSearch.addEventListener('input', applyHomeFilter);
  }

  /* ---------------- Category page: region/size/sort filtering ---------------- */
  var catRoot = document.querySelector('[data-category-filter]');
  if (catRoot) {
    var regionSel = catRoot.querySelector('[data-cat-region]');
    var sizeSel = catRoot.querySelector('[data-cat-size]');
    var sortSel = catRoot.querySelector('[data-cat-sort]');
    var list = catRoot.querySelector('[data-provider-list]');
    var items = list ? Array.prototype.slice.call(list.children) : [];
    var tableBody = catRoot.querySelector('[data-compare-tbody]');
    var tableRows = tableBody ? Array.prototype.slice.call(tableBody.children) : [];
    var countEl = catRoot.querySelector('[data-result-count]');

    var rowMatches = function (el) {
      var regions = (el.getAttribute('data-region') || '').split('|');
      var regionOk = !regionSel || regionSel.value === 'all' || regions.indexOf('Global') !== -1 || regions.indexOf(regionSel.value) !== -1;
      var sizes = (el.getAttribute('data-size') || '').split('|');
      var sizeOk = !sizeSel || sizeSel.value === 'all' || sizes.indexOf(sizeSel.value) !== -1;
      return regionOk && sizeOk;
    };

    var applyCat = function () {
      var shown = 0;
      items.forEach(function (el) {
        var match = rowMatches(el);
        el.hidden = !match;
        if (match) shown++;
      });
      tableRows.forEach(function (el) { el.hidden = !rowMatches(el); });
      if (countEl) countEl.textContent = shown;

      if (sortSel) {
        var key = sortSel.value;
        var sortFn = null;
        if (key === 'rating') sortFn = function (a, b) { return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating')); };
        else if (key === 'price') sortFn = function (a, b) { return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')); };
        else if (key === 'name') sortFn = function (a, b) { return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name')); };
        if (sortFn) {
          if (list) items.slice().sort(sortFn).forEach(function (el) { list.appendChild(el); });
          if (tableBody) tableRows.slice().sort(sortFn).forEach(function (el) { tableBody.appendChild(el); });
        } else if (key === 'rank') {
          var byRank = function (a, b) { return parseInt(a.getAttribute('data-rank'), 10) - parseInt(b.getAttribute('data-rank'), 10); };
          if (list) items.slice().sort(byRank).forEach(function (el) { list.appendChild(el); });
          if (tableBody) tableRows.slice().sort(byRank).forEach(function (el) { tableBody.appendChild(el); });
        }
      }
    };
    [regionSel, sizeSel, sortSel].forEach(function (el) { if (el) el.addEventListener('change', applyCat); });
  }

  /* ---------------- Sponsor / glossary disclosures: no JS needed (native <details>) ---------------- */

  /* ---------------- Reviews directory: search + facets + sort + paginate ---------------- */
  var dirRoot = document.querySelector('[data-directory]');
  if (dirRoot) {
    var grid = dirRoot.querySelector('[data-directory-grid]');
    var cards = grid ? Array.prototype.slice.call(grid.children) : [];
    var searchInput = dirRoot.querySelector('[data-directory-search]');
    var sortSelect = dirRoot.querySelector('[data-directory-sort]');
    var viewToggle = dirRoot.querySelector('[data-directory-view-toggle]');
    var catBoxes = Array.prototype.slice.call(dirRoot.querySelectorAll('[data-facet-category]'));
    var regionBoxes = Array.prototype.slice.call(dirRoot.querySelectorAll('[data-facet-region]'));
    var priceRadios = Array.prototype.slice.call(dirRoot.querySelectorAll('[data-facet-price]'));
    var ratingBox = dirRoot.querySelector('[data-facet-rating]');
    var resultCount = dirRoot.querySelector('[data-result-count]');
    var shownCount = dirRoot.querySelector('[data-shown-count]');
    var pagination = dirRoot.querySelector('[data-pagination]');
    var letterNav = dirRoot.querySelector('[data-letter-nav]');
    var pageSize = 12;
    var currentPage = 1;

    var getChecked = function (boxes) {
      return boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
    };

    var compute = function () {
      var q = (searchInput ? searchInput.value : '').trim().toLowerCase();
      var cats = getChecked(catBoxes);
      var regions = getChecked(regionBoxes);
      var priceChecked = priceRadios.filter(function (r) { return r.checked; })[0];
      var price = priceChecked ? priceChecked.value : 'all';
      var minRating = ratingBox && ratingBox.checked ? 4 : 0;

      var filtered = cards.filter(function (card) {
        var name = (card.getAttribute('data-name') || '').toLowerCase();
        var region = card.getAttribute('data-region') || '';
        var tags = (card.getAttribute('data-categories') || '').split('|');
        var cardPrice = card.getAttribute('data-price') || '';
        var rating = parseFloat(card.getAttribute('data-rating') || '0');
        if (q && name.indexOf(q) === -1) return false;
        if (cats.length && !cats.some(function (c) { return tags.indexOf(c) !== -1; })) return false;
        if (regions.length && regions.indexOf(region) === -1) return false;
        if (price !== 'all' && cardPrice !== price) return false;
        if (rating < minRating) return false;
        return true;
      });

      var sortKey = sortSelect ? sortSelect.value : 'name-asc';
      filtered.sort(function (a, b) {
        if (sortKey === 'name-desc') return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
        if (sortKey === 'rating-desc') return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
        if (sortKey === 'recent') return new Date(b.getAttribute('data-reviewed')) - new Date(a.getAttribute('data-reviewed'));
        return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
      });

      return filtered;
    };

    var render = function () {
      var filtered = compute();
      var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
      if (currentPage > totalPages) currentPage = totalPages;
      var start = (currentPage - 1) * pageSize;
      var slice = filtered.slice(start, start + pageSize);

      cards.forEach(function (c) { c.hidden = true; });
      slice.forEach(function (c) { c.hidden = false; grid.appendChild(c); });

      if (resultCount) resultCount.textContent = filtered.length;
      if (shownCount) shownCount.textContent = slice.length;

      if (letterNav) {
        var available = {};
        filtered.forEach(function (c) { available[(c.getAttribute('data-name') || '?')[0].toUpperCase()] = true; });
        Array.prototype.slice.call(letterNav.children).forEach(function (el) {
          var ch = el.getAttribute('data-letter');
          el.classList.toggle('is-available', !!available[ch]);
        });
      }

      if (pagination) {
        pagination.innerHTML = '';
        var mkBtn = function (label, page, disabled, current) {
          var b = document.createElement('button');
          b.type = 'button';
          b.textContent = label;
          if (current) b.setAttribute('aria-current', 'page');
          if (disabled) b.setAttribute('aria-disabled', 'true');
          b.disabled = !!disabled;
          b.addEventListener('click', function () { currentPage = page; render(); pagination.closest('[data-directory]').scrollIntoView({ block: 'start', behavior: 'smooth' }); });
          return b;
        };
        pagination.appendChild(mkBtn('← Prev', Math.max(1, currentPage - 1), currentPage === 1, false));
        for (var p = 1; p <= totalPages; p++) pagination.appendChild(mkBtn(String(p), p, false, p === currentPage));
        pagination.appendChild(mkBtn('Next →', Math.min(totalPages, currentPage + 1), currentPage === totalPages, false));
      }
    };

    [searchInput, sortSelect].forEach(function (el) { if (el) el.addEventListener('input', function () { currentPage = 1; render(); }); });
    catBoxes.concat(regionBoxes).concat(priceRadios).forEach(function (el) { el.addEventListener('change', function () { currentPage = 1; render(); }); });
    if (ratingBox) ratingBox.addEventListener('change', function () { currentPage = 1; render(); });
    if (viewToggle) {
      viewToggle.addEventListener('click', function () {
        var isList = grid.classList.toggle('view-list');
        grid.classList.toggle('view-grid', !isList);
        viewToggle.textContent = isList ? 'Grid view' : 'List view';
      });
    }
    if (letterNav) {
      letterNav.addEventListener('click', function (e) {
        var el = e.target.closest('[data-letter]');
        if (!el || !el.classList.contains('is-available')) return;
        e.preventDefault();
        if (sortSelect) { sortSelect.value = 'name-asc'; }
        currentPage = 1;
        render();
        var target = grid.querySelector('[data-name^="' + el.getAttribute('data-letter').toLowerCase() + '" i]');
        if (target) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    }

    render();
  }
})();
