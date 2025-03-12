/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFCE48",
        "primary-var1": "#FBC020",
        "primary-var2": "#FFFAE1",
        secondary: "#76D9BE",
        "secondary-var1": "#48BF9F",
        "secondary-var2": "#E7FCF6",
        "grey-01": "#323232",
        "grey-02": "#5B5B5B",
        "grey-03": "#9E9E9E",
        "grey-04": "#CCCCCC",
        "grey-05": "#E6E6E6",
        "grey-06": "#F7F7F7",
        "warm-grey-01": "#E7E5E4",
        "warm-grey-02": "#F0EFEE",
        "warm-grey-03": "#F7F6F5",
        "warm-grey-04": "#FCFBFB",
        "alert-red": "#C20022"
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
    }
  ]
};
