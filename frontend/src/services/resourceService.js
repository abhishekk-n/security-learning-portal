
const API_URL = "http://localhost:5000/api/resources";

export async function getResources(
  type = "",
  category = "",
  search = ""
) {
  const params = new URLSearchParams();

  if (type) params.set("type", type);
  if (category) params.set("category", category);
  if (search.trim()) params.set("search", search.trim());

  const url = params.toString()
    ? `${API_URL}?${params.toString()}`
    : API_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch resources");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Resource API returned an error");
  }

  return result.data;
}
