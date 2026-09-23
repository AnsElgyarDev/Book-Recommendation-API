import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Unwrap to response.data on success; normalize error shape on failure so
// callers/hooks can just read `error.message` and `error.status`.
httpClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status;
    const message =
      err.response?.data?.message ||
      err.response?.data?.title || // ASP.NET ProblemDetails uses `title`
      (typeof err.response?.data === "string" ? err.response.data : null) ||
      "Something went wrong. Please try again.";

    const normalized = new Error(message);
    normalized.status = status;
    return Promise.reject(normalized);
  }
);

export default httpClient;
