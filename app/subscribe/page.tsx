"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheckIcon,
  ChartBarIcon,
  SparklesIcon,
  CheckIcon,
  CpuChipIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const plans = [
  {
    id: "fraud-detection",
    name: "Fraud Detection",
    description: "Real-time transaction monitoring dengan AI detection",
    icon: ShieldCheckIcon,
    monthlyPrice: 99000,
    yearlyPrice: 1100000,
    color: "red",
    features: [
      "Real-time monitoring",
      "AI anomaly detection",
      "Risk scoring algorithms",
      "Automated alerts",
      "Compliance reporting",
    ],
  },
  {
    id: "sales-forecasting",
    name: "Sales Forecasting",
    description: "Advanced analytics untuk prediksi penjualan akurat",
    icon: ChartBarIcon,
    monthlyPrice: 149000,
    yearlyPrice: 1700000,
    color: "blue",
    popular: true,
    features: [
      "Advanced predictive analytics",
      "Market trend analysis",
      "Revenue optimization",
      "Seasonal forecasting",
      "Performance dashboards",
    ],
  },
  {
    id: "end-to-end",
    name: "End-to-End Solution",
    description: "Complete business intelligence platform",
    icon: SparklesIcon,
    monthlyPrice: 249000,
    yearlyPrice: 2900000,
    color: "green",
    badge: "Best Value",
    features: [
      "All Fraud Detection features",
      "All Sales Forecasting features",
      "Advanced AI Chatbot",
      "Priority support",
      "Custom integrations",
    ],
  },
];

export default function SubscribePage() {
  const [isYearly, setIsYearly] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-palantir-dark-gray-1">
      <div className="fixed inset-0 animated-grid opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-1/5 via-transparent to-green-1/5" />

      <nav className="relative z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-4 to-blue-5 rounded-lg flex items-center justify-center">
                <CpuChipIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                PointerAI
              </span>
            </Link>
            <div className="flex items-center space-x-6">
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
            </div>
          </div>
        </div>
      </nav>

      <section className="relative z-40 pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Choose Your</span>
              <br />
              <span className="text-white">AI Solution</span>
            </h1>
            <p className="text-lg text-palantir-gray-3 mb-8 max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda dan mulai
              transformasi digital hari ini
            </p>

            <div className="flex items-center justify-center space-x-4 mb-12">
              <span
                className={`text-sm font-medium ${
                  !isYearly ? "text-white" : "text-palantir-gray-4"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? "bg-blue-4" : "bg-palantir-dark-gray-3"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-medium ${
                    isYearly ? "text-white" : "text-palantir-gray-4"
                  }`}
                >
                  Yearly
                </span>
                {isYearly && (
                  <span className="bg-green-3 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Save 15%
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative dashboard-card rounded-2xl p-8 ${
                  plan.popular ? "ring-2 ring-blue-4 scale-105" : ""
                } hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-4 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {plan.badge && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-green-3 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${
                    plan.color === "red"
                      ? "from-red-3 to-red-4"
                      : plan.color === "blue"
                      ? "from-blue-3 to-blue-4"
                      : "from-green-3 to-green-4"
                  } rounded-xl flex items-center justify-center mb-6`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-palantir-gray-3 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-white">
                      {formatPrice(
                        isYearly ? plan.yearlyPrice : plan.monthlyPrice
                      )}
                    </span>
                    <span className="text-palantir-gray-4 text-sm">
                      /{isYearly ? "tahun" : "bulan"}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-green-4 text-sm mt-1">
                      Hemat{" "}
                      {formatPrice(plan.monthlyPrice * 12 - plan.yearlyPrice)}{" "}
                      per tahun
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckIcon className="w-5 h-5 text-green-4 flex-shrink-0 mt-0.5" />
                        <span className="text-palantir-gray-3 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/checkout?plan=${plan.id}&billing=${
                    isYearly ? "yearly" : "monthly"
                  }`}
                  className={`w-full btn-primary py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-2 group ${
                    plan.popular ? "bg-gradient-to-r from-blue-4 to-blue-5" : ""
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-40 py-20 border-t border-palantir-dark-gray-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="dashboard-card p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-palantir-gray-3 mb-6">
              Tim ahli kami siap membantu Anda memilih solusi yang tepat untuk
              bisnis Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-secondary px-8 py-3 rounded-xl font-semibold"
              >
                Talk to Sales
              </Link>
              <Link
                href="/demo"
                className="btn-primary px-8 py-3 rounded-xl font-semibold"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-40 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Apakah ada free trial?",
                a: "Ya, semua paket menyediakan free trial 14 hari tanpa perlu kartu kredit.",
              },
              {
                q: "Bisakah upgrade atau downgrade paket?",
                a: "Tentu saja! Anda bisa mengubah paket kapan saja melalui dashboard account.",
              },
              {
                q: "Apakah data saya aman?",
                a: "Keamanan data adalah prioritas utama. Kami menggunakan enkripsi tingkat enterprise dan compliance SOC 2.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="dashboard-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-palantir-gray-3">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-40 border-t border-palantir-dark-gray-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-palantir-gray-4 text-sm">
              © 2025 PointerAI. All rights reserved. Questions? Contact us at
              support@pointerai.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
