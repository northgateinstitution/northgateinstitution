/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Explicit HEX fallbacks
        'gray-50': '#f9fafb',
        'gray-900': '#111827',
        'blue-600': '#2563eb',
        'blue-800': '#1d4ed8',
        'red-600': '#dc2626',
        'green-600': '#16a34a',
      },
    },
  },
  safelist: [
    // Ensure these classes always compile to HEX output
    'bg-gray-50',
    'text-gray-900',
    'bg-blue-600',
    'bg-blue-800',
    'text-red-600',
    'text-green-600',
  ],
  plugins: [],
}
