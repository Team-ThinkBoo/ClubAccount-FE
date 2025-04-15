// api/axiosInstance.ts
import axios from "axios";
import { AUTH_SEARCH_PARAMS } from "../constants/constants";

const instance = axios.create({
  baseURL: "",
  withCredentials: true
});

// 요청 인터셉터
instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 + 재시도 안한 요청이면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 요청
        const res = await axios.post("/api/v1/auth/token", {}, { withCredentials: true });
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // 새 토큰으로 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshErr) {
        // 재발급 실패 → 로그아웃 처리 or 에러 전파
        localStorage.removeItem("accessToken");
        alert("로그인상태가 만료되었습니다!");
        window.location.href = `/auth?mode=${AUTH_SEARCH_PARAMS.LOGIN}`;
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
