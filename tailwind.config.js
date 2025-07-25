// tailwind.config.js - Customized untuk Palantir theme
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  safelist: [
    // Kelas untuk ikon fitur
    "from-red-3",
    "to-red-4",
    "from-blue-3",
    "to-blue-4",
    "from-green-3",
    "to-green-4",
    // Pastikan juga teks warnanya terdaftar jika ada class dinamis serupa
    // 'text-red-4', 'text-blue-4', 'text-green-4', // Sudah ada di kode sebagai static, tapi jaga-jaga
  ],
  theme: {
    extend: {
      colors: {
        // Palantir Blueprint Colors
        palantir: {
          black: "#111418",
          "dark-gray-1": "#1C2127",
          "dark-gray-2": "#252A31",
          "dark-gray-3": "#2F343C",
          "dark-gray-4": "#383E47",
          "dark-gray-5": "#404854",
          "gray-1": "#5F6B7C",
          "gray-2": "#738091",
          "gray-3": "#8F99A8",
          "gray-4": "#ABB3BF",
          "gray-5": "#C5CBD3",
          "light-gray-1": "#CED9E0",
          "light-gray-2": "#D8E1E8",
          "light-gray-3": "#E1E8ED",
          "light-gray-4": "#EBF1F5",
          "light-gray-5": "#F5F8FA",
          white: "#FFFFFF",
        },
        blue: {
          1: "#184A90",
          2: "#215DB0",
          3: "#2D72D2",
          4: "#4C90F0",
          5: "#8ABBFF",
        },
        green: {
          1: "#0A6640",
          2: "#0D8050",
          3: "#0F9960",
          4: "#15B371",
          5: "#3DCC91",
        },
        orange: {
          1: "#A66321",
          2: "#BF7326",
          3: "#D9822B",
          4: "#F29D49",
          5: "#FFB366",
        },
        red: {
          1: "#A82A2A",
          2: "#C23030",
          3: "#DB3737",
          4: "#F55656",
          5: "#FF7373",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 15s ease infinite",
        grid: "grid 15s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        scan: "scan 2s linear infinite",
        fadeInUp: "fadeInUp 0.8s ease-out",
        slideInRight: "slideInRight 0.6s ease-out",
        bounceIn: "bounceIn 0.8s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        grid: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(20px)" },
        },
        glow: {
          from: { "box-shadow": "0 0 20px #4C90F0" },
          to: { "box-shadow": "0 0 30px #4C90F0, 0 0 40px #4C90F0" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        bounceIn: {
          from: { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(79, 172, 254, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 172, 254, 0.1) 1px, transparent 1px)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
