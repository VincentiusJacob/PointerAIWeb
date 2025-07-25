"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  PhotoIcon,
  ChartBarIcon,
  LightBulbIcon,
  CpuChipIcon,
  SparklesIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  BookmarkIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  FireIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import type { ApexOptions } from "apexcharts";

// Add proper type definitions at the top of the file
interface BaseChatMessage {
  id: number;
  type: "user" | "ai";
  message: string;
  timestamp: string;
}

interface UserMessage extends BaseChatMessage {
  type: "user";
}

interface AIMessage extends BaseChatMessage {
  type: "ai";
  hasChart?: boolean;
  chartType?: "sales" | "forecast" | "menu";
  insights?: string[];
  actions?: string[];
}

type ChatMessage = UserMessage | AIMessage;

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chatHistory: ChatMessage[] = [
  {
    id: 1,
    type: "user",
    message: "Analisis penjualan bakmie ayam minggu ini",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "ai",
    message:
      "Berdasarkan analisis penjualan bakmie ayam minggu ini, berikut insights yang saya temukan:",
    timestamp: "10:30 AM",
    hasChart: true,
    chartType: "sales",
    insights: [
      "Penjualan bakmie ayam mencapai Rp 9.8M (67% dari total penjualan)",
      "Peningkatan 15% dibanding minggu lalu",
      "Peak hours: 12:00-13:00 dan 18:00-19:00",
      "Dine-in masih dominan (42% share) diikuti take-away (31%)",
    ],
    actions: ["Lihat Detail Menu", "Atur Stok", "Buat Promo"],
  },
  {
    id: 3,
    type: "user",
    message: "Bagaimana prediksi penjualan untuk akhir pekan?",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    type: "ai",
    message:
      "Prediksi penjualan akhir pekan menunjukkan tren positif berdasarkan pola historis:",
    timestamp: "10:35 AM",
    hasChart: true,
    chartType: "forecast",
    insights: [
      "Sabtu-Minggu diprediksi naik 25% dari weekdays",
      "Target penjualan: Rp 1.8M per hari",
      "Menu terlaris: Bakmie Special dan Bakmie Bakso",
      "Rekomendasi: Siapkan stok extra daging dan mie",
    ],
    actions: ["Download Forecast", "Set Alert Stok", "Share ke Tim"],
  },
];

