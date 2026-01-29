"use client";

import { DashboardMetrics } from "../components/DashboardMetrics";
import { VehicleTable } from "../components/VehicleTable";
import { RiskGauge } from "../components/RiskGauge";
import { StatusChart } from "../components/StatusChart";
import { vehicles } from "../src/lib/mockData";
import { usePersonaStore } from "../src/store/personaStore";
import { useEffect, useState } from "react";

function getReferenceVehicleRisk() {
  const harrier = vehicles.find((v) => v.id === "harrier-2022");
  return harrier?.riskScore ?? 72;
}

export default function DashboardPage() {
  const { persona } = usePersonaStore();
  const score = getReferenceVehicleRisk();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`space-y-8 ${mounted ? 'erp-fade-in' : ''}`}>
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl tracking-tight">
            {persona === "Importer" ? "Import Command Center" : "Digital Vehicle Wallet"}
          </h1>
          <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
            {persona === "Importer"
              ? "Follow a vehicle from Japanese auction to UK ownership with full provenance and risk visibility."
              : "Personal dashboard showing your imported vehicle, service history, and ownership metrics."}
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-2 bg-accent-50 border border-accent-200 rounded-lg">
          <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-accent-700">System Online</span>
        </div>
      </div>

      {/* Metrics Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Key Metrics</h2>
          <div className="h-px bg-gradient-to-r from-accent-500 to-transparent flex-1"></div>
        </div>
        <DashboardMetrics />
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Vehicle Details</h2>
            <div className="h-px bg-gradient-to-r from-slate-300 to-transparent flex-1"></div>
          </div>
          <VehicleTable />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-900">
              {persona === "Importer" ? "Risk Analysis" : "Status Overview"}
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-300 to-transparent flex-1"></div>
          </div>
          {persona === "Importer" ? (
            <RiskGauge score={score} />
          ) : (
            <StatusChart />
          )}
        </section>
      </div>
    </div>
  );
}

