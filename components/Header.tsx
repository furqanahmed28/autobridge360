"use client";

import { Search, UserCircle2, Bell, LogOut, Settings, ChevronDown } from "lucide-react";
import { usePersonaStore, type Persona } from "../src/store/personaStore";
import { useAuthStore } from "../src/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const personas: Persona[] = ["Importer", "Owner"];

export const Header = () => {
  const { persona, setPersona } = usePersonaStore();
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className={`sticky top-0 z-30 border-b border-slate-200/60 bg-white/95 backdrop-blur-lg shadow-soft transition-all duration-200 ${mounted ? 'erp-slide-up' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className={`
              relative flex items-center gap-3 rounded-xl border bg-slate-50/80 px-4 py-2.5 text-sm transition-all duration-200
              ${searchFocused
                ? 'border-accent-300 bg-white shadow-medium ring-2 ring-accent-100'
                : 'border-slate-200 hover:border-slate-300 hover:bg-white/50'
              }
            `}>
              <Search className={`h-4 w-4 transition-colors duration-200 ${searchFocused ? 'text-accent-500' : 'text-slate-400'}`} />
              <input
                placeholder="Search VIN, chassis, customer..."
                className="flex-1 bg-transparent text-slate-700 placeholder:text-slate-400 outline-none"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              {searchFocused && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* Persona Selector */}
            <div className="hidden items-center gap-3 md:flex">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  View As
                </div>
                <div className="text-sm font-semibold text-slate-700">{persona}</div>
              </div>
              <div className="relative">
                <select
                  value={persona}
                  onChange={(e) => setPersona(e.target.value as Persona)}
                  className="appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-300 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100 transition-all duration-200 cursor-pointer"
                >
                  {personas.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Mobile Persona Selector */}
            <div className="md:hidden">
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value as Persona)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
              >
                {personas.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Notifications */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-colors duration-200">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-100">
                <UserCircle2 className="h-4 w-4 text-accent-600" />
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-medium text-slate-900">
                  {user?.username || (persona === "Importer" ? "Nagoya Imports Ltd" : "Owner Wallet")}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                  {persona === "Importer" ? "Import Manager" : "Vehicle Owner"}
                </div>
              </div>
            </div>

            {/* Settings */}
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-colors duration-200">
              <Settings className="h-4 w-4" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

