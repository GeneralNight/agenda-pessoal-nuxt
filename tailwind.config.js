/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/{App,app,Error,error}.vue",
    "./src/{components,layouts,pages,composables,plugins}/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-black": {
          DEFAULT: "#272944",
          100: "#373852",
        },
        "custom-blue": {
          DEFAULT: "#424bd1",
        },
      },
    },
  },
  plugins: [],
};
