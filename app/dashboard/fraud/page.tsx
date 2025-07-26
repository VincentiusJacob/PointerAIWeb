"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon,
  MapPinIcon,
  CreditCardIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const fraudAlerts = [
  {
    id: 1,
    amount: "Rp 500.000",
    type: "Pembayaran Tunai Besar",
    risk: "High",
    location: "Kasir 1",
    time: "2 menit lalu",
    status: "Active",
    details: "Pembayaran tunai di luar jam operasional normal",
  },
  {
    id: 2,
    amount: "Rp 150.000",
    type: "Pesanan Catering",
    risk: "Medium",
    location: "Online Order",
    time: "15 menit lalu",
    status: "Under Review",
    details: "Pesanan besar tanpa deposit sebelumnya",
  },
  {
    id: 3,
    amount: "Rp 75.000",
    type: "Pembayaran Ganda",
    risk: "Medium",
    location: "Kasir 2",
    time: "1 jam lalu",
    status: "Resolved",
    details: "Kemungkinan double payment untuk order yang sama",
  },
  {
    id: 4,
    amount: "Rp 25.000",
    type: "Diskon Berlebihan",
    risk: "Low",
    location: "Kasir 1",
    time: "2 jam lalu",
    status: "Active",
    details: "Diskon 50% diberikan tanpa otorisasi manager",
  },
];

const riskMetrics = [
  { label: "High Risk", value: 2, color: "red", change: "+1" },
  { label: "Medium Risk", value: 5, color: "orange", change: "-2" },
  { label: "Low Risk", value: 12, color: "green", change: "+3" },
  { label: "Resolved", value: 8, color: "blue", change: "+4" },
];

export default function FraudDetectionPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);

  const fraudTrendOptions: ApexOptions = {
    chart: {
      type: "line",
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
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00",
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
    { name: "High Risk", data: [0, 1, 0, 2, 1, 0, 1] },
    { name: "Medium Risk", data: [1, 2, 1, 3, 2, 1, 2] },
    { name: "Prevented", data: [2, 4, 3, 6, 5, 3, 4] },
  ];

  const locationDistributionOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: 280,
      background: "transparent",
    },
    theme: { mode: "dark" },
    colors: ["#DB3737", "#F29D49", "#D9822B", "#BF7326"],
    labels: ["Kasir 1", "Kasir 2", "Online Order", "Delivery"],
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

  const locationDistributionSeries = [8, 5, 3, 2];

  const riskScoreOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      height: 250,
      background: "transparent",
    },
    theme: { mode: "dark" },
    colors: ["#F29D49"],
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

  const riskScoreSeries = [35];

  return (
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
                    vs kemarin
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
            <h3 className="text-xl font-bold text-white">Tren Deteksi Fraud</h3>
            <div className="flex items-center space-x-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
              >
                <option value="24h">24 Jam Terakhir</option>
                <option value="7d">7 Hari Terakhir</option>
                <option value="30d">30 Hari Terakhir</option>
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
            Level Risiko Saat Ini
          </h3>
          <Chart
            options={riskScoreOptions}
            series={riskScoreSeries}
            type="radialBar"
            height={250}
          />
          <div className="text-center">
            <p className="text-sm text-palantir-gray-4">
              Penilaian risiko berdasarkan analisis real-time
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
            Distribusi per Lokasi
          </h3>
          <Chart
            options={locationDistributionOptions}
            series={locationDistributionSeries}
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
              Alert Fraud Terbaru
            </h3>
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-4 h-4 text-palantir-gray-4" />
              <select
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(e.target.value)}
                className="bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
              >
                <option value="all">Semua Level</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
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
                      Periksa
                    </button>
                    <button className="px-3 py-1 bg-palantir-dark-gray-4 text-palantir-gray-3 rounded text-xs hover:bg-palantir-gray-4 hover:text-white transition-colors">
                      Abaikan
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
        <h3 className="text-xl font-bold text-white mb-6">Analisis AI Fraud</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-red-4/20 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-4 h-4 text-red-4" />
              </div>
              <h4 className="font-medium text-white">Anomali Pembayaran</h4>
            </div>
            <p className="text-sm text-palantir-gray-3 mb-3">
              Terdeteksi pembayaran tunai besar di luar jam operasional.
              Pastikan ada karyawan yang bertugas dan cek CCTV.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-red-4 text-sm font-medium">
                Prioritas Tinggi
              </span>
              <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                Lihat Detail →
              </button>
            </div>
          </div>

          <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-orange-4/20 rounded-lg flex items-center justify-center">
                <BanknotesIcon className="w-4 h-4 text-orange-4" />
              </div>
              <h4 className="font-medium text-white">Pola Diskon</h4>
            </div>
            <p className="text-sm text-palantir-gray-3 mb-3">
              Diskon berlebihan diberikan tanpa otorisasi. Pertimbangkan sistem
              approval untuk diskon di atas 30%.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-orange-4 text-sm font-medium">
                Prioritas Sedang
              </span>
              <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                Atur Aturan →
              </button>
            </div>
          </div>

          <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-green-4/20 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4 text-green-4" />
              </div>
              <h4 className="font-medium text-white">Pencegahan Sukses</h4>
            </div>
            <p className="text-sm text-palantir-gray-3 mb-3">
              Berhasil mencegah kerugian Rp 500.000 bulan ini. Sistem deteksi
              bekerja dengan baik untuk transaksi mencurigakan.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-green-4 text-sm font-medium">Sukses</span>
              <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                Lihat Laporan →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
