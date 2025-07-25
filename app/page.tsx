"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheckIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  SparklesIcon,
  EyeIcon,
  CpuChipIcon,
  LightBulbIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import "./globals.css";

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Fraud Detection",
    description:
      "Real-time transaction monitoring dengan AI yang mendeteksi pola mencurigakan secara otomatis",
    price: "Rp 2.500.000",
    period: "/bulan",
    color: "red",
  },
  {
    icon: ChartBarIcon,
    title: "Sales Forecasting",
    description:
      "Prediksi penjualan akurat dengan insights mendalam dan analisis tren comprehensive",
    price: "Rp 3.200.000",
    period: "/bulan",
    color: "blue",
  },
  {
    icon: CurrencyDollarIcon,
    title: "AutoBudgeting",
    description:
      "Otomatisasi budgeting dengan rekomendasi cerdas dan optimisasi alokasi anggaran",
    price: "Rp 2.800.000",
    period: "/bulan",
    color: "green",
  },
];

const stats = [
  { value: "99.8%", label: "Akurasi Deteksi Fraud" },
  { value: "94.5%", label: "Akurasi Prediksi Sales" },
  { value: "87%", label: "Efisiensi Budget" },
  { value: "2.5x", label: "ROI Improvement" },
];

export default function LandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [particlePositions, setParticlePositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMounted(true);

    // Logika yang sudah ada bisa digabung
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-1/10 via-transparent to-green-1/10" />

      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-4 rounded-full opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <nav className="relative z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
                <CpuChipIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                PointerAI
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-6"
            >
              <Link
                href="/login"
                className="text-palantir-gray-4 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-primary px-6 py-2 rounded-lg font-medium"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      <section className="relative z-40 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="gradient-text">Business Intelligence</span>
              <br />
              <span className="text-white">Redefined by AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-palantir-gray-3 mb-12 max-w-4xl mx-auto leading-relaxed">
              Platform AI terdepan untuk deteksi fraud real-time, forecasting
              penjualan akurat, dan budgeting otomatis yang mengubah cara
              perusahaan mengelola data bisnis
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/register"
                className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 group"
              >
                <span>Mulai Sekarang</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#demo"
                className="btn-secondary px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2"
              >
                <EyeIcon className="w-5 h-5" />
                <span>Lihat Demo</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass p-6 rounded-xl"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-palantir-gray-4 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative z-40 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Three Powerful</span>
              <br />
              <span className="text-white">AI Solutions</span>
            </h2>
            <p className="text-xl text-palantir-gray-3 max-w-3xl mx-auto">
              Setiap fitur dirancang khusus untuk memberikan insights yang
              actionable dan otomatisasi yang intelligent
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group"
              >
                <div className="dashboard-card p-8 rounded-2xl card-hover h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-3 to-${feature.color}-4 rounded-xl flex items-center justify-center mb-6 feature-icon`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-palantir-gray-3 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-3xl font-bold text-white">
                        {feature.price}
                      </span>
                      <span className="text-palantir-gray-4">
                        {feature.period}
                      </span>
                    </div>
                    <Link
                      href={`/subscribe?plan=${feature.title
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className={`btn-primary px-6 py-3 rounded-lg font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}
                    >
                      Pilih Plan
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <div className="dashboard-card p-12 rounded-2xl border-2 border-blue-4/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-4/5 to-green-3/5" />
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-4 to-green-3 rounded-2xl flex items-center justify-center">
                    <SparklesIcon className="w-10 h-10 text-white" />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    End-to-End Solution
                  </h3>
                  <p className="text-xl text-palantir-gray-3 mb-8 max-w-3xl mx-auto">
                    Dapatkan semua fitur dalam satu platform comprehensive
                    dengan AI Chatbot advanced dan integrasi seamless antar
                    modul
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                      "Fraud Detection",
                      "Sales Forecasting",
                      "AutoBudgeting",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center space-x-2"
                      >
                        <CheckIcon className="w-5 h-5 text-green-4" />
                        <span className="text-white font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center space-x-4 mb-8">
                    <span className="text-4xl font-bold text-white">
                      Rp 7.500.000
                    </span>
                    <span className="text-palantir-gray-4 text-lg">/bulan</span>
                    <div className="bg-green-3 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Save 25%
                    </div>
                  </div>

                  <Link
                    href="/subscribe?plan=end-to-end"
                    className="btn-primary px-10 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2"
                  >
                    <span>Get Complete Solution</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-40 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">AI Chatbot</span>
              <br />
              <span className="gradient-text">Revolutionary</span>
            </h2>
            <p className="text-xl text-palantir-gray-3 max-w-3xl mx-auto">
              Chatbot AI yang tidak seperti yang lain - dirancang khusus untuk
              business intelligence dengan kemampuan analisis mendalam
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-4 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LightBulbIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Contextual Analysis
                    </h3>
                    <p className="text-palantir-gray-3">
                      Memahami konteks bisnis Anda dan memberikan insights yang
                      relevan berdasarkan data real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-3 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Interactive Visualizations
                    </h3>
                    <p className="text-palantir-gray-3">
                      Buat dan modifikasi chart secara real-time melalui
                      percakapan natural
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-3 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CpuChipIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Predictive Recommendations
                    </h3>
                    <p className="text-palantir-gray-3">
                      Rekomendasi actionable berdasarkan pattern recognition dan
                      machine learning
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="dashboard-card p-6 rounded-2xl"
            >
              <div className="bg-palantir-dark-gray-3 rounded-xl p-4 h-96 overflow-hidden">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-4 rounded-full"></div>
                  <div className="w-3 h-3 bg-orange-4 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-4 rounded-full"></div>
                  <span className="text-sm text-palantir-gray-4 ml-4">
                    PointerAI Assistant
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-4 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CpuChipIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-palantir-dark-gray-2 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-white">
                        Halo! Saya melihat ada anomali dalam transaksi hari ini.
                        Apakah Anda ingin saya analisis lebih detail?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-blue-4 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-white">
                        Ya, tolong tampilkan breakdown transaksi mencurigakan
                        dalam 24 jam terakhir
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-palantir-gray-3 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">You</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-4 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CpuChipIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-palantir-dark-gray-2 rounded-lg p-3 flex-1">
                      <p className="text-sm text-white mb-2">
                        Ditemukan 12 transaksi mencurigakan dengan total Rp
                        847.500.000
                      </p>
                      <div className="bg-palantir-dark-gray-4 rounded p-2 text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="text-palantir-gray-4">
                            Risk Level: High
                          </span>
                          <span className="text-red-4 font-bold">●</span>
                        </div>
                        <div className="w-full bg-palantir-dark-gray-5 rounded-full h-2">
                          <div className="bg-red-4 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-40 py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="dashboard-card p-12 rounded-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-palantir-gray-3 mb-8">
              Bergabung dengan 500+ perusahaan yang telah meningkatkan efisiensi
              bisnis mereka dengan PointerAI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="btn-primary px-10 py-4 rounded-xl font-semibold text-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="btn-secondary px-10 py-4 rounded-xl font-semibold text-lg"
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-40 border-t border-palantir-dark-gray-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
                  <CpuChipIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">PointerAI</span>
              </div>
              <p className="text-palantir-gray-4 text-sm">
                Transforming business intelligence with cutting-edge AI
                technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-palantir-gray-4">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Fraud Detection
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sales Forecasting
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    AutoBudgeting
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    AI Chatbot
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-palantir-gray-4">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-palantir-gray-4">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-palantir-dark-gray-3 mt-8 pt-8 text-center">
            <p className="text-palantir-gray-4 text-sm">
              © 2025 PointerAI. All rights reserved. Built with ❤️ for the
              future of business intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
