"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "Fraud Detection", href: "/dashboard/fraud", icon: ShieldCheckIcon },
  { name: "Sales Forecasting", href: "/dashboard/sales", icon: ChartBarIcon },
  {
    name: "AutoBudgeting",
    href: "/dashboard/budget",
    icon: CurrencyDollarIcon,
  },
  {
    name: "AI Assistant",
    href: "/dashboard/chat",
    icon: ChatBubbleLeftRightIcon,
  },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Fraud Alert",
    message: "Suspicious transaction detected - Rp 125.500.000",
    time: "2 minutes ago",
    icon: ExclamationTriangleIcon,
    color: "red",
  },
  {
    id: 2,
    type: "success",
    title: "Budget Optimization",
    message: "Monthly budget optimized - saved Rp 45.200.000",
    time: "1 hour ago",
    icon: CheckCircleIcon,
    color: "green",
  },
  {
    id: 3,
    type: "info",
    title: "Sales Forecast",
    message: "Q1 forecast updated - 12% growth predicted",
    time: "3 hours ago",
    icon: InformationCircleIcon,
    color: "blue",
  },
];

const recentTransactions = [
  {
    id: 1,
    amount: "Rp 2.500.000",
    type: "Transfer",
    status: "Normal",
    risk: "Low",
    time: "10:30 AM",
  },
  {
    id: 2,
    amount: "Rp 125.500.000",
    type: "Payment",
    status: "Flagged",
    risk: "High",
    time: "09:45 AM",
  },
  {
    id: 3,
    amount: "Rp 850.000",
    type: "Purchase",
    status: "Normal",
    risk: "Low",
    time: "09:20 AM",
  },
  {
    id: 4,
    amount: "Rp 15.750.000",
    type: "Transfer",
    status: "Review",
    risk: "Medium",
    time: "08:55 AM",
  },
  {
    id: 5,
    amount: "Rp 3.200.000",
    type: "Payment",
    status: "Normal",
    risk: "Low",
    time: "08:30 AM",
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userPlan] = useState("end-to-end");

  const fraudChartOptions = {
    chart: {
      type: "line" as const,
      height: 200,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" as const },
    colors: ["#DB3737", "#F55656"],
    stroke: { curve: "smooth" as const, width: 3 },
    grid: {
      borderColor: "#404854",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: {
      labels: { style: { colors: "#8F99A8" } },
    },
    tooltip: {
      theme: "dark" as const,
      style: { fontSize: "12px" },
    },
  };

  const fraudChartSeries = [
    {
      name: "Fraud Alerts",
      data: [2, 8, 5, 12, 3, 7, 4],
    },
  ];

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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#8F99A8" },
        formatter: (val: any) => `${val}M`,
      },
    },
    tooltip: {
      theme: "dark" as const,
      y: { formatter: (val: any) => `Rp ${val}M` },
    },
  };

  const salesChartSeries = [
    {
      name: "Revenue",
      data: [45, 52, 48, 61, 58, 67],
    },
  ];

  const budgetChartOptions = {
    chart: {
      type: "donut" as const,
      height: 200,
      background: "transparent",
    },
    theme: { mode: "dark" as const },
    colors: ["#0F9960", "#3DCC91", "#15B371", "#0D8050"],
    labels: ["Marketing", "Operations", "Development", "Sales"],
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

  const budgetChartSeries = [35, 25, 25, 15];

  const hasAccess = (feature: string) => {
    if (userPlan === "end-to-end") return true;
    return userPlan === feature;
  };

  return (
    <div className="min-h-screen bg-palantir-black">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="dashboard-sidebar h-full">
          <div className="flex items-center justify-between p-6 border-b border-palantir-dark-gray-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
                <CpuChipIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PointerAI</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-palantir-gray-4 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 px-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      item.current
                        ? "bg-blue-4 text-white"
                        : "text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-3"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-palantir-gray-3 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-palantir-gray-4 capitalize">
                    {userPlan.replace("-", " ")} Plan
                  </p>
                </div>
              </div>
              <button className="w-full mt-3 flex items-center justify-center space-x-2 text-palantir-gray-4 hover:text-white transition-colors">
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pl-64">
        <header className="bg-palantir-dark-gray-1 border-b border-palantir-dark-gray-4 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-palantir-gray-4 hover:text-white"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-white">
                Dashboard Overview
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-palantir-gray-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors w-64"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-palantir-gray-4 hover:text-white transition-colors"
                >
                  <BellIcon className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-4 rounded-full"></span>
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 dashboard-card rounded-xl shadow-lg z-20"
                    >
                      <div className="p-4 border-b border-palantir-dark-gray-4">
                        <h3 className="font-bold text-white">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => {
                          const Icon = notification.icon;
                          return (
                            <div
                              key={notification.id}
                              className="p-4 border-b border-palantir-dark-gray-5 last:border-b-0 hover:bg-palantir-dark-gray-2 transition-colors"
                            >
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${notification.color}-4/20`}
                                >
                                  <Icon
                                    className={`w-4 h-4 text-${notification.color}-4`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-white text-sm">
                                    {notification.title}
                                  </h4>
                                  <p className="text-palantir-gray-3 text-sm mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-palantir-gray-4 text-xs mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="p-4 border-t border-palantir-dark-gray-4">
                        <button className="w-full text-center text-blue-4 hover:text-blue-5 text-sm font-medium transition-colors">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
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
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">Rp 2.4B</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-4" />
                    <span className="text-green-4 text-sm font-medium">
                      +12.5%
                    </span>
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
                    Fraud Prevented
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">Rp 847M</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-red-4" />
                    <span className="text-red-4 text-sm font-medium">
                      +8.2%
                    </span>
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
                    Budget Efficiency
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">87.3%</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-blue-4" />
                    <span className="text-blue-4 text-sm font-medium">
                      +3.1%
                    </span>
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
                    Active Alerts
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">23</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowTrendingDownIcon className="w-4 h-4 text-orange-4" />
                    <span className="text-orange-4 text-sm font-medium">
                      -15.8%
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-4/20 rounded-lg flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-6 h-6 text-orange-4" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {hasAccess("fraud-detection") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="dashboard-card p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    Fraud Detection
                  </h3>
                  <Link
                    href="/dashboard/fraud"
                    className="text-blue-4 hover:text-blue-5 transition-colors"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-palantir-gray-4">
                    Weekly Fraud Alerts
                  </p>
                  <p className="text-2xl font-bold text-white">41 alerts</p>
                </div>
                <Chart
                  options={fraudChartOptions}
                  series={fraudChartSeries}
                  type="line"
                  height={200}
                />
              </motion.div>
            )}

            {hasAccess("sales-forecasting") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="dashboard-card p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    Sales Forecast
                  </h3>
                  <Link
                    href="/dashboard/sales"
                    className="text-blue-4 hover:text-blue-5 transition-colors"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-palantir-gray-4">
                    6-Month Revenue Trend
                  </p>
                  <p className="text-2xl font-bold text-white">
                    Rp 67M projected
                  </p>
                </div>
                <Chart
                  options={{
                    ...salesChartOptions,
                    chart: {
                      ...salesChartOptions.chart,
                      type: "area",
                    },
                  }}
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
                transition={{ delay: 0.7 }}
                className="dashboard-card p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    Budget Distribution
                  </h3>
                  <Link
                    href="/dashboard/budget"
                    className="text-blue-4 hover:text-blue-5 transition-colors"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-palantir-gray-4">
                    Current Allocation
                  </p>
                  <p className="text-2xl font-bold text-white">Rp 1.2B total</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="dashboard-card p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">
                  Recent Transactions
                </h3>
                <Link
                  href="/dashboard/fraud"
                  className="text-blue-4 hover:text-blue-5 text-sm font-medium transition-colors"
                >
                  View All
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
              transition={{ delay: 0.9 }}
              className="dashboard-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-white mb-6">
                Quick Actions
              </h3>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-4/20 rounded-lg flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-4" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-white">Ask AI Assistant</p>
                      <p className="text-sm text-palantir-gray-4">
                        Get instant insights
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
                      <p className="font-medium text-white">
                        Review Fraud Alerts
                      </p>
                      <p className="text-sm text-palantir-gray-4">
                        23 pending alerts
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
                      <p className="font-medium text-white">Generate Report</p>
                      <p className="text-sm text-palantir-gray-4">
                        Monthly summary
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
                      <p className="font-medium text-white">Optimize Budget</p>
                      <p className="text-sm text-palantir-gray-4">
                        AI recommendations
                      </p>
                    </div>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-palantir-gray-4 group-hover:text-white transition-colors" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-4/20 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-blue-4" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-white">
                        Schedule Analysis
                      </p>
                      <p className="text-sm text-palantir-gray-4">
                        Set up automation
                      </p>
                    </div>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-palantir-gray-4 group-hover:text-white transition-colors" />
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8 dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
                <CpuChipIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">
                AI Insights & Recommendations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-red-4 rounded-full animate-pulse"></div>
                  <h4 className="font-medium text-white">Fraud Alert</h4>
                </div>
                <p className="text-sm text-palantir-gray-3 mb-3">
                  Detected unusual transaction pattern in Southeast Asia region.
                  Recommend immediate review of transactions above Rp 100M.
                </p>
                <button className="text-red-4 hover:text-red-5 text-sm font-medium transition-colors">
                  Investigate →
                </button>
              </div>

              <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-blue-4 rounded-full animate-pulse"></div>
                  <h4 className="font-medium text-white">Sales Opportunity</h4>
                </div>
                <p className="text-sm text-palantir-gray-3 mb-3">
                  Q1 sales trending 15% above forecast. Consider increasing
                  marketing budget by Rp 50M for maximum ROI.
                </p>
                <button className="text-blue-4 hover:text-blue-5 text-sm font-medium transition-colors">
                  View Details →
                </button>
              </div>

              <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-green-4 rounded-full animate-pulse"></div>
                  <h4 className="font-medium text-white">
                    Budget Optimization
                  </h4>
                </div>
                <p className="text-sm text-palantir-gray-3 mb-3">
                  Identified Rp 125M in potential savings by reallocating
                  underperforming marketing spend to high-ROI channels.
                </p>
                <button className="text-green-4 hover:text-green-5 text-sm font-medium transition-colors">
                  Apply Changes →
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
