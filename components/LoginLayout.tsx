"use client";

import { useAuthStore } from "../src/store/authStore";
import { usePathname } from "next/navigation";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  // Only show login layout on login page and when not authenticated
  if (pathname === "/login" && !isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};