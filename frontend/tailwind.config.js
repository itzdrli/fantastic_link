/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        nord1: "#2e3440",
        nord2: "#3b4252",
        nord3: "#434c5e",
        nord4: "#4c566a",
        nord5: "#d8dee9",
      }
    },
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      defaultFlavour: "frappe",
    }),
  ],
}

