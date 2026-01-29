"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getVehiclesForUser } from "../src/lib/mockData";
import { useAuthStore } from "../src/store/authStore";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatusData {
  name: string;
  value: number;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="erp-card p-3 shadow-large border-0">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-medium text-slate-900">{data.name}</span>
        </div>
        <div className="text-sm text-slate-600 mt-1">
          {data.value} vehicle{data.value !== 1 ? 's' : ''}
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-600 font-medium">{entry.value}</span>
          <span className="text-slate-400">({entry.payload.value})</span>
        </div>
      ))}
    </div>
  );
};

export const StatusChart = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const visibleVehicles = user ? getVehiclesForUser(user.role) : [];

  const statusCounts = visibleVehicles.reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusConfig: Record<string, { color: string; trend: 'up' | 'down' | 'neutral' }> = {
    "Registered": { color: "#10b981", trend: "up" },
    "In Transit": { color: "#3b82f6", trend: "neutral" },
    "At Port - Nagoya": { color: "#f59e0b", trend: "neutral" },
    "Customs Clearance": { color: "#f59e0b", trend: "down" },
    "Shipping": { color: "#8b5cf6", trend: "neutral" },
    "Delivered": { color: "#10b981", trend: "up" },
  };

  const data: StatusData[] = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    color: statusConfig[status]?.color || "#64748b",
    trend: statusConfig[status]?.trend || "neutral",
  }));

  const totalVehicles = data.reduce((sum, item) => sum + item.value, 0);

  if (isLoading) {
    return (
      <div className="erp-card p-6">
        <div className="space-y-4">
          <div className="erp-loading-skeleton h-5 w-48"></div>
          <div className="flex justify-center">
            <div className="erp-loading-skeleton h-48 w-48 rounded-full"></div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="erp-loading-skeleton h-4 w-20"></div>
            <div className="erp-loading-skeleton h-4 w-16"></div>
            <div className="erp-loading-skeleton h-4 w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`erp-card p-6 ${mounted ? 'erp-slide-up' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {user?.role === "importer" ? "Vehicle Status Distribution" : "My Vehicle Status"}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Total: {totalVehicles} vehicle{totalVehicles !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm text-slate-500">
          <span>Live data</span>
          <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              animationBegin={200}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{totalVehicles}</div>
            <div className="text-sm text-slate-500">Total</div>
          </div>
        </div>
      </div>

      <CustomLegend payload={data.map(item => ({
        value: item.name,
        color: item.color,
        payload: item
      }))} />

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-200/60">
        <div className="text-center">
          <div className="text-lg font-semibold text-accent-600">
            {data.filter(d => d.trend === 'up').length}
          </div>
          <div className="text-xs text-slate-500">Positive Status</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-warning-600">
            {data.filter(d => d.trend === 'down').length}
          </div>
          <div className="text-xs text-slate-500">Needs Attention</div>
        </div>
      </div>
    </div>
  );
};