const quickPrompts = [
  {
    icon: ChartBarIcon,
    text: "Analisis penjualan hari ini",
    category: "Penjualan",
    description: "Lihat performa penjualan dan tren menu terlaris",
    color: "blue",
  },
  {
    icon: ShieldCheckIcon,
    text: "Cek transaksi mencurigakan",
    category: "Keamanan",
    description: "Review alert fraud dan transaksi tidak normal",
    color: "red",
  },
  {
    icon: CurrencyDollarIcon,
    text: "Optimasi budget warung",
    category: "Keuangan",
    description: "Rekomendasi penghematan dan alokasi budget",
    color: "green",
  },
  {
    icon: ShoppingCartIcon,
    text: "Peluang menu baru",
    category: "Menu",
    description: "Identifikasi peluang menu dan variasi baru",
    color: "orange",
  },
  {
    icon: FireIcon,
    text: "Menu terlaris hari ini",
    category: "Trending",
    description: "Analisis menu yang paling diminati pelanggan",
    color: "red",
  },
  {
    icon: BellIcon,
    text: "Alert stok bahan",
    category: "Stok",
    description: "Monitoring stok bahan baku dan prediksi kebutuhan",
    color: "yellow",
  },
];

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatHistory, setCurrentChatHistory] =
    useState<ChatMessage[]>(chatHistory);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage: UserMessage = {
      id: Date.now(),
      type: "user",
      message: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setCurrentChatHistory((prev) => [...prev, newUserMessage]);
    setIsTyping(true);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: Date.now() + 1,
        type: "ai",
        message:
          "Saya sedang menganalisis data warung Anda dan akan memberikan insights yang relevan...",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        hasChart: Math.random() > 0.5,
        chartType: ["sales", "forecast", "menu"][
          Math.floor(Math.random() * 3)
        ] as "sales" | "forecast" | "menu",
        insights: [
          "Data menunjukkan tren positif dalam periode analisis",
          "Ditemukan beberapa pola menarik yang perlu diperhatikan",
          "Rekomendasi actionable tersedia untuk optimisasi warung",
        ],
        actions: ["Lihat Detail", "Export Report", "Set Alert"],
      };
      setCurrentChatHistory((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handlePromptClick = (prompt: any) => {
    setMessage(prompt.text);
    inputRef.current?.focus();
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
  };

  // Chart configurations
  const salesChartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 200,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#2D72D2"],
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.7, opacityTo: 0.1 },
    },
    stroke: { curve: "smooth", width: 2 },
    grid: { borderColor: "#404854" },
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
      theme: "dark",
      y: { formatter: (val: any) => `Rp ${val}k` },
    },
  };

  const forecastChartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 200,
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    colors: ["#0F9960", "#D9822B"],
    stroke: { curve: "smooth", width: 3, dashArray: [0, 5] },
    grid: { borderColor: "#404854" },
    xaxis: {
      categories: ["Hari Ini", "Besok", "Lusa", "Sabtu", "Minggu"],
      labels: { style: { colors: "#8F99A8" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#8F99A8" },
        formatter: (val: any) => `${val}k`,
      },
    },
    legend: { labels: { colors: "#8F99A8" } },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: any) => `Rp ${val}k` },
    },
  };

  const getColorClasses = (color: string) => {
    const colorMap: {
      [key: string]: { bg: string; text: string; border: string };
    } = {
      blue: {
        bg: "bg-blue-4/20",
        text: "text-blue-4",
        border: "border-blue-4/30",
      },
      red: { bg: "bg-red-4/20", text: "text-red-4", border: "border-red-4/30" },
      green: {
        bg: "bg-green-4/20",
        text: "text-green-4",
        border: "border-green-4/30",
      },
      orange: {
        bg: "bg-orange-4/20",
        text: "text-orange-4",
        border: "border-orange-4/30",
      },
      yellow: {
        bg: "bg-yellow-400/20",
        text: "text-yellow-400",
        border: "border-yellow-400/30",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="h-[calc(100vh-120px)] flex bg-transparent relative">
      {/* Add subtle overlay for better readability */}
      <div className="absolute inset-0 bg-palantir-dark-gray-1/20 backdrop-blur-sm"></div>

      {/* Sidebar */}
      <div className="w-80 dashboard-sidebar border-r border-palantir-dark-gray-4 flex flex-col relative z-10">
        {/* Header */}
        <div className="p-6 border-b border-palantir-dark-gray-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-4 to-blue-5 rounded-xl flex items-center justify-center">
              <CpuChipIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Assistant</h1>
              <p className="text-sm text-palantir-gray-3">
                Warung Bakmie Sederhana
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-palantir-dark-gray-3 rounded-lg">
            <div className="w-3 h-3 bg-green-4 rounded-full animate-pulse"></div>
            <span className="text-sm text-palantir-gray-3">
              Online & Siap Membantu
            </span>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-4">
            Pertanyaan Cepat
          </h3>
          <div className="space-y-3">
            {quickPrompts.map((prompt, index) => {
              const colors = getColorClasses(prompt.color);
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full text-left p-4 bg-palantir-dark-gray-3 rounded-lg hover:bg-palantir-dark-gray-4 transition-colors group border border-transparent hover:border-palantir-dark-gray-5"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <prompt.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-white text-sm">
                          {prompt.text}
                        </h4>
                        <span
                          className={`text-xs ${colors.text} ${colors.bg} px-2 py-1 rounded-full`}
                        >
                          {prompt.category}
                        </span>
                      </div>
                      <p className="text-xs text-palantir-gray-4 leading-relaxed">
                        {prompt.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Chat Header */}
        <div className="dashboard-card border-b border-palantir-dark-gray-4 px-6 py-4">
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
                      ? "AI sedang berpikir..."
                      : "Siap membantu analisis bisnis Anda"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-palantir-gray-4 hover:text-white transition-colors rounded-lg hover:bg-palantir-dark-gray-3">
                <BookmarkIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-palantir-gray-4 hover:text-white transition-colors rounded-lg hover:bg-palantir-dark-gray-3">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-palantir-gray-4 hover:text-white transition-colors rounded-lg hover:bg-palantir-dark-gray-3">
                <ArrowDownTrayIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {currentChatHistory.map((chat) => (
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
                    {/* Avatar */}
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

                    {/* Message Content */}
                    <div
                      className={`flex-1 ${
                        chat.type === "user" ? "text-right" : ""
                      }`}
                    >
                      {/* Message Bubble */}
                      <div
                        className={`inline-block max-w-full ${
                          chat.type === "user"
                            ? "bg-blue-4 text-white rounded-2xl rounded-tr-md px-4 py-3"
                            : "bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 text-white rounded-2xl rounded-tl-md px-4 py-3"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {chat.message}
                        </p>
                      </div>

                      {/* AI Insights */}
                      {chat.type === "ai" && chat.insights && (
                        <div className="mt-4 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-xl p-4">
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

                      {/* Charts */}
                      {chat.type === "ai" && chat.hasChart && (
                        <div className="mt-4 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white flex items-center space-x-2">
                              <ChartBarIcon className="w-4 h-4 text-blue-4" />
                              <span>Data Visualization</span>
                            </h4>
                            <button className="text-blue-4 hover:text-blue-5 text-sm transition-colors">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          </div>
                          {chat.chartType === "sales" && (
                            <Chart
                              options={salesChartOptions}
                              series={[
                                {
                                  name: "Penjualan Harian",
                                  data: [850, 920, 780, 1100, 1250, 1400, 950],
                                },
                              ]}
                              type="area"
                              height={200}
                            />
                          )}
                          {chat.chartType === "forecast" && (
                            <Chart
                              options={forecastChartOptions}
                              series={[
                                {
                                  name: "Aktual",
                                  data: [1250, null, null, null, null],
                                },
                                {
                                  name: "Prediksi",
                                  data: [null, 1350, 1400, 1750, 1650],
                                },
                              ]}
                              type="line"
                              height={200}
                            />
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      {chat.type === "ai" && chat.actions && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {chat.actions.map((action, idx) => (
                            <button
                              key={idx}
                              className="px-3 py-2 bg-palantir-dark-gray-4 text-palantir-gray-3 rounded-lg text-sm hover:bg-palantir-dark-gray-5 hover:text-white transition-colors"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
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

            {/* Typing Indicator */}
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
                  <div className="bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-2xl rounded-tl-md px-4 py-3">
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

        {/* Input Area */}
        <div className="border-t border-palantir-dark-gray-4 p-6 bg-palantir-dark-gray-2">
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
                  placeholder="Tanya tentang penjualan, stok, menu, atau analisis bisnis warung..."
                  className="w-full px-4 py-3 pr-24 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-xl text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors resize-none"
                  rows={1}
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening
                        ? "bg-red-4 text-white"
                        : "text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-4"
                    }`}
                  >
                    <MicrophoneIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-4 rounded-lg transition-colors">
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

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            {quickPrompts.slice(0, 3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="px-3 py-2 bg-palantir-dark-gray-3 text-palantir-gray-3 rounded-lg text-sm hover:bg-palantir-dark-gray-4 hover:text-white transition-colors border border-palantir-dark-gray-4"
              >
                {prompt.text}
              </button>
            ))}
          </div>

          <div className="mt-3 text-xs text-palantir-gray-4 text-center">
            AI responses berdasarkan data bisnis warung Anda. Selalu verifikasi
            keputusan penting.
          </div>
        </div>
      </div>
    </div>
  );
}
