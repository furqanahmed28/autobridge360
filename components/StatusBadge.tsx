import type { RiskLevel, VehicleStatus } from "../src/lib/mockData";
import { CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: VehicleStatus;
}

interface RiskPillProps {
  risk: RiskLevel;
}

const statusConfig: Record<VehicleStatus, { colors: string; icon: any; description: string }> = {
  "Auction Won": {
    colors: "bg-accent-50 text-accent-700 border-accent-200",
    icon: CheckCircle,
    description: "Successfully won at auction"
  },
  "At Port - Nagoya": {
    colors: "bg-primary-50 text-primary-700 border-primary-200",
    icon: Clock,
    description: "Arrived at port facility"
  },
  "Customs Clearance": {
    colors: "bg-warning-50 text-warning-700 border-warning-200",
    icon: AlertTriangle,
    description: "Undergoing customs inspection"
  },
  "Shipping": {
    colors: "bg-primary-50 text-primary-700 border-primary-200",
    icon: Clock,
    description: "In transit to destination"
  },
  "Registered": {
    colors: "bg-accent-50 text-accent-700 border-accent-200",
    icon: CheckCircle,
    description: "Successfully registered"
  }
};

const riskConfig: Record<RiskLevel, { colors: string; icon: any; description: string }> = {
  Low: {
    colors: "bg-accent-50 text-accent-700 border-accent-200",
    icon: CheckCircle,
    description: "Low risk assessment"
  },
  Medium: {
    colors: "bg-warning-50 text-warning-700 border-warning-200",
    icon: AlertTriangle,
    description: "Medium risk - monitor closely"
  },
  High: {
    colors: "bg-danger-50 text-danger-700 border-danger-200",
    icon: XCircle,
    description: "High risk - requires attention"
  },
  Pending: {
    colors: "bg-slate-50 text-slate-600 border-slate-200",
    icon: Clock,
    description: "Risk assessment pending"
  }
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 hover:shadow-sm ${config.colors}`}
      title={config.description}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
};

export const RiskPill = ({ risk }: RiskPillProps) => {
  const config = riskConfig[risk];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 hover:shadow-sm ${config.colors}`}
      title={config.description}
    >
      <Icon className="h-3 w-3" />
      {risk} Risk
    </span>
  );
};

