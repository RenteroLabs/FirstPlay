/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F2F2F2',
        bgColor: '#F4F4F9',
      },
      fontFamily: {
        'Inter-Medium': ['Inter-Medium', 'Inter'],
        'Inter-Regular': ['Inter-Regular', 'Inter'],
        'Inter-SemiBold': ['Inter-SemiBold', 'Inter'],
        'Inter-Bold': ['Inter-Bold', 'Inter'],
      }
    },
    fontSize: {
      sm: '0.83rem',
      base: '1.17rem',
      xl: '1.33rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2rem',
      '5xl': '2.5rem',
    },
  },
  plugins: [],
}
