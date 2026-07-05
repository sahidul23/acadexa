import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add access token to every request
api.interceptors.request.use(async (config) => {
  let access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (access) {
    try {
      const payload = JSON.parse(atob(access.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired && refresh) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/token/refresh/`,
          {
            refresh: refresh,
          }
        );

        access = response.data.access;
        localStorage.setItem("access", access);
      }

      config.headers.Authorization = `Bearer ${access}`;
    } catch (error) {
      console.error("Token refresh failed", error);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
  }

  return config;
});

export default api;