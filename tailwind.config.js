export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        'inset-card': 'inset 0 3px 8px rgba(0,0,0,0.200), inset 0 1px 3px rgba(0,0,0,0.25)',
        'inset-toggle': 'inset 0 3px 6px rgba(0,0,0,0.2)',
        'inset-strong': 'inset 0 4px 8px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
}