// app/dashboard/settings/page.tsx - Settings page
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CogIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GlobeAltIcon,
  EyeIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const settingsSections = [
  {
    id: "profile",
    title: "Profile Settings",
    icon: UserIcon,
    description: "Manage your account information and preferences",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: BellIcon,
    description: "Configure alerts and notification preferences",
  },
  {
    id: "security",
    title: "Security",
    icon: ShieldCheckIcon,
    description: "Manage your account security and privacy settings",
  },
  {
    id: "billing",
    title: "Billing & Subscription",
    icon: CreditCardIcon,
    description: "View and manage your subscription and billing details",
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: GlobeAltIcon,
    description: "Connect with external services and APIs",
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: EyeIcon,
    description: "Customize the look and feel of your dashboard",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [notifications, setNotifications] = useState({
    fraudAlerts: true,
    budgetWarnings: true,
    salesReports: false,
    systemUpdates: true,
    emailDigest: true,
  });

  return (
    <div className="min-h-screen bg-palantir-black">
      <div className="bg-palantir-dark-gray-1 border-b border-palantir-dark-gray-4 px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-palantir-gray-3/20 rounded-xl flex items-center justify-center">
            <CogIcon className="w-7 h-7 text-palantir-gray-3" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-palantir-gray-3">
              Manage your account and application preferences
            </p>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-80 bg-palantir-dark-gray-1 border-r border-palantir-dark-gray-4 p-6">
          <nav className="space-y-2">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-4 text-white"
                      : "text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-3"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <div>
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-xs opacity-75 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === "profile" && (
              <div className="space-y-8">
                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="john.doe@company.com"
                        className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        defaultValue="Acme Corporation"
                        className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="btn-primary px-6 py-3 rounded-lg">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Profile Picture
                  </h3>
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-palantir-gray-3 rounded-full flex items-center justify-center">
                      <UserIcon className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <button className="btn-secondary px-4 py-2 rounded-lg mr-3">
                        Upload New Photo
                      </button>
                      <button className="text-red-4 hover:text-red-5 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-8">
                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Notification Preferences
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-white capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h4>
                          <p className="text-sm text-palantir-gray-4">
                            {key === "fraudAlerts" &&
                              "Get notified when suspicious activity is detected"}
                            {key === "budgetWarnings" &&
                              "Receive alerts when budget thresholds are exceeded"}
                            {key === "salesReports" &&
                              "Weekly sales performance and forecast updates"}
                            {key === "systemUpdates" &&
                              "Important system updates and maintenance notices"}
                            {key === "emailDigest" &&
                              "Daily digest of key metrics and insights"}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              setNotifications({
                                ...notifications,
                                [key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-palantir-dark-gray-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-4"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Delivery Methods
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-palantir-dark-gray-2 rounded-lg border-2 border-blue-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <BellIcon className="w-5 h-5 text-blue-4" />
                        <h4 className="font-medium text-white">In-App</h4>
                      </div>
                      <p className="text-sm text-palantir-gray-4">
                        Receive notifications within the application
                      </p>
                    </div>
                    <div className="p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <DevicePhoneMobileIcon className="w-5 h-5 text-palantir-gray-4" />
                        <h4 className="font-medium text-white">SMS</h4>
                      </div>
                      <p className="text-sm text-palantir-gray-4">
                        Text messages for critical alerts
                      </p>
                    </div>
                    <div className="p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <ComputerDesktopIcon className="w-5 h-5 text-palantir-gray-4" />
                        <h4 className="font-medium text-white">Email</h4>
                      </div>
                      <p className="text-sm text-palantir-gray-4">
                        Email notifications and reports
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-8">
                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Password & Authentication
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
                      />
                    </div>
                    <button className="btn-primary px-6 py-3 rounded-lg">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Two-Factor Authentication
                  </h3>
                  <div className="p-4 bg-palantir-dark-gray-2 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-4/20 rounded-lg flex items-center justify-center">
                          <ShieldCheckIcon className="w-5 h-5 text-green-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            2FA Enabled
                          </h4>
                          <p className="text-sm text-palantir-gray-4">
                            Your account is protected with two-factor
                            authentication
                          </p>
                        </div>
                      </div>
                      <button className="btn-secondary px-4 py-2 rounded-lg">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    API Keys
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-palantir-dark-gray-2 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">
                            Production API Key
                          </h4>
                          <p className="text-sm text-palantir-gray-4">
                            pk_live_*********************abc123
                          </p>
                          <p className="text-xs text-palantir-gray-4 mt-1">
                            Last used: 2 hours ago
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="btn-secondary px-3 py-2 rounded text-sm">
                            Regenerate
                          </button>
                          <button className="text-red-4 hover:text-red-5 px-3 py-2 rounded text-sm transition-colors">
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary px-4 py-2 rounded-lg">
                      Generate New API Key
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "billing" && (
              <div className="space-y-8">
                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Current Subscription
                  </h3>
                  <div className="p-6 bg-gradient-to-r from-blue-4/10 to-green-3/10 rounded-lg border border-blue-4/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-white">
                          End-to-End Solution
                        </h4>
                        <p className="text-palantir-gray-3">
                          All features included
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-white">
                          Rp 7.500.000
                        </p>
                        <p className="text-palantir-gray-3">/month</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-palantir-gray-4">
                          Next Billing
                        </p>
                        <p className="font-bold text-white">Feb 15, 2025</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-palantir-gray-4">Usage</p>
                        <p className="font-bold text-white">87% of limits</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-palantir-gray-4">Status</p>
                        <p className="font-bold text-green-4">Active</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button className="btn-secondary px-4 py-2 rounded-lg">
                        Change Plan
                      </button>
                      <button className="text-red-4 hover:text-red-5 px-4 py-2 rounded-lg transition-colors">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Payment Method
                  </h3>
                  <div className="p-4 bg-palantir-dark-gray-2 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-blue-4 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            VISA
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            **** **** **** 4242
                          </h4>
                          <p className="text-sm text-palantir-gray-4">
                            Expires 12/26
                          </p>
                        </div>
                      </div>
                      <button className="btn-secondary px-4 py-2 rounded-lg">
                        Update
                      </button>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Billing History
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        date: "Jan 15, 2025",
                        amount: "Rp 7.500.000",
                        status: "Paid",
                      },
                      {
                        date: "Dec 15, 2024",
                        amount: "Rp 7.500.000",
                        status: "Paid",
                      },
                      {
                        date: "Nov 15, 2024",
                        amount: "Rp 7.500.000",
                        status: "Paid",
                      },
                    ].map((invoice, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-white">
                            {invoice.date}
                          </h4>
                          <p className="text-sm text-palantir-gray-4">
                            Monthly subscription
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-bold text-white">
                            {invoice.amount}
                          </span>
                          <span className="text-green-4 text-sm">
                            {invoice.status}
                          </span>
                          <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "integrations" && (
              <div className="space-y-8">
                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Connected Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "Slack", status: "Connected", icon: "💬" },
                      {
                        name: "Microsoft Teams",
                        status: "Not Connected",
                        icon: "👥",
                      },
                      {
                        name: "Google Workspace",
                        status: "Connected",
                        icon: "📧",
                      },
                      { name: "Salesforce", status: "Connected", icon: "☁️" },
                      {
                        name: "QuickBooks",
                        status: "Not Connected",
                        icon: "📊",
                      },
                      { name: "Stripe", status: "Connected", icon: "💳" },
                    ].map((service, index) => (
                      <div
                        key={index}
                        className="p-4 bg-palantir-dark-gray-2 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{service.icon}</span>
                            <div>
                              <h4 className="font-medium text-white">
                                {service.name}
                              </h4>
                              <p
                                className={`text-sm ${
                                  service.status === "Connected"
                                    ? "text-green-4"
                                    : "text-palantir-gray-4"
                                }`}
                              >
                                {service.status}
                              </p>
                            </div>
                          </div>
                          <button
                            className={`px-4 py-2 rounded-lg text-sm ${
                              service.status === "Connected"
                                ? "bg-red-4/20 text-red-4 hover:bg-red-4/30"
                                : "btn-primary"
                            }`}
                          >
                            {service.status === "Connected"
                              ? "Disconnect"
                              : "Connect"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Webhooks
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-palantir-dark-gray-2 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">
                            Fraud Detection Webhook
                          </h4>
                          <p className="text-sm text-palantir-gray-4">
                            https://api.yourcompany.com/webhooks/fraud
                          </p>
                          <p className="text-xs text-green-4 mt-1">
                            Active • Last triggered 2 hours ago
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="btn-secondary px-3 py-2 rounded text-sm">
                            Edit
                          </button>
                          <button className="text-red-4 hover:text-red-5 px-3 py-2 rounded text-sm transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary px-4 py-2 rounded-lg">
                      Add New Webhook
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="space-y-8">
                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Theme Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-palantir-dark-gray-2 rounded-lg border-2 border-blue-4">
                      <div className="w-full h-20 bg-gradient-to-br from-palantir-black to-palantir-dark-gray-2 rounded mb-3"></div>
                      <h4 className="font-medium text-white">Dark (Current)</h4>
                      <p className="text-sm text-palantir-gray-4">
                        Palantir-inspired dark theme
                      </p>
                    </div>
                    <div className="p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4 opacity-50">
                      <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-white rounded mb-3"></div>
                      <h4 className="font-medium text-white">Light</h4>
                      <p className="text-sm text-palantir-gray-4">
                        Coming soon
                      </p>
                    </div>
                    <div className="p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4 opacity-50">
                      <div className="w-full h-20 bg-gradient-to-br from-purple-900 to-blue-900 rounded mb-3"></div>
                      <h4 className="font-medium text-white">Auto</h4>
                      <p className="text-sm text-palantir-gray-4">
                        System preference
                      </p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Dashboard Layout
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">
                          Compact Sidebar
                        </h4>
                        <p className="text-sm text-palantir-gray-4">
                          Show icons only in sidebar
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-palantir-dark-gray-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-4"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-palantir-dark-gray-2 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">
                          Auto-hide Navigation
                        </h4>
                        <p className="text-sm text-palantir-gray-4">
                          Hide sidebar when not in use
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-palantir-dark-gray-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-4"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Data Visualization
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        Default Chart Type
                      </label>
                      <select className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4">
                        <option>Line Chart</option>
                        <option>Bar Chart</option>
                        <option>Area Chart</option>
                        <option>Mixed Chart</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                        Animation Speed
                      </label>
                      <select className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4">
                        <option>Fast</option>
                        <option>Normal</option>
                        <option>Slow</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
