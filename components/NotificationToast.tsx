// components/NotificationToast.tsx - Toast notification component
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface NotificationToastProps {
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export default function NotificationToast({
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
    error: ExclamationTriangleIcon,
  };

  const colors = {
    success: "green",
    warning: "orange",
    info: "blue",
    error: "red",
  };

  const Icon = icons[type];
  const color = colors[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-4 right-4 z-50 dashboard-card p-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-start space-x-3">
            <div
              className={`w-8 h-8 bg-${color}-4/20 rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`w-5 h-5 text-${color}-4`} />
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-white text-sm">{title}</h4>
              <p className="text-palantir-gray-3 text-xs mt-1">{message}</p>
            </div>

            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="text-palantir-gray-4 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
