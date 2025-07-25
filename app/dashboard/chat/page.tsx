// app/dashboard/chat/page.tsx - Revolutionary AI Chatbot
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  PhotoIcon,
  ChartBarIcon,
  DocumentTextIcon,
  LightBulbIcon,
  CpuChipIcon,
  SparklesIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  BookmarkIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chatHistory = [
  {
    id: 1,
    type: "user",
    message: "Analisis performa fraud detection dalam 7 hari terakhir",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "ai",
    message:
      "Berdasarkan analisis data 7 hari terakhir, sistem fraud detection menunjukkan performa yang sangat baik:",
    timestamp: "10:30 AM",
    hasChart: true,
    chartType: "fraud",
    insights: [
      "Berhasil mendeteksi 41 transaksi mencurigakan",
      "Tingkat akurasi mencapai 97.3% (naik 2.1%)",
      "False positive rate turun menjadi 0.8%",
      "Waktu respons rata-rata 0.3 detik",
    ],
    actions: ["View Detailed Report", "Configure Alerts", "Export Data"],
  },
  {
    id: 3,
    type: "user",
    message: "Bagaimana prediksi sales untuk Q1 2025?",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    type: "ai",
    message:
      "Prediksi sales Q1 2025 menunjukkan tren positif dengan growth yang signifikan:",
    timestamp: "10:35 AM",
    hasChart: true,
    chartType: "sales",
    insights: [
      "Projected revenue: Rp 2.84B (+12.5% YoY)",
      "Confidence level: 94.2%",
      "Key growth drivers: B2B segment (+25%), E-commerce (+18%)",
      "Risk factors: Economic uncertainty, market saturation",
    ],
    actions: ["Download Forecast", "Set Alerts", "Share with Team"],
  },
];

const quickPrompts = [
  {
    icon: ChartBarIcon,
    text: "Show revenue trends",
    category: "Analytics",
    description: "Analyze recent revenue patterns and forecasts",
  },
  {
    icon: ShieldCheckIcon,
    text: "Latest fraud alerts",
    category: "Security",
    description: "Review recent fraud detection alerts and status",
  },
  {
    icon: CurrencyDollarIcon,
    text: "Budget optimization",
    category: "Finance",
    description: "AI-powered budget recommendations and insights",
  },
  {
    icon: ArrowTrendingUpIcon,
    text: "Market opportunities",
    category: "Strategy",
    description: "Identify new market opportunities and growth areas",
  },
  {
    icon: LightBulbIcon,
    text: "Performance insights",
    category: "Intelligence",
    description: "Get actionable insights from your business data",
  },
  {
    icon: ExclamationTriangleIcon,
    text: "Risk assessment",
    category: "Risk",
    description: "Comprehensive risk analysis and mitigation strategies",
  },
];

