const GUEST_USER_KEY = "aicp_guest_user_id";
const LEGACY_USER_KEY = "userId";

function buildGuestUserId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `guest_${crypto.randomUUID()}`;
  }

  return `guest_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getOrCreateGuestUserId() {
  try {
    const existingGuestId = localStorage.getItem(GUEST_USER_KEY);
    if (existingGuestId) return existingGuestId;

    // Reuse legacy ID so existing generated paths remain linked.
    const legacyUserId = localStorage.getItem(LEGACY_USER_KEY);
    const resolvedId = legacyUserId || buildGuestUserId();

    localStorage.setItem(GUEST_USER_KEY, resolvedId);
    localStorage.setItem(LEGACY_USER_KEY, resolvedId);

    return resolvedId;
  } catch {
    return buildGuestUserId();
  }
}
