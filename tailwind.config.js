/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}"
  ],
  theme: {
    extend: {
      screens: {
        mid: "853px",
        "lg-mid": "1224px"
      },
      colors: {
        primary: "#FFD563",
        "primary-var1": "#F5AE15",
        "primary-var2": "#FFD258",
        "primary-var3": "#FFFAE1",
        secondary: "#8CD9C4",
        "secondary-var1": "#41AB90",
        "secondary-var2": "#6ECDB3",
        "secondary-var3": "#ECFBF7",
        "gray-01": "#323232",
        "gray-02": "#5B5B5B",
        "gray-03": "#9E9E9E",
        "gray-04": "#CCCCCC",
        "gray-05": "#E6E6E6",
        "gray-06": "#F7F7F7",
        "warm-gray-01": "#E7E5E4",
        "warm-gray-02": "#F0EFEE",
        "warm-gray-03": "#F7F6F5",
        "warm-gray-04": "#FCFBFB",
        "alert-red": "#C20022",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".caption-bold-12": {
          fontWeight: "700",
          fontSize: "0.75rem", // 12px
          lineHeight: "140%"
        },
        ".caption-med-12": {
          fontWeight: "500",
          fontSize: "0.75rem", // 12px
          lineHeight: "140%"
        },
        ".title-extra-24": {
          fontWeight: "800",
          fontSize: "1.5rem", // 24px
          lineHeight: "140%"
        },
        ".title-extra-20": {
          fontWeight: "800",
          fontSize: "1.25rem", // 20px
          lineHeight: "140%"
        },
        ".title-semi-20": {
          fontWeight: "600",
          fontSize: "1.25rem", // 20px
          lineHeight: "140%"
        },
        ".title-extra-18": {
          fontWeight: "800",
          fontSize: "1.125rem", // 18px
          lineHeight: "140%"
        },
        ".title-semi-18": {
          fontWeight: "600",
          fontSize: "1.125rem", // 18px
          lineHeight: "140%"
        },
        ".body-bold-16": {
          fontWeight: "700",
          fontSize: "1rem", // 16px
          lineHeight: "140%"
        },
        ".body-med-16": {
          fontWeight: "500",
          fontSize: "1rem", // 16px
          lineHeight: "140%"
        },
        ".body-bold-14": {
          fontWeight: "700",
          fontSize: "0.875rem", // 14px
          lineHeight: "140%"
        },
        ".body-med-14": {
          fontWeight: "500",
          fontSize: "0.875rem", // 14px
          lineHeight: "140%"
        }
      });
    },
    require("tailwindcss-animate")
  ]
};
