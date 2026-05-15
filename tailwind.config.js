/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          300: "#fdba74",
          500: "#f97316",
          700: "#c2410c",
          900: "#7c2d12"
        },
        background: {
          light: "#fbfaf7",
          dark: "#101010"
        },
        surface: {
          light: "#ffffff",
          dark: "#1a1a1a"
        },
        text: {
          light: "#1f1b16",
          muted: "#6f655b",
          dark: "#f7f0e8",
          "muted-dark": "#b7aaa0"
        }
      },
      fontSize: {
        display: ["32px", { lineHeight: "40px" }],
        title: ["24px", { lineHeight: "32px" }],
        body: ["16px", { lineHeight: "24px" }],
        caption: ["13px", { lineHeight: "18px" }]
      },
      spacing: {
        18: "72px",
        22: "88px"
      },
      borderRadius: {
        app: "8px"
      }
    }
  },
  plugins: []
};
