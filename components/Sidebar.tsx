"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, FileText, LayoutDashboard, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, description: "Overview and metrics" },
  { href: "/upload", label: "Document AI", icon: FileText, description: "AI-powered document processing" },
  { href: "/reports", label: "Reports", icon: Car, description: "Analytics and insights" }
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`
        fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-slate-200/60 bg-white shadow-large transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-soft
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${mounted ? 'erp-slide-up' : ''}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-600 shadow-sm">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 tracking-tight">
                AutoBridge360
              </div>
              <div className="text-xs text-slate-500">
                Import Lifecycle Command Center
              </div>
            </div>
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 md:hidden transition-colors duration-200"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4" role="navigation" aria-label="Main navigation">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
                  ${active
                    ? "bg-accent-50 text-accent-700 shadow-sm border border-accent-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                  ${mounted ? 'erp-fade-in' : ''}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-current={active ? "page" : undefined}
              >
                <div className={`
                  flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200
                  ${active
                    ? "bg-accent-100 text-accent-600"
                    : "bg-slate-100 text-slate-500 group-hover:bg-accent-100 group-hover:text-accent-600"
                  }
                `}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item.label}</div>
                  <div className="text-xs text-slate-400 truncate">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200/60 px-3 py-3">
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 text-center">
            <div className="font-medium text-slate-700">Prototype</div>
            <div>AutoBridge360</div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 md:hidden transition-all duration-200"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
};

