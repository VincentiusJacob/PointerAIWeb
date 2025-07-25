"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const recentTransactions = [
  {
    id: 1,
    amount: "Rp 45.000",
    type: "Bakmie Ayam + Es Teh",
    status: "Normal",
    risk: "Low",
    time: "10:30",
  },
  {
    id: 2,
    amount: "Rp 500.000",
    type: "Pembayaran Tunai Besar",
    status: "Flagged",
    risk: "High",
    time: "09:45",
  },
  {
    id: 3,
    amount: "Rp 25.000",
    type: "Bakmie Bakso",
    status: "Normal",
    risk: "Low",
    time: "09:20",
  },
  {
    id: 4,
    amount: "Rp 150.000",
    type: "Pesanan Catering",
    status: "Review",
    risk: "Medium",
    time: "08:55",
  },
  {
    id: 5,
    amount: "Rp 35.000",
    type: "Bakmie Special + Jus",
    status: "Normal",
    risk: "Low",
    time: "08:30",
  },
];

export default function DashboardPage() {
  const [userPlan] = useState("end-to-end");

  // Sales chart for bakmie restaurant
  const salesChartOptions = {
    chart: {
      type: "area" as const,
      height: 200,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" as const },
    colors: ["#2D72D2", "#4C90F0"],
    fill: {
      type: "gradient" as const,
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
      },
    },
    stroke: { curve: "smooth" as const, width: 2 },
    grid: {
      borderColor: "#404854",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#8F99A8" },
        formatter: (val: any) => `${val}k`,
      },
    },
    tooltip: {
      theme: "dark" as const,
      y: { formatter: (val: any) => `Rp ${val}.000` },
    },
  };

  const salesChartSeries = [
    {
      name: "Penjualan Harian",
      data: [850, 920, 780, 1100, 1250, 1400, 950], // dalam ribuan
    },
  ];

  // Budget chart for restaurant
  const budgetChartOptions = {
    chart: {
      type: "donut" as const,
      height: 200,
      background: "transparent",
    },
    theme: { mode: "dark" as const },
    colors: ["#0F9960", "#3DCC91", "#15B371", "#0D8050"],
    labels: ["Bahan Baku", "Sewa & Listrik", "Gaji Karyawan", "Marketing"],
    legend: {
      position: "bottom" as const,
      labels: { colors: "#8F99A8" },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    tooltip: {
      theme: "dark" as const,
      y: { formatter: (val: any) => `${val}%` },
    },
  };

  const budgetChartSeries = [45, 25, 20, 10]; // Persentase budget allocation

  const hasAccess = (feature: string) => {
    if (userPlan === "end-to-end") return true;
    return userPlan === feature;
  };

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="dashboard-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-palantir-gray-4 text-sm font-medium">
                Penjualan Hari Ini
              </p>
              <p className="text-2xl font-bold text-white mt-1">Rp 1.250.000</p>
              <div className="flex items-center space-x-1 mt-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-4" />
                <span className="text-green-4 text-sm font-medium">+15.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-4/20 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="w-6 h-6 text-green-4" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="dashboard-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-palantir-gray-4 text-sm font-medium">
                Transaksi Dicegah
              </p>
              <p className="text-2xl font-bold text-white mt-1">Rp 500.000</p>
              <div className="flex items-center space-x-1 mt-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-red-4" />
                <span className="text-red-4 text-sm font-medium">+2 kasus</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-4/20 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-red-4" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="dashboard-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-palantir-gray-4 text-sm font-medium">
                Efisiensi Budget
              </p>
              <p className="text-2xl font-bold text-white mt-1">87.3%</p>
              <div className="flex items-center space-x-1 mt-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-blue-4" />
                <span className="text-blue-4 text-sm font-medium">+3.1%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-4/20 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-blue-4" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="dashboard-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-palantir-gray-4 text-sm font-medium">
                Alert Aktif
              </p>
              <p className="text-2xl font-bold text-white mt-1">3</p>
              <div className="flex items-center space-x-1 mt-2">
                <ArrowTrendingDownIcon className="w-4 h-4 text-orange-4" />
                <span className="text-orange-4 text-sm font-medium">
                  -2 dari kemarin
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-4/20 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-4" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {hasAccess("sales-forecasting") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">
                Penjualan Mingguan
              </h3>
              <Link
                href="/dashboard/sales"
                className="text-blue-4 hover:text-blue-5 transition-colors"
              >
                <EyeIcon className="w-5 h-5" />
              </Link>
            </div>
            <div className="mb-4">
              <p className="text-sm text-palantir-gray-4">Rata-rata per hari</p>
              <p className="text-2xl font-bold text-white">Rp 1.037.000</p>
            </div>
            <Chart
              options={salesChartOptions}
              series={salesChartSeries}
              type="area"
              height={200}
            />
          </motion.div>
        )}

        {hasAccess("auto-budgeting") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Alokasi Budget</h3>
              <Link
                href="/dashboard/budget"
                className="text-blue-4 hover:text-blue-5 transition-colors"
              >
                <EyeIcon className="w-5 h-5" />
              </Link>
            </div>
            <div className="mb-4">
              <p className="text-sm text-palantir-gray-4">Budget Bulanan</p>
              <p className="text-2xl font-bold text-white">Rp 18.500.000</p>
            </div>
            <Chart
              options={budgetChartOptions}
              series={budgetChartSeries}
              type="donut"
              height={200}
            />
          </motion.div>
        )}
      </div>

      {/* Recent Transactions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="dashboard-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Transaksi Terbaru</h3>
            <Link
              href="/dashboard/fraud"
              className="text-blue-4 hover:text-blue-5 text-sm font-medium transition-colors"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      transaction.status === "Flagged"
                        ? "bg-red-4"
                        : transaction.status === "Review"
                        ? "bg-orange-4"
                        : "bg-green-4"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-white">
                      {transaction.amount}
                    </p>
                    <p className="text-sm text-palantir-gray-4">
                      {transaction.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      transaction.risk === "High"
                        ? "text-red-4"
                        : transaction.risk === "Medium"
                        ? "text-orange-4"
                        : "text-green-4"
                    }`}
                  >
                    {transaction.risk} Risk
                  </p>
                  <p className="text-sm text-palantir-gray-4">
                    {transaction.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="dashboard-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-bold text-white mb-6">Aksi Cepat</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-4/20 rounded-lg flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">Tanya AI Assistant</p>
                  <p className="text-sm text-palantir-gray-4">
                    Dapatkan insight bisnis
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-palantir-gray-4 group-hover:text-white transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-4/20 rounded-lg flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 text-red-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">Cek Alert Fraud</p>
                  <p className="text-sm text-palantir-gray-4">
                    3 alert menunggu
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-palantir-gray-4 group-hover:text-white transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-4/20 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-green-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">Laporan Harian</p>
                  <p className="text-sm text-palantir-gray-4">
                    Ringkasan penjualan
                  </p>
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-palantir-gray-4 group-hover:text-white transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-4/20 rounded-lg flex items-center justify-center">
                  <CurrencyDollarIcon className="w-5 h-5 text-orange-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">Optimasi Budget</p>
                  <p className="text-sm text-palantir-gray-4">Rekomendasi AI</p>
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-palantir-gray-4 group-hover:text-white transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 dashboard-card p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
            <CpuChipIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">
            AI Insights & Rekomendasi
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-red-4 rounded-full animate-pulse"></div>
              <h4 className="font-medium text-white">Alert Transaksi</h4>
            </div>
            <p className="text-sm text-palantir-gray-3 mb-3">
              Terdeteksi pembayaran tunai Rp 500.000 di luar jam operasional.
              Periksa CCTV dan verifikasi dengan karyawan.
            </p>
            <button className="text-red-4 hover:text-red-5 text-sm font-medium transition-colors">
              Investigasi →
            </button>
          </div>

          <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-blue-4 rounded-full animate-pulse"></div>
              <h4 className="font-medium text-white">Peluang Penjualan</h4>
            </div>
            <p className="text-sm text-palantir-gray-3 mb-3">
              Penjualan akhir pekan naik 15%. Pertimbangkan tambah stok bahan
              baku dan promosi menu spesial weekend.
            </p>
            <button className="text-blue-4 hover:text-blue-5 text-sm font-medium transition-colors">
              Lihat Detail →
            </button>
          </div>

          <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-4 rounded-full animate-pulse"></div>
              <h4 className="font-medium text-white">Optimasi Budget</h4>
            </div>
            <p className="text-sm text-palantir-gray-3 mb-3">
              Hemat Rp 150.000/bulan dengan ganti supplier sayuran. Kualitas
              sama tapi harga 20% lebih murah.
            </p>
            <button className="text-green-4 hover:text-green-5 text-sm font-medium transition-colors">
              Terapkan →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
