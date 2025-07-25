// app/subscribe/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  XMarkIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const plans = [
  {
    id: "fraud-detection",
    name: "Fraud Detection",
    price: 2500000,
    priceText: "Rp 2.500.000",
    period: "/bulan",
    description: "Real-time transaction monitoring dengan AI detection",
    features: [
      "Real-time transaction monitoring",
      "AI-powered anomaly detection",
      "Risk scoring algorithms",
      "Automated alert system",
      "Compliance reporting",
      "API integrations",
      "Custom rule engine",
      "AI Chatbot support",
    ],
    icon: ShieldCheckIcon,
    color: "red",
  },
  {
    id: "sales-forecasting",
    name: "Sales Forecasting",
    price: 3200000,
    priceText: "Rp 3.200.000",
    period: "/bulan",
    description: "Advanced analytics untuk prediksi penjualan akurat",
    features: [
      "Advanced predictive analytics",
      "Market trend analysis",
      "Revenue optimization",
      "Seasonal forecasting",
      "Customer behavior insights",
      "Performance dashboards",
      "Export capabilities",
      "AI Chatbot support",
    ],
    icon: ChartBarIcon,
    color: "blue",
  },
  {
    id: "auto-budgeting",
    name: "AutoBudgeting",
    price: 2800000,
    priceText: "Rp 2.800.000",
    period: "/bulan",
    description: "Otomatisasi budgeting dengan smart recommendations",
    features: [
      "Smart budget allocation",
      "Cost optimization algorithms",
      "Spending pattern analysis",
      "Budget variance tracking",
      "Automated recommendations",
      "Financial planning tools",
      "Multi-currency support",
      "AI Chatbot support",
    ],
    icon: CurrencyDollarIcon,
    color: "green",
  },
  {
    id: "end-to-end",
    name: "End-to-End Solution",
    price: 7500000,
    priceText: "Rp 7.500.000",
    period: "/bulan",
    description: "Complete business intelligence platform",
    features: [
      "All Fraud Detection features",
      "All Sales Forecasting features",
      "All AutoBudgeting features",
      "Advanced AI Chatbot",
      "Priority customer support",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced analytics suite",
      "Multi-tenant architecture",
      "Custom reporting",
      "API rate limit increase",
      "99.9% SLA guarantee",
    ],
    icon: SparklesIcon,
    color: "blue",
    popular: true,
    savings: "25% OFF",
  },
];

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCardIcon },
  { id: "bank", name: "Bank Transfer", icon: null },
  { id: "ewallet", name: "E-Wallet", icon: null },
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl) {
      setSelectedPlan(planFromUrl);
    } else {
      setSelectedPlan("end-to-end");
    }
  }, [searchParams]);

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);
  const monthlyPrice = selectedPlanData?.price || 0;
  const yearlyPrice = monthlyPrice * 12 * 0.85;

  const handleSubscribe = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-1/10 via-transparent to-green-1/10" />

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

      <div className="relative z-40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Choose Your</span>
              <br />
              <span className="text-white">AI Solution</span>
            </h1>
            <p className="text-xl text-palantir-gray-3 max-w-3xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda dan mulai
              transformasi digital hari ini
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="glass p-2 rounded-xl">
              <div className="flex space-x-1">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-blue-4 text-white"
                      : "text-palantir-gray-4 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
                    billingCycle === "yearly"
                      ? "bg-blue-4 text-white"
                      : "text-palantir-gray-4 hover:text-white"
                  }`}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-green-4 text-white text-xs px-2 py-1 rounded-full">
                    15% OFF
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`dashboard-card p-8 rounded-2xl relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-blue-4 transform scale-105"
                    : "hover:transform hover:scale-102"
                } ${plan.popular ? "ring-2 ring-green-4/50" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-green-4 text-white px-4 py-2 text-sm font-medium rounded-bl-lg">
                    Most Popular
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute top-0 left-0 bg-orange-4 text-white px-4 py-2 text-sm font-medium rounded-br-lg">
                    {plan.savings}
                  </div>
                )}

                <div
                  className={`w-16 h-16 bg-gradient-to-br from-${plan.color}-3 to-${plan.color}-4 rounded-xl flex items-center justify-center mb-6`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-palantir-gray-3 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">
                      {billingCycle === "monthly"
                        ? plan.priceText
                        : `Rp ${Math.round(
                            plan.price * 12 * 0.85
                          ).toLocaleString("id-ID")}`}
                    </span>
                    <span className="text-palantir-gray-4 ml-1">
                      /{billingCycle === "monthly" ? "bulan" : "tahun"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-green-4 mt-1">
                      Save Rp{" "}
                      {Math.round(plan.price * 12 * 0.15).toLocaleString(
                        "id-ID"
                      )}{" "}
                      per year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-green-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-palantir-gray-3">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`w-6 h-6 rounded-full border-2 mx-auto ${
                    selectedPlan === plan.id
                      ? "border-blue-4 bg-blue-4"
                      : "border-palantir-gray-4"
                  } flex items-center justify-center`}
                >
                  {selectedPlan === plan.id && (
                    <CheckIcon className="w-4 h-4 text-white" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {selectedPlanData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="dashboard-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Order Summary
                </h3>

                <div className="flex items-center justify-between py-4 border-b border-palantir-dark-gray-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br from-${selectedPlanData.color}-3 to-${selectedPlanData.color}-4 rounded-lg flex items-center justify-center`}
                    >
                      <selectedPlanData.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">
                        {selectedPlanData.name}
                      </h4>
                      <p className="text-sm text-palantir-gray-3">
                        {billingCycle === "monthly" ? "Monthly" : "Yearly"}{" "}
                        subscription
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      {billingCycle === "monthly"
                        ? selectedPlanData.priceText
                        : `Rp ${Math.round(
                            selectedPlanData.price * 12 * 0.85
                          ).toLocaleString("id-ID")}`}
                    </p>
                    <p className="text-sm text-palantir-gray-4">
                      /{billingCycle === "monthly" ? "bulan" : "tahun"}
                    </p>
                  </div>
                </div>

                {billingCycle === "yearly" && (
                  <div className="flex items-center justify-between py-4 border-b border-palantir-dark-gray-4">
                    <span className="text-green-4 font-medium">
                      Yearly Discount (15%)
                    </span>
                    <span className="text-green-4 font-bold">
                      -Rp{" "}
                      {Math.round(
                        selectedPlanData.price * 12 * 0.15
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between py-6">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-white">
                    {billingCycle === "monthly"
                      ? selectedPlanData.priceText
                      : `Rp ${Math.round(
                          selectedPlanData.price * 12 * 0.85
                        ).toLocaleString("id-ID")}`}
                  </span>
                </div>

                <motion.button
                  onClick={handleSubscribe}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 rounded-xl font-semibold text-lg"
                >
                  Subscribe Now
                </motion.button>

                <div className="mt-6 p-4 bg-palantir-dark-gray-2 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="w-5 h-5 text-green-4" />
                    <div>
                      <p className="text-sm text-white font-medium">
                        30-Day Money Back Guarantee
                      </p>
                      <p className="text-xs text-palantir-gray-4">
                        Cancel anytime within 30 days for a full refund
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="dashboard-card p-8 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Payment Details</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-palantir-gray-4 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-4">Payment Method</h4>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? "border-blue-4 bg-blue-4/10"
                        : "border-palantir-dark-gray-4 hover:border-palantir-gray-4"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedPayment === method.id
                            ? "border-blue-4 bg-blue-4"
                            : "border-palantir-gray-4"
                        } flex items-center justify-center`}
                      >
                        {selectedPayment === method.id && (
                          <CheckIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      {method.icon && (
                        <method.icon className="w-5 h-5 text-palantir-gray-3" />
                      )}
                      <span className="text-white font-medium">
                        {method.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedPayment === "card" && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="bg-palantir-dark-gray-2 rounded-lg p-4 mb-6">
              <h5 className="font-medium text-white mb-3">Order Summary</h5>
              <div className="flex justify-between mb-2">
                <span className="text-palantir-gray-3">
                  {selectedPlanData?.name}
                </span>
                <span className="text-white">
                  {billingCycle === "monthly"
                    ? selectedPlanData?.priceText
                    : `Rp ${Math.round(
                        (selectedPlanData?.price || 0) * 12 * 0.85
                      ).toLocaleString("id-ID")}`}
                </span>
              </div>
              {billingCycle === "yearly" && (
                <div className="flex justify-between mb-2">
                  <span className="text-green-4">Yearly Discount</span>
                  <span className="text-green-4">
                    -Rp{" "}
                    {Math.round(
                      (selectedPlanData?.price || 0) * 12 * 0.15
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              )}
              <div className="border-t border-palantir-dark-gray-4 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">
                    {billingCycle === "monthly"
                      ? selectedPlanData?.priceText
                      : `Rp ${Math.round(
                          (selectedPlanData?.price || 0) * 12 * 0.85
                        ).toLocaleString("id-ID")}`}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handlePayment}
              disabled={isProcessing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Pay ${
                  billingCycle === "monthly"
                    ? selectedPlanData?.priceText
                    : `Rp ${Math.round(
                        (selectedPlanData?.price || 0) * 12 * 0.85
                      ).toLocaleString("id-ID")}`
                }`
              )}
            </motion.button>

            <div className="mt-4 text-center">
              <p className="text-xs text-palantir-gray-4">
                By completing this purchase, you agree to our Terms of Service
                and Privacy Policy. Your subscription will auto-renew until
                cancelled.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
