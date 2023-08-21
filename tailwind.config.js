// const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,ts,vue}',
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
    ],
    safelist: [
        {
            pattern: /items-.+/,
        },
        {
            pattern: /justify-.+/,
        },
        {
            pattern: /gap-[0-9]+/,
        },
    ],
    theme: {
        extend: {},
        screens: {
            'mobile': '0px',
            '2sm': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
