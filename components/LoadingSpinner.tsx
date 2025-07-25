// components/LoadingSpinner.tsx - Reusable loading component
"use client";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  text?: string;
}

export default function LoadingSpinner({
  size = "md",
  color = "blue-4",
  text = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} border-2 border-${color}/20 border-t-${color} rounded-full`}
      />
      {text && (
        <span
          className={`text-palantir-gray-3 ${
            size === "sm" ? "text-sm" : "text-base"
          }`}
        >
          {text}
        </span>
      )}
    </div>
  );
}
