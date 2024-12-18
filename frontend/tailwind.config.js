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
        text: "#CBDCED",
        bg: "#323D42",
        flow: "#686879",
        red: "#C56869",
        flow1: "#3F778C",
      }
    },
  },
  plugins: [],
}

