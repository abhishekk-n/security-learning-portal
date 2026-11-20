
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/resources`;

export async function getResources(
  type = "",
  category = "",
  search = "",
  options = {}
) {
  const params = new URLSearchParams();

  if (type) params.set("type", type);
  if (category) params.set("category", category);
  if (search.trim()) params.set("search", search.trim());

  const url = params.toString()
    ? `${API_URL}?${params.toString()}`
    : API_URL;

  const response = await fetch(url, {
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch resources: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Invalid resources API response");
  }

  return result.data;
}
