"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { getVehiclesForUser, getProvenanceEventsForUser, type Vehicle, type ProvenanceEvent } from "../../src/lib/mockData";
import { useAuthStore } from "../../src/store/authStore";

const reportTypes = [
  { id: "inventory", label: "Vehicle Inventory" },
  { id: "compliance", label: "Compliance Status" },
  { id: "risk", label: "Risk Analysis" },
  { id: "shipment", label: "Shipment Tracking" },
];

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState("inventory");
  const { user } = useAuthStore();

  const visibleVehicles = user ? getVehiclesForUser(user.role) : [];
  const visibleEvents = user ? getProvenanceEventsForUser(user.role) : [];

  const renderReport = () => {
    switch (activeReport) {
      case "inventory":
        return <VehicleInventoryReport vehicles={visibleVehicles} />;
      case "compliance":
        return <ComplianceStatusReport vehicles={visibleVehicles} />;
      case "risk":
        return <RiskAnalysisReport vehicles={visibleVehicles} />;
      case "shipment":
        return <ShipmentTrackingReport vehicles={visibleVehicles} events={visibleEvents} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600">Comprehensive reporting for vehicle import lifecycle</p>
      </div>

      <div className="flex space-x-1 border-b border-slate-200">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setActiveReport(report.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeReport === report.id
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {report.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        {renderReport()}
      </div>
    </div>
  );
}
function VehicleInventoryReport({ vehicles }: { vehicles: Vehicle[] }) {

  const makeCounts = vehicles.reduce((acc: Record<string, number>, v: Vehicle) => {
    acc[v.make] = (acc[v.make] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(makeCounts).map(([make, count]) => ({
    make,
    count,
  }));

  const statusCounts = vehicles.reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Vehicle Inventory Report</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Vehicles by Make</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="make" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Vehicles by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Detailed Inventory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">VIN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Make</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Level</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">{vehicle.vin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.make}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.riskLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ComplianceStatusReport({ vehicles }: { vehicles: Vehicle[] }) {
  const complianceData = [
    { month: "Jan", compliant: 85, nonCompliant: 15 },
    { month: "Feb", compliant: 90, nonCompliant: 10 },
    { month: "Mar", compliant: 88, nonCompliant: 12 },
    { month: "Apr", compliant: 92, nonCompliant: 8 },
    { month: "May", compliant: 95, nonCompliant: 5 },
    { month: "Jun", compliant: 93, nonCompliant: 7 },
  ];

  const riskData = vehicles.reduce((acc, v) => {
    acc[v.riskLevel] = (acc[v.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(riskData).map(([risk, count]) => ({
    name: risk,
    value: count,
  }));

  const COLORS = ["#10b981", "#f59e0b", "#f43f5e", "#6b7280"];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Compliance Status Report</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Compliance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="compliant" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="nonCompliant" stroke="#f43f5e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Compliance Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">VIN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Make</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">{vehicle.vin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.make}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.riskLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.riskScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RiskAnalysisReport({ vehicles }: { vehicles: typeof vehicles }) {
  const riskTrend = [
    { month: "Jan", low: 60, medium: 25, high: 15 },
    { month: "Feb", low: 65, medium: 20, high: 15 },
    { month: "Mar", low: 70, medium: 20, high: 10 },
    { month: "Apr", low: 75, medium: 15, high: 10 },
    { month: "May", low: 80, medium: 15, high: 5 },
    { month: "Jun", low: 85, medium: 10, high: 5 },
  ];

  const riskScores = vehicles.map(v => ({ name: `${v.make} ${v.model}`, score: v.riskScore }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Risk Analysis Report</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Risk Trend Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="low" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="high" stroke="#f43f5e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Individual Risk Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Risk Assessment Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">VIN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Make</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">{vehicle.vin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.make}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.riskLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.riskScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ShipmentTrackingReport({ vehicles, events }: { vehicles: typeof vehicles; events: typeof provenanceEvents }) {
  const shipmentData = [
    { stage: "Auction Won", count: 1 },
    { stage: "At Port", count: 1 },
    { stage: "Customs Clearance", count: 1 },
    { stage: "Shipping", count: 1 },
    { stage: "Registered", count: 1 },
  ];

  const timelineData = events
    .filter(e => e.status === "Completed")
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .slice(-10)
    .map(e => ({
      date: new Date(e.timestamp).toLocaleDateString(),
      event: e.title,
      location: e.location,
    }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Shipment Tracking Report</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Shipment Stages</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Recent Events</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {timelineData.map((event, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{event.event}</p>
                  <p className="text-xs text-slate-500">{event.date} • {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Shipment Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">VIN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Make</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Event</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {vehicles.map((vehicle) => {
                const lastEvent = events
                  .filter(e => e.vehicleId === vehicle.id)
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                return (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900">{vehicle.vin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.make}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.model}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{vehicle.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {lastEvent ? lastEvent.title : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}