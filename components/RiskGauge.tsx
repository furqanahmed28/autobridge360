"use client";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";
import { CheckCircle2, XCircle, TrendingUp, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface RiskGaugeProps {
  score: number;
}

export const RiskGauge = ({ score }: RiskGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const data = [
    {
      name: "Risk",
      value: animatedScore,
      fill: animatedScore >= 70 ? "#10b981" : animatedScore >= 50 ? "#f59e0b" : "#f43f5e"
    }
  ];

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: "Low", color: "text-accent-600", bg: "bg-accent-50" };
    if (score >= 50) return { level: "Medium", color: "text-warning-600", bg: "bg-warning-50" };
    return { level: "High", color: "text-danger-600", bg: "bg-danger-50" };
  };

  const riskInfo = getRiskLevel(animatedScore);

  return (
    <div className={`erp-card p-6 ${mounted ? 'erp-slide-up' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent-600" />
            Adaptive Risk Score (AMRS)
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Unified view of compliance, document integrity & mileage.
          </p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${riskInfo.color} transition-all duration-500`}>
            {animatedScore}
          </div>
          <div className={`text-sm font-medium ${riskInfo.color} mt-1`}>
            {riskInfo.level} Risk
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Chart Section */}
        <div className="relative">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={data}
                startAngle={220}
                endAngle={-40}
                innerRadius="70%"
                outerRadius="100%"
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  tick={false}
                  angleAxisId={0}
                />
                <RadialBar
                  dataKey="value"
                  cornerRadius={50}
                  background={{ fill: "#e5e7eb" }}
                  animationBegin={400}
                  animationDuration={1000}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* Center indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Score</div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-accent-600" />
            <span className="font-medium text-slate-900">Risk Factors</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-accent-50 p-3 border border-accent-100">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-accent-900">
                  Chassis Matches Export Cert
                </div>
                <div className="text-xs text-accent-700 mt-1">
                  +20 pts • Verified across auction sheet & export documentation.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-danger-50 p-3 border border-danger-100">
              <XCircle className="mt-0.5 h-4 w-4 text-danger-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-danger-900">
                  Vehicle > 10 Years Old (IVA Required)
                </div>
                <div className="text-xs text-danger-700 mt-1">
                  -15 pts • Age-based compliance route triggers IVA inspection.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/60">
            <p className="text-xs text-slate-500 leading-relaxed">
              Prototype AMRS is rule-weighted and explainable for regulators and insurers.
              Scores update in real-time as new data becomes available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
