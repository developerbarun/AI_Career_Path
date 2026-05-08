const API_BASE = "http://localhost:5000/api";

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

// Path Generation APIs
export async function generateCareerPath(quizAnswers, userId, matchPercent) {
  const res = await fetch(`${API_BASE}/paths/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quizAnswers, userId, matchPercent }),
  });
  if (!res.ok) throw new Error("Failed to generate career path");
  return res.json();
}

export async function getUserPaths(userId) {
  const res = await fetch(`${API_BASE}/paths/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user paths");
  return res.json();
}

export async function getGeneratedPath(pathId) {
  const res = await fetch(`${API_BASE}/paths/${pathId}`);
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customizations, completedTopics }),
  });
  if (!res.ok) throw new Error("Failed to update path");
  return res.json();
}

export async function deleteGeneratedPath(pathId, userId) {
  const res = await fetch(`${API_BASE}/paths/${pathId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error("Failed to delete path");
  return res.json();
}
