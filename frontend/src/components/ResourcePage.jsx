
import { useEffect, useState } from "react";
import { getResources } from "../services/resourceService";
import ResourceCard from "./ResourceCard";
import SearchFilter from "./SearchFilter";

export default function ResourcePage({
  title,
  description,
  type,
}) {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const timeout = setTimeout(async () => {
      try {
        if (active) {
          setLoading(true);
          setError("");
        }

        const data = await getResources(
          type,
          category,
          search
        );

        if (active) setResources(data);
      } catch {
        if (active) {
          setError("Unable to load resources.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [type, category, search]);

  return (
    <main className="resources-page">
      <h1>{title}</h1>
      <p>{description}</p>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      {loading && <p>Loading resources...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <p>
            Found {resources.length} resource(s)
          </p>

          <div className="resource-grid">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                />
              ))
            ) : (
              <p>No matching resources found.</p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
