/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
    themes: [
      {
        mytheme: {
          primary: "#dd8a56",

          secondary: "#b686f9",

          accent: "#9b95f4",

          neutral: "#171D21",

          "base-100": "#EBEAEB",

          info: "#5478ED",

          success: "#27B995",

          warning: "#EDBB5E",

          error: "#E0244A",
        },
      },
    ],
  },
};
