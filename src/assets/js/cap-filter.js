// Capability matrix filter on category pages (src/categories.njk).
// Progressive enhancement: the full table is in the HTML; this only hides rows.
(function () {
  var root = document.querySelector("[data-cap-filter]");
  var table = document.querySelector(".cap-table");
  if (!root || !table) return;
  var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr"));
  var boxes = Array.prototype.slice.call(root.querySelectorAll(".cap-chip input"));
  var addons = root.querySelector("[data-cap-addons]");
  var count = root.querySelector("[data-cap-count]");
  var clear = root.querySelector("[data-cap-clear]");
  var empty = document.querySelector("[data-cap-empty]");
  var wrap = table.closest(".cap-matrix");

  function has(row, key) {
    var v = row.getAttribute("data-" + key.replace(/_/g, "-"));
    if (key === "deployment") return v === "on_prem" || v === "cloud_and_on_prem";
    if (key === "published_pricing") return v === "yes" || v === "partial";
    return v === "yes" || (addons.checked && v === "add_on");
  }

  function apply() {
    var keys = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
    var shown = 0;
    rows.forEach(function (r) {
      var ok = keys.every(function (k) { return has(r, k); });
      r.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = keys.length ? "Showing " + shown + " of " + rows.length + " providers" : "Showing all " + rows.length + " providers";
    clear.hidden = !keys.length;
    empty.hidden = shown > 0;
    if (wrap) wrap.hidden = shown === 0;
  }

  boxes.concat([addons]).forEach(function (b) { b.addEventListener("change", apply); });
  clear.addEventListener("click", function () {
    boxes.forEach(function (b) { b.checked = false; });
    apply();
    if (boxes[0]) boxes[0].focus();
  });
  root.hidden = false;
  apply();
})();
