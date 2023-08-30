/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#216bed",
          secondary: "#4338ca",
          accent: "#dd836e",
          neutral: "#3b82f6",
          "base-100": "#F3F0FB",
          "violetcustom": "#205AFC",
          info: "#1861e7",
          success: "#118348",
          warning: "#fbd437",
          error: "#ec3e32",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
