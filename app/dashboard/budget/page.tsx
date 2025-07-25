// app/dashboard/budget/page.tsx - AutoBudgeting Dashboard
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon, // Changed from TrendingUpIcon
  ArrowTrendingDownIcon, // Changed from TrendingDownIcon
  ChartPieIcon,
  ArrowPathIcon,
  CalendarIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  BanknotesIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { ApexOptions } from "apexcharts"; // Import ApexOptions for type hinting

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const budgetCategories = [
  {
    id: 1,
    name: "Marketing & Advertising",
    allocated: 450000000,
    spent: 387000000,
    remaining: 63000000,
    performance: "+12%",
    trend: "up",
    color: "blue",
    subcategories: [
      { name: "Digital Ads", spent: 180000000, budget: 200000000 },
      { name: "Content Marketing", spent: 95000000, budget: 120000000 },
      { name: "Events & Sponsorship", spent: 112000000, budget: 130000000 },
    ],
  },
  {
    id: 2,
    name: "Operations & Infrastructure",
    allocated: 320000000,
    spent: 298000000,
    remaining: 22000000,
    performance: "+8%",
    trend: "up",
    color: "green",
    subcategories: [
      { name: "Cloud Services", spent: 125000000, budget: 140000000 },
      { name: "Office Rent", spent: 85000000, budget: 90000000 },
      { name: "Utilities", spent: 88000000, budget: 90000000 },
    ],
  },
  {
    id: 3,
    name: "Research & Development",
    allocated: 280000000,
    spent: 245000000,
    remaining: 35000000,
    performance: "+15%",
    trend: "up",
    color: "orange",
    subcategories: [
      { name: "Software Development", spent: 145000000, budget: 160000000 },
      { name: "Innovation Lab", spent: 60000000, budget: 70000000 },
      { name: "Patents & IP", spent: 40000000, budget: 50000000 },
    ],
  },
  {
    id: 4,
    name: "Human Resources",
    allocated: 580000000,
    spent: 542000000,
    remaining: 38000000,
    performance: "+5%",
    trend: "up",
    color: "red",
    subcategories: [
      { name: "Salaries & Benefits", spent: 420000000, budget: 450000000 },
      { name: "Training & Development", spent: 45000000, budget: 60000000 },
      { name: "Recruitment", spent: 77000000, budget: 70000000 },
    ],
  },
];

const monthlySpending = [
  { month: "Jan", planned: 185, actual: 178, variance: -7 },
  { month: "Feb", planned: 195, actual: 203, variance: 8 },
  { month: "Mar", planned: 210, actual: 198, variance: -12 },
  { month: "Apr", planned: 205, actual: 215, variance: 10 },
  { month: "May", planned: 220, actual: 225, variance: 5 },
  { month: "Jun", planned: 235, actual: 228, variance: -7 },
];

const optimizationSuggestions = [
  {
    category: "Marketing",
    suggestion:
      "Reallocate Rp 45M from underperforming digital ads to high-ROI content marketing",
    impact: "Rp 67M",
    confidence: "92%",
    priority: "High",
  },
  {
    category: "Operations",
    suggestion: "Negotiate cloud services contract for 18% cost reduction",
    impact: "Rp 22M",
    confidence: "87%",
    priority: "Medium",
  },
  {
    category: "HR",
    suggestion:
      "Optimize recruitment spend - shift 30% budget to employee referral program",
    impact: "Rp 15M",
    confidence: "94%",
    priority: "High",
  },
];

// Helper object to map color names to full Tailwind class strings
const colorClassMap: { [key: string]: string } = {
  blue: "bg-blue-4/20 text-blue-4",
  green: "bg-green-4/20 text-green-4",
  orange: "bg-orange-4/20 text-orange-4",
  red: "bg-red-4/20 text-red-4",
};

// Helper object for progress bar colors (for simplicity, assuming bg-COLOR-4)
const progressBarColorMap: { [key: string]: string } = {
  blue: "bg-blue-4",
  green: "bg-green-4",
  orange: "bg-orange-4",
  red: "bg-red-4",
};

