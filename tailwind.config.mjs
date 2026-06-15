/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050b15",
          900: "#07111f",
          850: "#0a1728",
          800: "#0d2035",
        },
        gold: {
          400: "#ffd029",
          500: "#f7bd11",
          600: "#d79b00",
        },
        ice: {
          100: "#f6f9ff",
          200: "#dbe8ff",
          300: "#9db9e7",
        },
      },
      fontFamily: {
        sans: [
          "Outfit",
          "Satoshi",
          "Avenir Next",
          "Hiragino Kaku Gothic ProN",
          "Yu Gothic",
          "Meiryo",
          "sans-serif",
        ],
      },
      boxShadow: {
        product: "0 30px 90px -45px rgba(79, 135, 224, 0.75)",
        insetLine: "inset 0 1px 0 rgba(255,255,255,0.12)",
      },
      backgroundImage: {
        radialNavy:
          "radial-gradient(circle at 20% 15%, rgba(50, 91, 151, 0.34), transparent 30%), radial-gradient(circle at 80% 35%, rgba(247, 189, 17, 0.08), transparent 24%)",
      },
    },
  },
  plugins: [],
};