const aiCapabilities = [
  {
    title: "Contextual Data Analysis",
    description:
      "Understands your business context and provides relevant insights",
    icon: CpuChipIcon,
    color: "blue",
  },
  {
    title: "Predictive Modeling",
    description: "Advanced ML models for forecasting and trend prediction",
    icon: ArrowTrendingUpIcon,
    color: "green",
  },
  {
    title: "Interactive Visualizations",
    description: "Create and modify charts through natural conversation",
    icon: ChartBarIcon,
    color: "orange",
  },
  {
    title: "Real-time Monitoring",
    description: "Live alerts and notifications for critical events",
    icon: ClockIcon,
    color: "red",
  },
];

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      type: "user",
      message: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Simulate AI response
    setIsTyping(true);
    setMessage("");

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        message:
          "Saya sedang menganalisis data Anda dan akan memberikan insights yang comprehensive...",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        hasChart: Math.random() > 0.5,
        chartType: ["fraud", "sales", "budget"][Math.floor(Math.random() * 3)],
        insights: [
          "Data menunjukkan tren positif dalam periode analisis",
          "Ditemukan beberapa pola menarik yang perlu diperhatikan",
          "Rekomendasi actionable tersedia untuk optimisasi",
        ],
        actions: ["View Details", "Export Report", "Set Alert"],
      };
      setIsTyping(false);
    }, 2000);
  };

  const handlePromptClick = (prompt: any) => {
    setMessage(prompt.text);
    setSelectedPrompt(prompt);
    inputRef.current?.focus();
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const fraudChartOptions: ApexOptions = {
    chart: {
      type: "line" as "line",
      height: 200,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#DB3737"],
    stroke: { curve: "smooth", width: 3 },
    grid: { borderColor: "#404854" },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: { labels: { style: { colors: "#8F99A8" } } },
  };

  const salesChartOptions: ApexOptions = {
    chart: {
      type: "area" as "area",
      height: 200,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#2D72D2"],
    fill: { type: "gradient", gradient: { opacityFrom: 0.7, opacityTo: 0.1 } },
    stroke: { curve: "smooth", width: 2 },
    grid: { borderColor: "#404854" },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: { labels: { style: { colors: "#8F99A8" } } },
  };

  return (
    <div className="min-h-screen bg-palantir-black flex">
      <div className="w-80 bg-palantir-dark-gray-1 border-r border-palantir-dark-gray-4 flex flex-col">
        <div className="p-6 border-b border-palantir-dark-gray-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-4 to-blue-5 rounded-xl flex items-center justify-center">
              <CpuChipIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                PointerAI Assistant
              </h1>
              <p className="text-sm text-palantir-gray-3">
                Your intelligent business co-pilot
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-3 bg-palantir-dark-gray-2 rounded-lg">
            <div className="w-3 h-3 bg-green-4 rounded-full animate-pulse"></div>
            <span className="text-sm text-palantir-gray-3">
              Online & Learning
            </span>
          </div>
        </div>

        <div className="p-6 border-b border-palantir-dark-gray-4">
          <h3 className="text-lg font-bold text-white mb-4">AI Capabilities</h3>
          <div className="space-y-3">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-palantir-dark-gray-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors cursor-pointer"
              >
                <div
                  className={`w-8 h-8 bg-${capability.color}-4/20 rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <capability.icon
                    className={`w-4 h-4 text-${capability.color}-4`}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">
                    {capability.title}
                  </h4>
                  <p className="text-xs text-palantir-gray-4 mt-1">
                    {capability.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-4">Quick Prompts</h3>
          <div className="space-y-2">
            {quickPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => handlePromptClick(prompt)}
                className="w-full text-left p-3 bg-palantir-dark-gray-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-4/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-4/30 transition-colors">
                    <prompt.icon className="w-4 h-4 text-blue-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-white text-sm">
                        {prompt.text}
                      </h4>
                      <span className="text-xs text-blue-4 bg-blue-4/20 px-2 py-1 rounded-full">
                        {prompt.category}
                      </span>
                    </div>
                    <p className="text-xs text-palantir-gray-4">
                      {prompt.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-palantir-dark-gray-1 border-b border-palantir-dark-gray-4 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    AI Business Assistant
                  </h2>
                  <p className="text-sm text-palantir-gray-3">
                    {isTyping
                      ? "AI is thinking..."
                      : "Ready to help with your business intelligence"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-palantir-gray-4 hover:text-white transition-colors">
                <BookmarkIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-palantir-gray-4 hover:text-white transition-colors">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-palantir-gray-4 hover:text-white transition-colors">
                <ArrowDownTrayIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {chatHistory.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  chat.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-4xl ${
                    chat.type === "user" ? "order-2" : "order-1"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-3 ${
                      chat.type === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        chat.type === "user"
                          ? "bg-blue-4/20"
                          : "bg-gradient-to-br from-blue-4 to-blue-5"
                      }`}
                    >
                      {chat.type === "user" ? (
                        <span className="text-sm font-bold text-blue-4">
                          You
                        </span>
                      ) : (
                        <CpuChipIcon className="w-5 h-5 text-white" />
                      )}
                    </div>

                    <div
                      className={`flex-1 ${
                        chat.type === "user" ? "text-right" : ""
                      }`}
                    >
                      <div
                        className={`inline-block max-w-full ${
                          chat.type === "user"
                            ? "bg-blue-4 text-white rounded-2xl rounded-tr-md px-4 py-3"
                            : "bg-palantir-dark-gray-2 border border-palantir-dark-gray-4 text-white rounded-2xl rounded-tl-md px-4 py-3"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {chat.message}
                        </p>
                      </div>

                      {chat.type === "ai" && chat.insights && (
                        <div className="mt-4 bg-palantir-dark-gray-2 border border-palantir-dark-gray-4 rounded-xl p-4">
                          <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
                            <LightBulbIcon className="w-4 h-4 text-blue-4" />
                            <span>Key Insights</span>
                          </h4>
                          <ul className="space-y-2">
                            {chat.insights.map((insight, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-2 text-sm text-palantir-gray-3"
                              >
                                <CheckCircleIcon className="w-4 h-4 text-green-4 mt-0.5 flex-shrink-0" />
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {chat.type === "ai" && chat.hasChart && (
                        <div className="mt-4 bg-palantir-dark-gray-2 border border-palantir-dark-gray-4 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white flex items-center space-x-2">
                              <ChartBarIcon className="w-4 h-4 text-blue-4" />
                              <span>Data Visualization</span>
                            </h4>
                            <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          </div>

                          {chat.chartType === "fraud" && (
                            <Chart
                              options={fraudChartOptions}
                              series={[
                                {
                                  name: "Fraud Alerts",
                                  data: [2, 8, 5, 12, 3, 7, 4],
                                },
                              ]}
                              type="line"
                              height={200}
                            />
                          )}

                          {chat.chartType === "sales" && (
                            <Chart
                              options={salesChartOptions}
                              series={[
                                {
                                  name: "Revenue",
                                  data: [45, 52, 48, 61, 58, 67],
                                },
                              ]}
                              type="area"
                              height={200}
                            />
                          )}
                        </div>
                      )}

                      {chat.type === "ai" && chat.actions && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {chat.actions.map((action, idx) => (
                            <button
                              key={idx}
                              className="px-3 py-2 bg-palantir-dark-gray-3 text-palantir-gray-3 rounded-lg text-sm hover:bg-palantir-dark-gray-4 hover:text-white transition-colors"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}

                      <div
                        className={`mt-2 text-xs text-palantir-gray-4 ${
                          chat.type === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        {chat.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-4 to-blue-5 rounded-xl flex items-center justify-center">
                    <CpuChipIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-palantir-dark-gray-2 border border-palantir-dark-gray-4 rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-4 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-4 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-4 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-palantir-dark-gray-4 p-6">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything about your business data, analytics, or need insights..."
                  className="w-full px-4 py-3 pr-24 bg-palantir-dark-gray-2 border border-palantir-dark-gray-4 rounded-xl text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors resize-none"
                  rows={1}
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening
                        ? "bg-red-4 text-white"
                        : "text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-3"
                    }`}
                  >
                    <MicrophoneIcon className="w-4 h-4" />
                  </button>

                  <button className="p-2 text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-3 rounded-lg transition-colors">
                    <PhotoIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickPrompts.slice(0, 3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="px-3 py-2 bg-palantir-dark-gray-3 text-palantir-gray-3 rounded-lg text-sm hover:bg-palantir-dark-gray-2 hover:text-white transition-colors"
              >
                {prompt.text}
              </button>
            ))}
          </div>

          <div className="mt-3 text-xs text-palantir-gray-4 text-center">
            AI responses are generated based on your business data. Always
            verify critical decisions.
          </div>
        </div>
      </div>
    </div>
  );
}
