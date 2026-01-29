import { notFound } from "next/navigation";
import { vehicles, provenanceEvents } from "../../../src/lib/mockData";
import { Timeline } from "../../../components/Timeline";
import { StatusBadge, RiskPill } from "../../../components/StatusBadge";
import { RiskGauge } from "../../../components/RiskGauge";

interface VehicleDetailPageProps {
  params: { id: string };
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const vehicle = vehicles.find((v) => v.id === params.id);
  if (!vehicle) return notFound();

  const events = provenanceEvents.filter((e) => e.vehicleId === vehicle.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Provenance Graph™
          </div>
          <h1 className="text-lg font-semibold text-slate-900 md:text-xl">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-xs text-slate-500 md:text-sm">
            End-to-end event history from Japanese auction to UK road-legal
            registration.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex flex-col items-start gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">
              Status
            </div>
            <StatusBadge status={vehicle.status} />
          </div>
          <div className="flex flex-col items-start gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">
              Risk
            </div>
            <RiskPill risk={vehicle.riskLevel} />
          </div>
          <div className="flex flex-col items-start gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">
              VIN / Chassis
            </div>
            <div className="text-[11px] font-mono text-slate-700">
              {vehicle.vin}
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Lifecycle Timeline
              </h2>
              <p className="text-xs text-slate-500">
                Each event is immutable, timestamped and linked to source
                documentation.
              </p>
            </div>
          </div>
          <Timeline events={events} />
        </div>
        <RiskGauge score={vehicle.riskScore} />
      </div>
    </div>
  );
}

