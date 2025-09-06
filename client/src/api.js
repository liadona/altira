// client/src/api.js
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

fetch(`${API}/api/artikel`)
  .then(res => res.json())
  .then(data => console.log(data));


export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  }).then(res => {
    if (!res.ok) throw new Error("API error");
    return res.json();
  });
}
