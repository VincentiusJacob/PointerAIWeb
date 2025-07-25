// app/dashboard/fraud/page.tsx - Fraud Detection Dashboard
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  MapPinIcon,
  CreditCardIcon,
  BanknotesIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const fraudAlerts = [
  {
    id: 1,
    amount: "Rp 125.500.000",
    type: "Suspicious Transfer",
    risk: "High",
    location: "Jakarta",
    time: "2 minutes ago",
    status: "Active",
    details: "Multiple large transfers to new account",
  },
  {
    id: 2,
    amount: "Rp 85.200.000",
    type: "Unusual Pattern",
    risk: "High",
    location: "Surabaya",
    time: "15 minutes ago",
    status: "Under Review",
    details: "Off-hours transaction pattern detected",
  },
  {
    id: 3,
    amount: "Rp 45.750.000",
    type: "Geographic Anomaly",
    risk: "Medium",
    location: "Medan",
    time: "1 hour ago",
    status: "Resolved",
    details: "Transaction from unusual location",
  },
  {
    id: 4,
    amount: "Rp 15.900.000",
    type: "Velocity Check",
    risk: "Medium",
    location: "Bandung",
    time: "2 hours ago",
    status: "Active",
    details: "Rapid succession of transactions",
  },
  {
    id: 5,
    amount: "Rp 95.300.000",
    type: "Amount Threshold",
    risk: "High",
    location: "Semarang",
    time: "3 hours ago",
    status: "Under Review",
    details: "Amount exceeds normal user behavior",
  },
];

const riskMetrics = [
  { label: "High Risk", value: 12, color: "red", change: "+15%" },
  { label: "Medium Risk", value: 28, color: "orange", change: "-8%" },
  { label: "Low Risk", value: 145, color: "green", change: "+3%" },
  { label: "Resolved", value: 89, color: "blue", change: "+22%" },
];

