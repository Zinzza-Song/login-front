// src/api/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 쿠키 전송
});

// 요청 인터셉터: access token 헤더 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 → refresh 후 재시도
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (originalRequest._retry) return Promise.reject(err); // 무한 루프 방지

    if (err.response?.status === 401) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;

        // 쿠키에도 저장 (재요청시 헤더용)
        Cookies.set("accessToken", newAccessToken);

        // 기존 요청 헤더 갱신 후 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh 실패:", refreshError);
        window.location.href = "/login"; // 재발급 실패 시 로그인
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
