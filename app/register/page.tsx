"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  EyeIcon,
  EyeSlashIcon,
  CpuChipIcon,
  ArrowRightIcon,
  CheckIcon,
  ShieldCheckIcon,
  UserIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const plans = [
  {
    id: "fraud-detection",
    name: "Fraud Detection",
    price: "Rp 2.500.000",
    features: [
      "Real-time monitoring",
      "AI anomaly detection",
      "Risk scoring",
      "Alert system",
    ],
  },
  {
    id: "sales-forecasting",
    name: "Sales Forecasting",
    price: "Rp 3.200.000",
    features: [
      "Advanced analytics",
      "Trend prediction",
      "Market insights",
      "Revenue optimization",
    ],
  },
  {
    id: "auto-budgeting",
    name: "AutoBudgeting",
    price: "Rp 2.800.000",
    features: [
      "Smart allocation",
      "Cost optimization",
      "Budget tracking",
      "Performance metrics",
    ],
  },
  {
    id: "end-to-end",
    name: "End-to-End",
    price: "Rp 7.500.000",
    features: [
      "All features included",
      "Priority support",
      "Custom integrations",
      "Advanced AI chatbot",
    ],
    popular: true,
  },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("end-to-end");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        router.push("/dashboard");
      }, 2000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Account Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                  placeholder="Your Company Ltd."
                  required
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Choose Your Plan
            </h2>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? "border-blue-4 bg-blue-4/10"
                      : "border-palantir-dark-gray-4 hover:border-palantir-gray-4"
                  } ${plan.popular ? "ring-2 ring-green-4/50" : ""}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedPlan === plan.id
                            ? "border-blue-4 bg-blue-4"
                            : "border-palantir-gray-4"
                        } flex items-center justify-center`}
                      >
                        {selectedPlan === plan.id && (
                          <CheckIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <h3 className="font-bold text-white">{plan.name}</h3>
                      {plan.popular && (
                        <span className="bg-green-4 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-bold text-white">
                      {plan.price}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckIcon className="w-4 h-4 text-green-4" />
                        <span className="text-sm text-palantir-gray-3">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Security Setup
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors pr-12"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-palantir-gray-4 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white placeholder-palantir-gray-4 focus:border-blue-4 focus:ring-1 focus:ring-blue-4 transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="bg-palantir-dark-gray-2 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-3">
                  Password Requirements:
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      text: "At least 8 characters",
                      met: formData.password.length >= 8,
                    },
                    {
                      text: "Contains uppercase letter",
                      met: /[A-Z]/.test(formData.password),
                    },
                    {
                      text: "Contains lowercase letter",
                      met: /[a-z]/.test(formData.password),
                    },
                    {
                      text: "Contains number",
                      met: /\d/.test(formData.password),
                    },
                  ].map((req, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckIcon
                        className={`w-4 h-4 ${
                          req.met ? "text-green-4" : "text-palantir-gray-4"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          req.met ? "text-green-4" : "text-palantir-gray-4"
                        }`}
                      >
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-palantir-dark-gray-4 bg-palantir-dark-gray-3 text-blue-4 focus:ring-blue-4"
                  required
                />
                <p className="text-sm text-palantir-gray-4">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-4 hover:text-blue-5 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-4 hover:text-blue-5 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      <div className="absolute inset-0 animated-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-1/10 via-transparent to-green-1/10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <div className="dashboard-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-4 to-blue-5 rounded-2xl mb-4"
            >
              <CpuChipIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Join PointerAI
            </h1>
            <p className="text-palantir-gray-3">
              Create your account and start transforming your business
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      currentStep >= step
                        ? "bg-blue-4 text-white"
                        : "bg-palantir-dark-gray-4 text-palantir-gray-4"
                    }`}
                  >
                    {currentStep > step ? (
                      <CheckIcon className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-20 h-1 mx-2 ${
                        currentStep > step
                          ? "bg-blue-4"
                          : "bg-palantir-dark-gray-4"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span
                className={
                  currentStep >= 1 ? "text-blue-4" : "text-palantir-gray-4"
                }
              >
                Account Info
              </span>
              <span
                className={
                  currentStep >= 2 ? "text-blue-4" : "text-palantir-gray-4"
                }
              >
                Choose Plan
              </span>
              <span
                className={
                  currentStep >= 3 ? "text-blue-4" : "text-palantir-gray-4"
                }
              >
                Security
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary px-6 py-3 rounded-lg font-medium"
                >
                  Previous
                </motion.button>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-primary px-6 py-3 rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentStep === 1 ? "ml-auto" : ""
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {currentStep === 3 ? "Create Account" : "Continue"}
                    </span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {currentStep === 3 && (
            <div className="mt-6 p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4">
              <div className="flex items-start space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-green-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-palantir-gray-4">
                    <span className="text-green-4 font-medium">
                      Enterprise Security:
                    </span>{" "}
                    Your data is protected with military-grade encryption and
                    stored in SOC 2 Type II compliant infrastructure.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-palantir-gray-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-4 hover:text-blue-5 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-palantir-gray-4 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
