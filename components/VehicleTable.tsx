"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, FileText, Clock } from "lucide-react";
import { vehicles } from "../src/lib/mockData";
import { StatusBadge, RiskPill } from "./StatusBadge";
import { usePersonaStore } from "../src/store/personaStore";
import { useState, useEffect } from "react";

export const VehicleTable = () => {
  const { persona } = usePersonaStore();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const visibleVehicles =
    persona === "Importer"
      ? vehicles
      : vehicles.filter((v) => v.ownerRoleView === "Owner");

  if (isLoading) {
    return (
      <div className="erp-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="erp-loading-skeleton h-5 w-32"></div>
              <div className="erp-loading-skeleton h-3 w-64"></div>
            </div>
            <div className="erp-loading-skeleton h-8 w-32"></div>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="erp-loading-skeleton h-4 w-32"></div>
                <div className="erp-loading-skeleton h-4 w-24"></div>
                <div className="erp-loading-skeleton h-6 w-16 rounded-full"></div>
                <div className="erp-loading-skeleton h-6 w-12 rounded-full"></div>
                <div className="erp-loading-skeleton h-8 w-24 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`erp-card ${mounted ? 'erp-slide-up' : ''}`}>
      <div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {persona === "Importer" ? "Active Fleet" : "My Vehicle Wallet"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {persona === "Importer"
              ? "End-to-end visibility from auction to DVLA registration."
              : "Digital wallet showing your imported vehicle and provenance."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-xs text-slate-500">
            <div className="font-medium text-slate-700">{visibleVehicles.length}</div>
            <div>Total vehicles</div>
          </div>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md"
            aria-label="Upload new document"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden md:inline">Upload Document</span>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-slate-200/60"
          role="table"
          aria-label={`${persona === "Importer" ? "Active Fleet" : "My Vehicle Wallet"} table`}
        >
          <thead className="bg-slate-50/80">
            <tr className="text-xs uppercase tracking-wider text-slate-500">
              <th scope="col" className="px-6 py-3 text-left font-medium">
                Vehicle
              </th>
              <th scope="col" className="px-6 py-3 text-left font-medium">
                VIN / Chassis
              </th>
              <th scope="col" className="px-6 py-3 text-left font-medium">
                Status
              </th>
              {persona === "Importer" && (
                <th scope="col" className="px-6 py-3 text-left font-medium">
                  Risk Level
                </th>
              )}
              <th scope="col" className="px-6 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/40 bg-white">
            {visibleVehicles.map((vehicle, index) => (
              <tr
                key={vehicle.id}
                className="group hover:bg-slate-50/60 transition-colors duration-150"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {vehicle.year} {vehicle.make}
                      </div>
                      <div className="text-xs text-slate-500">{vehicle.model}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600 font-mono">{vehicle.vin}</div>
                  <div className="text-xs text-slate-400">Chassis number</div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={vehicle.status} />
                </td>
                {persona === "Importer" && (
                  <td className="px-6 py-4">
                    <RiskPill risk={vehicle.riskLevel} />
                  </td>
                )}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/vehicles/${vehicle.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-all duration-200 group-hover:shadow-md"
                      aria-label={`View timeline for ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden md:inline">View Timeline</span>
                    </Link>
                    <button
                      className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-all duration-200"
                      aria-label={`Quick actions for ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    >
                      <Clock className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visibleVehicles.length === 0 && (
              <tr>
                <td
                  colSpan={persona === "Importer" ? 5 : 4}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <FileText className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">No vehicles found</div>
                      <div className="text-xs text-slate-500 mt-1">
                        No vehicles are visible for this persona in the demo dataset.
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

