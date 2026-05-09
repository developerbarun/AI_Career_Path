const API_BASE = "http://localhost:5000/api";

// Helper to get auth token
function getAuthToken() {
  return localStorage.getItem("aicp_token");
}

// Helper to create auth headers
function getAuthHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchCareers() {
  const res = await fetch(`${API_BASE}/careers`);
  if (!res.ok) throw new Error("Failed to fetch careers");
  return res.json();
}

export async function fetchCareerBySlug(slug) {
  const res = await fetch(`${API_BASE}/careers/${slug}`);
  if (!res.ok) throw new Error("Career not found");
  return res.json();
}

export async function fetchResources(filters = {}) {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_BASE}/resources?${params}`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function fetchQuiz() {
  const res = await fetch(`${API_BASE}/quiz`);
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
}

export async function submitQuiz(answers) {
  const res = await fetch(`${API_BASE}/quiz/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error("Failed to submit quiz");
  return res.json();
}

// Path Generation APIs (Protected - require auth token)
export async function generateCareerPath(
  quizAnswers,
  matchPercent,
  recommendedCareerSlug = "",
) {
  const res = await fetch(`${API_BASE}/paths/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      quizAnswers,
      matchPercent,
      recommendedCareerSlug,
    }),
  });
  if (!res.ok) throw new Error("Failed to generate career path");
  return res.json();
}

export async function getUserPaths() {
  const res = await fetch(`${API_BASE}/paths/user/me`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch user paths");
  return res.json();
}

export async function getGeneratedPath(pathId) {
  const res = await fetch(`${API_BASE}/paths/${pathId}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch path");
  return res.json();
}

export async function updatePathCustomizations(
  pathId,
  customizations,
  completedTopics,
) {
  const res = await fetch(`${API_BASE}/paths/${pathId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ customizations, completedTopics }),
  });
  if (!res.ok) throw new Error("Failed to update path");
  return res.json();
}

export async function deleteGeneratedPath(pathId) {
  const res = await fetch(`${API_BASE}/paths/${pathId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to delete path");
  return res.json();
}