export default function AutoBudgetingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showOptimizationModal, setShowOptimizationModal] = useState(false);

  // Budget Overview Chart
  const budgetOverviewOptions: ApexOptions = {
    // Explicitly type as ApexOptions
    chart: {
      type: "donut" as "donut", // Explicitly cast
      height: 350,
      background: "transparent",
    },
    theme: { mode: "dark" },
    colors: ["#2D72D2", "#0F9960", "#D9822B", "#DB3737"],
    labels: ["Marketing", "Operations", "R&D", "Human Resources"],
    legend: {
      position: "bottom",
      labels: { colors: "#8F99A8" },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Budget",
              color: "#F5F8FA",
              formatter: () => "Rp 1.63B",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: { colors: ["#FFFFFF"] },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: any) => `Rp ${(val / 1000000).toFixed(0)}M`,
      },
    },
  };

  const budgetOverviewSeries = [450, 320, 280, 580];

  // Monthly Spending Trend
  const spendingTrendOptions: ApexOptions = {
    // Explicitly type as ApexOptions
    chart: {
      type: "bar" as "bar", // Explicitly cast
      height: 300,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#2D72D2", "#4C90F0", "#DB3737"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        // endingShape: 'rounded' // Removed as it's not a direct property here
        borderRadius: 4, // Added for rounded corners, if desired
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#404854",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: monthlySpending.map((m) => m.month),
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#8F99A8" },
        formatter: (val: any) => `${val}M`,
      },
    },
    legend: {
      labels: { colors: "#8F99A8" },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: any) => `Rp ${val}M` },
    },
  };

  const spendingTrendSeries = [
    {
      name: "Planned",
      data: monthlySpending.map((m) => m.planned),
    },
    {
      name: "Actual",
      data: monthlySpending.map((m) => m.actual),
    },
    {
      name: "Variance",
      data: monthlySpending.map((m) => Math.abs(m.variance)),
    },
  ];

  // Cost Optimization Potential
  const optimizationOptions: ApexOptions = {
    // Explicitly type as ApexOptions
    chart: {
      type: "radialBar" as "radialBar", // Explicitly cast
      height: 280,
      background: "transparent",
    },
    theme: { mode: "dark" },
    colors: ["#0F9960", "#D9822B", "#2D72D2"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: "14px", color: "#F5F8FA" },
          value: { fontSize: "16px", color: "#F5F8FA" },
        },
      },
    },
    labels: ["Cost Reduction", "Efficiency Gain", "ROI Improvement"],
  };

  const optimizationSeries = [87, 73, 94];

  const totalAllocated = budgetCategories.reduce(
    (sum, cat) => sum + cat.allocated,
    0
  );
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  return (
    <div className="min-h-screen bg-palantir-black">
      <div className="bg-palantir-dark-gray-1 border-b border-palantir-dark-gray-4 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-4/20 rounded-xl flex items-center justify-center">
              <CurrencyDollarIcon className="w-7 h-7 text-green-4" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AutoBudgeting</h1>
              <p className="text-palantir-gray-3">
                Intelligent budget optimization and financial planning
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ArrowPathIcon className="w-4 h-4 text-green-4 animate-spin" />
              <span className="text-sm text-palantir-gray-4">
                Auto-optimizing budget
              </span>
            </div>

            <button
              onClick={() => setShowOptimizationModal(true)}
              className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <LightBulbIcon className="w-4 h-4" />
              <span>AI Optimize</span>
            </button>

            <button className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>Export Budget</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-4/20 rounded-lg flex items-center justify-center">
                <BanknotesIcon className="w-6 h-6 text-blue-4" />
              </div>
              <div className="text-right">
                <p className="text-sm text-palantir-gray-4">Total Allocated</p>
                <p className="text-2xl font-bold text-white">
                  Rp {(totalAllocated / 1000000000).toFixed(2)}B
                </p>
              </div>
            </div>
            <div className="w-full bg-palantir-dark-gray-4 rounded-full h-2">
              <div className="bg-blue-4 h-2 rounded-full w-full"></div>
            </div>
            <p className="text-xs text-palantir-gray-4 mt-2">
              100% of annual budget
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-4/20 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-orange-4" />
              </div>
              <div className="text-right">
                <p className="text-sm text-palantir-gray-4">Total Spent</p>
                <p className="text-2xl font-bold text-white">
                  Rp {(totalSpent / 1000000000).toFixed(2)}B
                </p>
              </div>
            </div>
            <div className="w-full bg-palantir-dark-gray-4 rounded-full h-2">
              <div
                className="bg-orange-4 h-2 rounded-full"
                style={{ width: `${(totalSpent / totalAllocated) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-palantir-gray-4 mt-2">
              {((totalSpent / totalAllocated) * 100).toFixed(1)}% of allocated
              budget
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-4/20 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-4" />
              </div>
              <div className="text-right">
                <p className="text-sm text-palantir-gray-4">Remaining</p>
                <p className="text-2xl font-bold text-white">
                  Rp {(totalRemaining / 1000000).toFixed(0)}M
                </p>
              </div>
            </div>
            <div className="w-full bg-palantir-dark-gray-4 rounded-full h-2">
              <div
                className="bg-green-4 h-2 rounded-full"
                style={{ width: `${(totalRemaining / totalAllocated) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-palantir-gray-4 mt-2">
              {((totalRemaining / totalAllocated) * 100).toFixed(1)}% remaining
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-4/20 rounded-lg flex items-center justify-center">
                <ArrowTrendingUpIcon className="w-6 h-6 text-red-4" />{" "}
              </div>
              <div className="text-right">
                <p className="text-sm text-palantir-gray-4">Efficiency Score</p>
                <p className="text-2xl font-bold text-white">87.3%</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-4" />{" "}
              <span className="text-green-4 text-sm font-medium">+5.2%</span>
              <span className="text-palantir-gray-4 text-sm">
                vs last month
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Budget Distribution
            </h3>
            <Chart
              options={budgetOverviewOptions}
              series={budgetOverviewSeries}
              type="donut"
              height={350}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Monthly Spending Trend
            </h3>
            <Chart
              options={spendingTrendOptions}
              series={spendingTrendSeries}
              type="bar"
              height={300}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Optimization Potential
            </h3>
            <Chart
              options={optimizationOptions}
              series={optimizationSeries}
              type="radialBar"
              height={280}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="dashboard-card p-6 rounded-xl mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Budget Categories</h3>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {budgetCategories.map((category) => (
              <div
                key={category.id}
                className="bg-palantir-dark-gray-2 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        colorClassMap[category.color]?.split(" ")[0] || ""
                      }`}
                    >
                      <BuildingOfficeIcon
                        className={`w-6 h-6 ${
                          colorClassMap[category.color]?.split(" ")[1] || ""
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {category.name}
                      </h4>
                      <p className="text-sm text-palantir-gray-4">
                        {((category.spent / category.allocated) * 100).toFixed(
                          1
                        )}
                        % utilized
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {category.trend === "up" ? (
                          <ArrowTrendingUpIcon className="w-4 h-4 text-green-4" />
                        ) : (
                          <ArrowTrendingDownIcon className="w-4 h-4 text-red-4" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            category.trend === "up"
                              ? "text-green-4"
                              : "text-red-4"
                          }`}
                        >
                          {category.performance}
                        </span>
                      </div>
                      <p className="text-xs text-palantir-gray-4">
                        vs last period
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="p-2 text-palantir-gray-4 hover:text-white transition-colors">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-palantir-gray-4 hover:text-red-4 transition-colors">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-palantir-gray-4 mb-1">
                      Allocated
                    </p>
                    <p className="text-2xl font-bold text-white">
                      Rp {(category.allocated / 1000000).toFixed(0)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-palantir-gray-4 mb-1">Spent</p>
                    <p className="text-2xl font-bold text-orange-4">
                      Rp {(category.spent / 1000000).toFixed(0)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-palantir-gray-4 mb-1">
                      Remaining
                    </p>
                    <p className="text-2xl font-bold text-green-4">
                      Rp {(category.remaining / 1000000).toFixed(0)}M
                    </p>
                  </div>
                </div>

                <div className="w-full bg-palantir-dark-gray-4 rounded-full h-3 mb-4">
                  <div
                    className={`${
                      progressBarColorMap[category.color] || "bg-gray-4"
                    } h-3 rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: `${(category.spent / category.allocated) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {category.subcategories.map((sub, index) => (
                    <div
                      key={index}
                      className="bg-palantir-dark-gray-3 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-white text-sm">
                          {sub.name}
                        </h5>
                        <span className="text-xs text-palantir-gray-4">
                          {((sub.spent / sub.budget) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-palantir-gray-4">
                          Rp {(sub.spent / 1000000).toFixed(0)}M
                        </span>
                        <span className="text-palantir-gray-4">
                          / Rp {(sub.budget / 1000000).toFixed(0)}M
                        </span>
                      </div>
                      <div className="w-full bg-palantir-dark-gray-5 rounded-full h-2">
                        <div
                          className={`${
                            progressBarColorMap[category.color] || "bg-gray-4"
                          } h-2 rounded-full`}
                          style={{
                            width: `${(sub.spent / sub.budget) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
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
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-green-4 to-green-5 rounded-lg flex items-center justify-center">
              <LightBulbIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">
              AI Budget Optimization
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {optimizationSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-palantir-dark-gray-2 rounded-lg p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        suggestion.priority === "High"
                          ? "bg-red-4"
                          : "bg-orange-4"
                      } animate-pulse`}
                    ></div>
                    <h4 className="font-medium text-white">
                      {suggestion.category}
                    </h4>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      suggestion.priority === "High"
                        ? "bg-red-4/20 text-red-4"
                        : "bg-orange-4/20 text-orange-4"
                    }`}
                  >
                    {suggestion.priority}
                  </div>
                </div>

                <p className="text-sm text-palantir-gray-3 mb-4">
                  {suggestion.suggestion}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-palantir-gray-4">
                      Potential Savings:
                    </span>
                    <span className="text-green-4 font-bold">
                      {suggestion.impact}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-palantir-gray-4">Confidence:</span>
                    <span className="text-blue-4 font-medium">
                      {suggestion.confidence}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-4 text-white px-3 py-2 rounded text-sm hover:bg-green-5 transition-colors">
                    Apply
                  </button>
                  <button className="flex-1 bg-palantir-dark-gray-4 text-palantir-gray-3 px-3 py-2 rounded text-sm hover:bg-palantir-gray-4 hover:text-white transition-colors">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {showOptimizationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="dashboard-card p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                AI Budget Optimization
              </h3>
              <button
                onClick={() => setShowOptimizationModal(false)}
                className="text-palantir-gray-4 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-palantir-dark-gray-2 rounded-lg p-6">
                <h4 className="text-lg font-bold text-white mb-4">
                  Optimization Analysis
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-palantir-gray-4">
                      Total Savings Potential
                    </p>
                    <p className="text-3xl font-bold text-green-4">Rp 104M</p>
                  </div>
                  <div>
                    <p className="text-sm text-palantir-gray-4">
                      Efficiency Improvement
                    </p>
                    <p className="text-3xl font-bold text-blue-4">+12.3%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">
                  Recommended Actions
                </h4>
                {optimizationSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-palantir-dark-gray-2 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-white">
                        {suggestion.category}
                      </h5>
                      <span className="text-green-4 font-bold">
                        {suggestion.impact}
                      </span>
                    </div>
                    <p className="text-sm text-palantir-gray-3 mb-3">
                      {suggestion.suggestion}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-palantir-gray-4">
                        Confidence: {suggestion.confidence}
                      </span>
                      <button className="bg-green-4 text-white px-3 py-1 rounded text-xs">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 btn-primary py-3 rounded-xl">
                  Apply All Optimizations
                </button>
                <button
                  onClick={() => setShowOptimizationModal(false)}
                  className="flex-1 btn-secondary py-3 rounded-xl"
                >
                  Review Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
