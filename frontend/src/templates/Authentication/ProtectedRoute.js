import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

const ProtectedRoute = ({ children }) => {
  // Zustand 스토어에서 accessToken 가져오기
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    // accessToken이 없으면 로그인 페이지로 리디렉션
    return <Navigate to="/member/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
