/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "node_modules/preline/dist/*.js"
  ],
  prefix: "",
  theme: {
    screens: {
      'mobile': {'max': '1023px'},
     sm: "640px", 
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        whitesmoke: {
          100: "#f8f9fa",
          200: "#eee",
        },
        "base-color-white": "#fff",
        "gray-500": "#8b96a5",
        dark: "#1c1c1c",
        gray1: "#151515",
        "base-color-gray-800": "#606060",
        "gray-200": "#eff2f4",
        "gray-300": "#dee2e7",
        "gray-600": "#505050",
        "base-color-gray-200": "#e0e0e0",
        gainsboro: {
          100: "#e0e7e9",
          200: "#dbdbdb",
          300: "#d9d9d9",
        },
        f9a31b: "#f9a31b",
        orange: "#ff9017",
        cornflowerblue: "#008ede",
        "base-color-green": "#00b517",
        "base-color-gray-500": "#787a80",
        "base-color-gray-300": "#bdc1c8",
        tomato: "#fa3434",
        cadetblue: "rgba(76, 167, 167, 0.6)",
        paleturquoise: "#c6f3f1",
      },
      fontFamily: {
        "text-normal": "Inter",
        "title-h5": "Inter",
      },
      fontSize: {
        base: "16px",
        xs: "12px",
        "5xl": "24px",
        xl: "20px",
        smi: "13px",
        lg: "18px",
        inherit: "inherit",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    corePlugins: {
      preflight: false,
    },
  },
  plugins: [require("tailwindcss-animate"),require('preline/plugin')],
};
