const API_URL = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

if (!API_URL) {
  throw new Error("VITE_API_URL is not configured");
}

export { API_URL };

export async function apiFetch(path, options = {}) {
  const { timeoutMs = 8000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(`${API_URL}${path}`, {
      ...fetchOptions,
      signal: fetchOptions.signal || controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}
