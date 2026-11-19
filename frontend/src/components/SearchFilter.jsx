
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
}) {
  return (
    <div className="search-filter">
      <input
        type="search"
        placeholder="Search cybersecurity resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search resources"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
