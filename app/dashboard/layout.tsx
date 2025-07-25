"use client";

import type React from "react";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
} from "@heroicons/react/24/outline";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
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
    title: "Transaksi Mencurigakan",
    message: "Pembayaran tunai Rp 500.000 di luar jam operasional",
    time: "2 menit lalu",
    icon: ExclamationTriangleIcon,
    color: "red",
  },
  {
    id: 2,
    type: "success",
    title: "Optimasi Budget",
    message: "Penghematan bahan baku Rp 150.000 bulan ini",
    time: "1 jam lalu",
    icon: CheckCircleIcon,
    color: "green",
  },
  {
    id: 3,
    type: "info",
    title: "Prediksi Penjualan",
    message: "Penjualan akhir pekan diprediksi naik 15%",
    time: "3 jam lalu",
    icon: InformationCircleIcon,
    color: "blue",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userPlan] = useState("end-to-end");
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    // Clear any stored user data/tokens if needed
    // localStorage.removeItem('userToken') // uncomment if you store tokens

    // Redirect to landing page
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-palantir-dark-gray-1 relative">
      {/* Enhanced Background Effects */}
      <div className="dashboard-background"></div>
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>

      {/* Existing animated grid - keep this */}
      <div className="fixed inset-0 animated-grid opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-1/5 via-transparent to-green-1/5" />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="dashboard-sidebar h-full">
          <div className="flex items-center justify-between p-6 border-b border-palantir-dark-gray-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
                <CpuChipIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PointerAI</span>
            </Link>
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
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-4 text-white"
                        : "text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-3"
                    }`}
                    onClick={() => setSidebarOpen(false)} // Close sidebar on mobile when clicking
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
                  <p className="text-sm font-medium text-white">Pak Budi</p>
                  <p className="text-xs text-palantir-gray-4">
                    Warung Bakmie Sederhana
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full mt-3 flex items-center justify-center space-x-2 text-palantir-gray-4 hover:text-white transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="relative z-40 bg-palantir-dark-gray-1 border-b border-palantir-dark-gray-4 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-palantir-gray-4 hover:text-white"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {pathname === "/dashboard" && "Dashboard Overview"}
                  {pathname === "/dashboard/fraud" && "Fraud Detection"}
                  {pathname === "/dashboard/sales" && "Sales Forecasting"}
                  {pathname === "/dashboard/budget" && "AutoBudgeting"}
                  {pathname === "/dashboard/chat" && "AI Assistant"}
                  {pathname === "/dashboard/settings" && "Settings"}
                </h1>
                <p className="text-palantir-gray-3 text-sm">
                  Warung Bakmie Sederhana
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-palantir-gray-4" />
                <input
                  type="text"
                  placeholder="Cari..."
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
                        <h3 className="font-bold text-white">Notifikasi</h3>
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
                          Lihat Semua Notifikasi
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative z-30">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
