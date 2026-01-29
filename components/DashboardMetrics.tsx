"use client";

import { AlertTriangle, BarChart3, Car, Ship, Wrench, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";
import { vehicles } from "../src/lib/mockData";
import { usePersonaStore } from "../src/store/personaStore";
import { useState, useEffect } from "react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: any;
  subtitle: string;
  trend?: 'up' | 'down' | 'neutral';
  isLoading?: boolean;
}

const MetricCard = ({ title, value, icon: Icon, subtitle, trend, isLoading }: MetricCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof value === 'number') {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [value]);

  if (isLoading) {
    return (
      <div className="erp-card erp-card-hover p-6">
        <div className="flex items-center gap-4">
          <div className="erp-loading-skeleton h-12 w-12 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="erp-loading-skeleton h-4 w-24"></div>
            <div className="erp-loading-skeleton h-6 w-16"></div>
            <div className="erp-loading-skeleton h-3 w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-accent-600" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-danger-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-accent-600';
      case 'down':
        return 'text-danger-600';
      default:
        return 'text-slate-500';
    }
  };

  return (
    <div className="erp-card erp-card-hover p-6 group cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 group-hover:bg-accent-200 transition-colors duration-200 shadow-sm">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                {title}
              </h3>
              {trend && getTrendIcon()}
            </div>
            <div className={`text-2xl font-bold text-slate-900 mb-1 transition-all duration-500 ${mounted ? 'erp-fade-in' : ''}`}>
              {typeof value === 'number' ? animatedValue.toLocaleString() : value}
            </div>
            <p className="text-xs text-slate-500 leading-tight">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Subtle hover indicator */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl"></div>
    </div>
  );
};

export const DashboardMetrics = () => {
  const { persona } = usePersonaStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (persona === "Importer") {
    const totalFleet = vehicles.length;
    const inTransit = vehicles.filter((v) =>
      ["Shipping", "At Port - Nagoya", "Customs Clearance"].includes(v.status)
    ).length;
    const complianceAlerts = vehicles.filter(
      (v) => v.riskLevel === "High" || v.riskLevel === "Medium"
    ).length;
    const avgRiskScore =
      vehicles.reduce((sum, v) => sum + (v.riskScore || 0), 0) /
      (vehicles.length || 1);

    const cards = [
      {
        title: "Total Fleet",
        value: totalFleet,
        icon: Car,
        subtitle: "Demo vehicles under management",
        trend: totalFleet > 5 ? 'up' : 'neutral' as const
      },
      {
        title: "In Transit / At Port",
        value: inTransit,
        icon: Ship,
        subtitle: "Booked, at port or on vessel",
        trend: inTransit > 2 ? 'up' : 'neutral' as const
      },
      {
        title: "Compliance Alerts",
        value: complianceAlerts,
        icon: AlertTriangle,
        subtitle: "Requires importer attention",
        trend: complianceAlerts > 0 ? 'down' : 'up' as const
      },
      {
        title: "Avg Risk Score",
        value: isNaN(avgRiskScore) ? 0 : Math.round(avgRiskScore),
        icon: BarChart3,
        subtitle: "Unified AMRS snapshot",
        trend: avgRiskScore < 50 ? 'up' : 'down' as const
      }
    ];

    return (
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`${isLoading ? '' : 'erp-slide-up'}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MetricCard {...card} isLoading={isLoading} />
          </div>
        ))}
      </section>
    );
  } else {
    // Owner persona metrics
    const ownedVehicles = vehicles.filter((v) => v.ownerRoleView === "Owner");
    const registeredVehicles = ownedVehicles.filter((v) => v.status === "Registered").length;
    const serviceDueCount = ownedVehicles.filter((v) => v.riskLevel === "Medium").length;
    const avgVehicleAge = ownedVehicles.length > 0
      ? ownedVehicles.reduce((sum, v) => sum + (2025 - v.year), 0) / ownedVehicles.length
      : 0;

    const cards = [
      {
        title: "My Vehicles",
        value: ownedVehicles.length,
        icon: Car,
        subtitle: "Vehicles in your wallet",
        trend: ownedVehicles.length > 1 ? 'up' : 'neutral' as const
      },
      {
        title: "Registered",
        value: registeredVehicles,
        icon: CheckCircle,
        subtitle: "DVLA registered vehicles",
        trend: registeredVehicles === ownedVehicles.length ? 'up' : 'neutral' as const
      },
      {
        title: "Service Due",
        value: serviceDueCount,
        icon: Wrench,
        subtitle: "Vehicles needing attention",
        trend: serviceDueCount > 0 ? 'down' : 'up' as const
      },
      {
        title: "Avg Vehicle Age",
        value: isNaN(avgVehicleAge) ? 0 : Math.round(avgVehicleAge),
        icon: BarChart3,
        subtitle: "Years since manufacture",
        trend: avgVehicleAge < 3 ? 'up' : 'neutral' as const
      }
    ];

    return (
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`${isLoading ? '' : 'erp-slide-up'}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MetricCard {...card} isLoading={isLoading} />
          </div>
        ))}
      </section>
    );
  }
};

