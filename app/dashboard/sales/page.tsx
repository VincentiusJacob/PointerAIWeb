"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon,
  CalendarIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  GlobeAltIcon,
  LightBulbIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const forecastMetrics = [
  {
    label: "Predicted Q1 Revenue",
    value: "Rp 2.84B",
    change: "+12.5%",
    trend: "up",
    confidence: "94%",
    description: "Based on 36-month historical data",
  },
  {
    label: "Expected Growth Rate",
    value: "15.7%",
    change: "+2.3%",
    trend: "up",
    confidence: "91%",
    description: "YoY growth prediction",
  },
  {
    label: "Customer Acquisition",
    value: "1,247",
    change: "+8.9%",
    trend: "up",
    confidence: "87%",
    description: "New customers this quarter",
  },
  {
    label: "Market Share",
    value: "23.4%",
    change: "-1.2%",
    trend: "down",
    confidence: "89%",
    description: "Competitive analysis",
  },
];

const salesChannels = [
  { name: "E-commerce", revenue: "Rp 1.2B", growth: "+18%", share: 42 },
  { name: "Retail Stores", revenue: "Rp 890M", growth: "+12%", share: 31 },
  { name: "B2B Sales", revenue: "Rp 650M", growth: "+25%", share: 23 },
  { name: "Partnerships", revenue: "Rp 130M", growth: "+8%", share: 4 },
];

const regionData = [
  { region: "Jakarta", revenue: "Rp 980M", growth: "+15%", potential: "High" },
  {
    region: "Surabaya",
    revenue: "Rp 650M",
    growth: "+22%",
    potential: "Very High",
  },
  { region: "Bandung", revenue: "Rp 420M", growth: "+18%", potential: "High" },
  { region: "Medan", revenue: "Rp 280M", growth: "+12%", potential: "Medium" },
  {
    region: "Semarang",
    revenue: "Rp 210M",
    growth: "+8%",
    potential: "Medium",
  },
];

