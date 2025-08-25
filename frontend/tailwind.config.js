/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Black and White Theme Colors
        mono: {
          black: "#000000",
          white: "#FFFFFF",
          gray: {
            100: "rgba(255, 255, 255, 0.1)",
            200: "rgba(255, 255, 255, 0.2)",
            300: "rgba(255, 255, 255, 0.3)",
            400: "rgba(255, 255, 255, 0.4)",
            500: "rgba(255, 255, 255, 0.5)",
            600: "rgba(255, 255, 255, 0.6)",
            700: "rgba(255, 255, 255, 0.7)",
            800: "rgba(255, 255, 255, 0.8)",
            900: "rgba(255, 255, 255, 0.9)",
          },
        },
        // Legacy colors for compatibility
        dark: {
          900: "#000000",
          800: "#0A0A0A",
          700: "#121212",
          600: "#1A1A1A",
          500: "#232323",
          400: "#2C2C2C",
        },
        accent: {
          blue: "#1E40AF",
          purple: "#7E22CE",
          pink: "#BE185D",
          teal: "#0D9488",
          green: "#15803D",
        },
        neon: {
          blue: "#60A5FA",
          purple: "#A78BFA",
          pink: "#F472B6",
          teal: "#2DD4BF",
          green: "#4ADE80",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Source Code Pro", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 4s linear infinite",
        float: "float 6s ease-in-out infinite",
        wave: "wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-up": "slideInUp 0.5s ease-out",
        "slide-in-down": "slideInDown 0.5s ease-out",
        "zoom-in": "zoomIn 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(10px) translateY(-10px)" },
          "50%": { transform: "translateX(0) translateY(0)" },
          "75%": { transform: "translateX(-10px) translateY(10px)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideInUp: {
          "0%": { transform: "translateY(30px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideInDown: {
          "0%": { transform: "translateY(-30px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        zoomIn: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(122, 16, 234, 0.6)" },
          "100%": {
            boxShadow:
              "0 0 20px rgba(122, 16, 234, 0.8), 0 0 30px rgba(245, 20, 180, 0.5)",
          },
        },
      },
      backgroundImage: {
        noise: "url('/noise.png')",
        grid: "url('/grid.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