export default function FraudDetectionPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);

  // Real-time fraud detection chart
  const fraudTrendOptions: ApexOptions = {
    chart: {
      type: "line" as "line",
      height: 300,
      background: "transparent",
      toolbar: { show: false },
      animations: { enabled: true, dynamicAnimation: { speed: 1000 } },
    },
    theme: { mode: "dark" },
    colors: ["#DB3737", "#F29D49", "#0F9960"],
    stroke: { curve: "smooth", width: 3 },
    grid: {
      borderColor: "#404854",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: [
        "00:00",
        "04:00",
        "08:00",
        "12:00",
        "16:00",
        "20:00",
        "24:00",
      ],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: {
      labels: { style: { colors: "#8F99A8" } },
    },
    legend: {
      labels: { colors: "#8F99A8" },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const fraudTrendSeries = [
    { name: "High Risk", data: [3, 7, 12, 8, 15, 9, 12] },
    { name: "Medium Risk", data: [8, 12, 18, 25, 22, 28, 24] },
    { name: "Prevented", data: [45, 52, 48, 61, 58, 67, 71] },
  ];

  // Geographic distribution chart
  const geoDistributionOptions: ApexOptions = {
    chart: {
      type: "donut" as "donut",
      height: 280,
      background: "transparent",
    },
    theme: { mode: "dark" },
    colors: ["#DB3737", "#F29D49", "#D9822B", "#BF7326", "#A66321"],
    labels: ["Jakarta", "Surabaya", "Medan", "Bandung", "Others"],
    legend: {
      position: "bottom",
      labels: { colors: "#8F99A8" },
    },
    plotOptions: {
      pie: {
        donut: { size: "60%" },
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: any) => `${val} alerts` },
    },
  };

  const geoDistributionSeries = [45, 23, 18, 12, 8];

  const riskScoreOptions: ApexOptions = {
    chart: {
      type: "radialBar" as "radialBar",
      height: 250,
      background: "transparent",
    },
    theme: { mode: "dark" },
    colors: ["#DB3737"],
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        dataLabels: {
          name: { fontSize: "16px", color: "#F5F8FA" },
          value: {
            fontSize: "24px",
            color: "#F5F8FA",
            formatter: (val: any) => `${val}%`,
          },
        },
      },
    },
    labels: ["Risk Level"],
  };

  const riskScoreSeries = [73];

  return (
    <div className="min-h-screen bg-palantir-black">
      <div className="bg-palantir-dark-gray-1 border-b border-palantir-dark-gray-4 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-4/20 rounded-xl flex items-center justify-center">
              <ShieldCheckIcon className="w-7 h-7 text-red-4" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Fraud Detection</h1>
              <p className="text-palantir-gray-3">
                Real-time monitoring and threat analysis
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  realTimeEnabled
                    ? "bg-green-4 animate-pulse"
                    : "bg-palantir-gray-4"
                }`}
              ></div>
              <span className="text-sm text-palantir-gray-4">
                {realTimeEnabled ? "Real-time Active" : "Real-time Paused"}
              </span>
            </div>

            <button className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {riskMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="dashboard-card p-6 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-palantir-gray-4 text-sm font-medium">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {metric.value}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span
                      className={`text-${metric.color}-4 text-sm font-medium`}
                    >
                      {metric.change}
                    </span>
                    <span className="text-palantir-gray-4 text-sm">
                      vs yesterday
                    </span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 bg-${metric.color}-4/20 rounded-lg flex items-center justify-center`}
                >
                  {metric.label === "High Risk" && (
                    <ExclamationTriangleIcon
                      className={`w-6 h-6 text-${metric.color}-4`}
                    />
                  )}
                  {metric.label === "Medium Risk" && (
                    <ClockIcon className={`w-6 h-6 text-${metric.color}-4`} />
                  )}
                  {metric.label === "Low Risk" && (
                    <CheckCircleIcon
                      className={`w-6 h-6 text-${metric.color}-4`}
                    />
                  )}
                  {metric.label === "Resolved" && (
                    <ShieldCheckIcon
                      className={`w-6 h-6 text-${metric.color}-4`}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Fraud Detection Trends
              </h3>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
            </div>
            <Chart
              options={fraudTrendOptions}
              series={fraudTrendSeries}
              type="line"
              height={300}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Current Risk Level
            </h3>
            <Chart
              options={riskScoreOptions}
              series={riskScoreSeries}
              type="radialBar"
              height={250}
            />
            <div className="text-center">
              <p className="text-sm text-palantir-gray-4">
                System threat assessment based on real-time analysis
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Geographic Distribution
            </h3>
            <Chart
              options={geoDistributionOptions}
              series={geoDistributionSeries}
              type="donut"
              height={280}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2 dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Recent Fraud Alerts
              </h3>
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-4 h-4 text-palantir-gray-4" />
                <select
                  value={selectedRiskLevel}
                  onChange={(e) => setSelectedRiskLevel(e.target.value)}
                  className="bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="high">High Risk Only</option>
                  <option value="medium">Medium Risk Only</option>
                  <option value="low">Low Risk Only</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {fraudAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 bg-palantir-dark-gray-2 rounded-lg border-l-4 border-l-red-4 hover:bg-palantir-dark-gray-3 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.risk === "High"
                              ? "bg-red-4/20 text-red-4"
                              : alert.risk === "Medium"
                              ? "bg-orange-4/20 text-orange-4"
                              : "bg-green-4/20 text-green-4"
                          }`}
                        >
                          {alert.risk} Risk
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.status === "Active"
                              ? "bg-red-4/20 text-red-4"
                              : alert.status === "Under Review"
                              ? "bg-orange-4/20 text-orange-4"
                              : "bg-green-4/20 text-green-4"
                          }`}
                        >
                          {alert.status}
                        </div>
                      </div>

                      <h4 className="font-bold text-white text-lg mb-1">
                        {alert.amount}
                      </h4>
                      <p className="text-palantir-gray-3 text-sm mb-2">
                        {alert.type}
                      </p>
                      <p className="text-palantir-gray-4 text-xs mb-2">
                        {alert.details}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-palantir-gray-4">
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="w-3 h-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-3 h-3" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-4 text-white rounded text-xs hover:bg-blue-5 transition-colors">
                        Investigate
                      </button>
                      <button className="px-3 py-1 bg-palantir-dark-gray-4 text-palantir-gray-3 rounded text-xs hover:bg-palantir-gray-4 hover:text-white transition-colors">
                        Mark Safe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 dashboard-card p-6 rounded-xl"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            AI Fraud Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-red-4/20 rounded-lg flex items-center justify-center">
                  <CreditCardIcon className="w-4 h-4 text-red-4" />
                </div>
                <h4 className="font-medium text-white">Payment Anomalies</h4>
              </div>
              <p className="text-sm text-palantir-gray-3 mb-3">
                Detected 15% increase in high-value transactions during
                off-hours. Pattern suggests potential coordinated attack.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-red-4 text-sm font-medium">
                  High Priority
                </span>
                <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                  View Details →
                </button>
              </div>
            </div>

            <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-orange-4/20 rounded-lg flex items-center justify-center">
                  <GlobeAltIcon className="w-4 h-4 text-orange-4" />
                </div>
                <h4 className="font-medium text-white">Geographic Risk</h4>
              </div>
              <p className="text-sm text-palantir-gray-3 mb-3">
                Unusual transaction patterns from Southeast Asia region.
                Recommend implementing additional verification for amounts above
                Rp 50M.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-orange-4 text-sm font-medium">
                  Medium Priority
                </span>
                <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                  Configure Rules →
                </button>
              </div>
            </div>

            <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-4/20 rounded-lg flex items-center justify-center">
                  <BanknotesIcon className="w-4 h-4 text-green-4" />
                </div>
                <h4 className="font-medium text-white">Prevention Success</h4>
              </div>
              <p className="text-sm text-palantir-gray-3 mb-3">
                Successfully prevented Rp 847M in fraudulent transactions this
                month. System accuracy improved by 12% with latest ML model
                update.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-4 text-sm font-medium">
                  Success
                </span>
                <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                  View Report →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