export default function SalesForecastingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("quarterly");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [forecastHorizon, setForecastHorizon] = useState("12months");

  // Revenue Forecast Chart
  const revenueForecastOptions: ApexOptions = {
    chart: {
      type: "line" as "line",
      height: 400,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#2D72D2", "#4C90F0", "#8ABBFF"],
    stroke: {
      curve: "smooth",
      width: [3, 3, 2],
      dashArray: [0, 0, 5],
    },
    grid: {
      borderColor: "#404854",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#8F99A8" },
        formatter: (val: any) => `Rp ${val}M`,
      },
    },
    legend: {
      labels: { colors: "#8F99A8" },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#4C90F0", "#8ABBFF", "#C5CBD3"],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
      },
    },
    annotations: {
      xaxis: [
        {
          x: "Aug",
          borderColor: "#0F9960",
          label: {
            style: { color: "#fff", background: "#0F9960" },
            text: "Forecast Start",
          },
        },
      ],
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: any) => `Rp ${val}M` },
    },
  };

  const revenueForecastSeries = [
    {
      name: "Actual Revenue",
      data: [185, 198, 210, 195, 220, 235, 245, null, null, null, null, null],
    },
    {
      name: "Predicted Revenue",
      data: [null, null, null, null, null, null, 245, 260, 275, 285, 295, 310],
    },
    {
      name: "Confidence Range",
      data: [null, null, null, null, null, null, 235, 250, 265, 275, 285, 300],
    },
  ];

  // Sales by Product Category
  const productCategoryOptions: ApexOptions = {
    chart: {
      type: "bar" as "bar",
      height: 300,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#2D72D2", "#4C90F0"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#404854",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: [
        "Electronics",
        "Fashion",
        "Home & Garden",
        "Sports",
        "Books",
        "Automotive",
      ],
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

  const productCategorySeries = [
    {
      name: "Current Quarter",
      data: [89, 67, 45, 32, 28, 23],
    },
    {
      name: "Predicted Next Quarter",
      data: [102, 78, 52, 38, 31, 27],
    },
  ];

  // Customer Lifetime Value Prediction
  const clvOptions: ApexOptions = {
    chart: {
      type: "area" as "area",
      height: 250,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#0F9960"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
      },
    },
    stroke: { curve: "smooth", width: 2 },
    grid: {
      borderColor: "#404854",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: [
        "Month 1",
        "Month 3",
        "Month 6",
        "Month 12",
        "Month 18",
        "Month 24",
      ],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#8F99A8" },
        formatter: (val: any) => `Rp ${val}M`,
      },
    },
    tooltip: {
      theme: "dark" as const,
      y: { formatter: (val: any) => `Rp ${val}M` },
    },
  };

  const clvSeries = [
    {
      name: "Customer Lifetime Value",
      data: [1.2, 2.8, 5.1, 8.7, 11.2, 13.5],
    },
  ];

  return (
    <div className="min-h-screen bg-palantir-black">
      <div className="bg-palantir-dark-gray-1 border-b border-palantir-dark-gray-4 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-4/20 rounded-xl flex items-center justify-center">
              <ChartBarIcon className="w-7 h-7 text-blue-4" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Sales Forecasting
              </h1>
              <p className="text-palantir-gray-3">
                Advanced predictive analytics and market insights
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ArrowPathIcon className="w-4 h-4 text-green-4 animate-spin" />
              <span className="text-sm text-palantir-gray-4">
                Model updated 2 hours ago
              </span>
            </div>

            <button className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>Export Forecast</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {forecastMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="dashboard-card p-6 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-4/20 to-transparent rounded-bl-3xl"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-palantir-gray-4 text-sm font-medium">
                    {metric.label}
                  </p>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      metric.trend === "up"
                        ? "bg-green-4/20 text-green-4"
                        : "bg-red-4/20 text-red-4"
                    }`}
                  >
                    {metric.confidence}
                  </div>
                </div>

                <p className="text-3xl font-bold text-white mb-1">
                  {metric.value}
                </p>

                <div className="flex items-center space-x-2 mb-2">
                  {metric.trend === "up" ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-4" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === "up" ? "text-green-4" : "text-red-4"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>

                <p className="text-xs text-palantir-gray-4">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="dashboard-card p-6 rounded-xl mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Revenue Forecast</h3>
            <div className="flex items-center space-x-4">
              <select
                value={forecastHorizon}
                onChange={(e) => setForecastHorizon(e.target.value)}
                className="bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
              >
                <option value="6months">6 Months</option>
                <option value="12months">12 Months</option>
                <option value="18months">18 Months</option>
                <option value="24months">24 Months</option>
              </select>

              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-4 focus:ring-1 focus:ring-blue-4"
              >
                <option value="all">All Segments</option>
                <option value="b2b">B2B Only</option>
                <option value="b2c">B2C Only</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          <Chart
            options={revenueForecastOptions}
            series={revenueForecastSeries}
            type="line"
            height={400}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 bg-palantir-dark-gray-2 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-palantir-gray-4">Forecast Accuracy</p>
              <p className="text-2xl font-bold text-green-4">94.2%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-palantir-gray-4">
                Prediction Variance
              </p>
              <p className="text-2xl font-bold text-blue-4">±5.8%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-palantir-gray-4">Model Confidence</p>
              <p className="text-2xl font-bold text-orange-4">91.5%</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Sales by Product Category
            </h3>
            <Chart
              options={productCategoryOptions}
              series={productCategorySeries}
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
              Customer Lifetime Value Prediction
            </h3>
            <Chart
              options={clvOptions}
              series={clvSeries}
              type="area"
              height={250}
            />
            <div className="mt-4 p-3 bg-palantir-dark-gray-2 rounded-lg">
              <p className="text-sm text-palantir-gray-3">
                <span className="text-green-4 font-medium">Average CLV:</span>{" "}
                Rp 13.5M over 24 months
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="dashboard-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Sales Channel Performance
            </h3>

            <div className="space-y-4">
              {salesChannels.map((channel, index) => (
                <div
                  key={channel.name}
                  className="p-4 bg-palantir-dark-gray-2 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{channel.name}</h4>
                    <div className="flex items-center space-x-2">
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-4" />
                      <span className="text-green-4 text-sm font-medium">
                        {channel.growth}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-white">
                      {channel.revenue}
                    </span>
                    <span className="text-sm text-palantir-gray-4">
                      {channel.share}% share
                    </span>
                  </div>

                  <div className="w-full bg-palantir-dark-gray-4 rounded-full h-2">
                    <div
                      className="bg-blue-4 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${channel.share}%` }}
                    ></div>
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
            <h3 className="text-xl font-bold text-white mb-6">
              Regional Performance
            </h3>

            <div className="space-y-4">
              {regionData.map((region, index) => (
                <div
                  key={region.region}
                  className="p-4 bg-palantir-dark-gray-2 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <GlobeAltIcon className="w-5 h-5 text-blue-4" />
                      <h4 className="font-medium text-white">
                        {region.region}
                      </h4>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        region.potential === "Very High"
                          ? "bg-green-4/20 text-green-4"
                          : region.potential === "High"
                          ? "bg-blue-4/20 text-blue-4"
                          : "bg-orange-4/20 text-orange-4"
                      }`}
                    >
                      {region.potential} Potential
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      {region.revenue}
                    </span>
                    <div className="flex items-center space-x-1">
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-4" />
                      <span className="text-green-4 text-sm font-medium">
                        {region.growth}
                      </span>
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
          transition={{ delay: 1.0 }}
          className="dashboard-card p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
              <LightBulbIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">
              AI Sales Insights & Recommendations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-palantir-dark-gray-2 rounded-lg p-5">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-green-4 rounded-full animate-pulse"></div>
                <h4 className="font-medium text-white">Growth Opportunity</h4>
              </div>
              <p className="text-sm text-palantir-gray-3 mb-4">
                B2B segment showing 25% growth - highest in 18 months. Recommend
                increasing sales team allocation by 30% for Q2.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-4 text-sm font-medium">
                  High Impact
                </span>
                <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                  Implement →
                </button>
              </div>
            </div>

            <div className="bg-palantir-dark-gray-2 rounded-lg p-5">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-orange-4 rounded-full animate-pulse"></div>
                <h4 className="font-medium text-white">Market Warning</h4>
              </div>
              <p className="text-sm text-palantir-gray-3 mb-4">
                Electronics category showing seasonal decline early. Consider
                promotional campaign to maintain momentum through Q1.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-orange-4 text-sm font-medium">
                  Attention Needed
                </span>
                <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                  Plan Campaign →
                </button>
              </div>
            </div>

            <div className="bg-palantir-dark-gray-2 rounded-lg p-5">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-blue-4 rounded-full animate-pulse"></div>
                <h4 className="font-medium text-white">Customer Insight</h4>
              </div>
              <p className="text-sm text-palantir-gray-3 mb-4">
                Customer acquisition cost decreased 18% while CLV increased 12%.
                Marketing efficiency at all-time high - scale successful
                campaigns.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-blue-4 text-sm font-medium">
                  Optimization
                </span>
                <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                  Scale Up →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
