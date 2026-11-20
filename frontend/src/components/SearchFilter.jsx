
import { Search, SlidersHorizontal, X } from "lucide-react";

const categories = [
  "Application Security",
  "Cloud Security",
  "Network Security",
  "Ethical Hacking",
];

export default function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) {
  const hasFilters = Boolean(search || category);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setSort("newest");
  }

  return (
    <div className="catalog-toolbar">
      <div className="catalog-toolbar-heading">
        <div>
          <SlidersHorizontal size={19} />
          <strong>Find learning resources</strong>
        </div>

        {hasFilters && (
          <button
            type="button"
            className="clear-filters"
            onClick={clearFilters}
          >
            <X size={15} />
            Clear filters
          </button>
        )}
      </div>

      <div className="catalog-controls">
        <div className="catalog-search">
          <label htmlFor="resource-search">Search resources</label>

          <div className="catalog-search-field">
            <Search size={19} aria-hidden="true" />

            <input
              id="resource-search"
              type="search"
              placeholder="Search books, topics, guides..."
              value={search}
              maxLength={100}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="catalog-select">
          <label htmlFor="resource-category">Category</label>

          <select
            id="resource-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="catalog-select">
          <label htmlFor="resource-sort">Sort by</label>

          <select
            id="resource-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">Title A–Z</option>
            <option value="za">Title Z–A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
