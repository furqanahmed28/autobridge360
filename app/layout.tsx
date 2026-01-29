import "./globals.css";
import type { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { AuthProvider } from "../components/AuthProvider";
import { AuthLayout } from "../components/AuthLayout";
import { LoginLayout } from "../components/LoginLayout";

export const metadata = {
  title: "AutoBridge360 Prototype",
  description: "Vehicle import lifecycle & provenance platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-slate-900 antialiased">
        <AuthProvider>
          <AuthLayout>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 lg:px-12 erp-fade-in">
                  <div className="mx-auto max-w-7xl">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </AuthLayout>
          <LoginLayout>{children}</LoginLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

