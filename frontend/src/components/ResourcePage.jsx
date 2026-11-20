
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  FileText,
  RefreshCw,
  SearchX,
  Video,
} from "lucide-react";

import { getResources } from "../services/resourceService";
import ResourceCard from "./ResourceCard";
import SearchFilter from "./SearchFilter";

const validCategories = [
  "Application Security",
  "Cloud Security",
  "Network Security",
  "Ethical Hacking",
];

const typeIcons = {
  BOOK: BookOpen,
  VIDEO: Video,
  ARTICLE: FileText,
};

function sortResources(resources, sort) {
  const items = [...resources];

  switch (sort) {
    case "oldest":
      return items.sort(
        (a, b) =>
          new Date(a.createdAt) - new Date(b.createdAt)
      );

    case "az":
      return items.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "za":
      return items.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    default:
      return items.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
  }
}

export default function ResourcePage({
  title,
  description,
  type,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category") || "";
  const category = validCategories.includes(categoryParam)
    ? categoryParam
    : "";

  const search = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "newest";
  const sort = ["newest", "oldest", "az", "za"].includes(sortParam)
    ? sortParam
    : "newest";

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const Icon = typeIcons[type] || BookOpen;

  function updateFilter(key, value) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }

      return next;
    }, { replace: true });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  useEffect(() => {
    let active = true;

    const timeout = setTimeout(async () => {
      if (!active) return;

      setLoading(true);
      setError("");

      try {
        const data = await getResources(type, category, search);

        if (active) {
          setResources(data);
        }
      } catch {
        if (active) {
          setError(
            "We couldn't load your learning resources. Please try again."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [type, category, search, retryCount]);

  const sortedResources = useMemo(
    () => sortResources(resources, sort),
    [resources, sort]
  );

  return (
    <main className="resources-page catalog-page">
      <div className="catalog-heading">
        <span className="section-label">
          CYBERSECURITY LEARNING LIBRARY
        </span>

        <div className="catalog-title-row">
          <div className="catalog-title-icon">
            <Icon size={29} />
          </div>

          <h1>{title}</h1>
        </div>

        <p>{description}</p>
      </div>

      <SearchFilter
        search={search}
        setSearch={(value) => updateFilter("search", value)}
        category={category}
        setCategory={(value) => updateFilter("category", value)}
        sort={sort}
        setSort={(value) => updateFilter("sort", value)}
      />

      <div className="catalog-results-heading">
        <div>
          <h2>Explore resources</h2>
          <p role="status">
            {loading
              ? "Searching the library..."
              : error
                ? "Unable to display results"
                : `${sortedResources.length} ${
                    sortedResources.length === 1
                      ? "resource"
                      : "resources"
                  } found`}
          </p>
        </div>
      </div>

      {loading && (
        <div className="resource-grid" aria-label="Loading resources">
          {[1, 2, 3].map((item) => (
            <div className="featured-skeleton" key={item}>
              <div className="skeleton-image" />
              <div className="skeleton-content">
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="catalog-empty" role="alert">
          <RefreshCw size={36} />
          <h3>Something went wrong</h3>
          <p>{error}</p>

          <button
            type="button"
            className="hero-button primary catalog-button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            <RefreshCw size={17} />
            Retry loading
          </button>
        </div>
      )}

      {!loading && !error && sortedResources.length === 0 && (
        <div className="catalog-empty">
          <SearchX size={42} />
          <h3>No matching resources</h3>
          <p>
            Try another search term or select a different category.
          </p>

          <button
            type="button"
            className="hero-button primary catalog-button"
            onClick={clearFilters}
          >
            Clear all filters
            <ArrowRight size={17} />
          </button>
        </div>
      )}

      {!loading && !error && sortedResources.length > 0 && (
        <div className="resource-grid">
          {sortedResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>
      )}
    </main>
  );
}
