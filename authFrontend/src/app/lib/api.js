
const rawApiUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).trim().replace(/\/+$/, "");

export const API_URL = rawApiUrl.endsWith("/api")
  ? rawApiUrl
  : `${rawApiUrl}/api`;

export async function apiRequest(endpoint, options = {}) {
  const normalizedEndpoint = `/${endpoint.replace(/^\/+/, "")}`;
  const response = await fetch(`${API_URL}${normalizedEndpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}