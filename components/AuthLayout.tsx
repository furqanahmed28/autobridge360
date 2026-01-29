"use client";

import { useAuthStore } from "../src/store/authStore";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  // If on login page, don't show the dashboard layout (sidebar/header)
  if (pathname === "/login") {
    return null;
  }

  // If authenticated, show the dashboard layout
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and not on login, don't show dashboard layout
  return null;
};