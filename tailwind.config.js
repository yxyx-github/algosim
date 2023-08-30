/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,ts,vue}',
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
    ],
    safelist: [
        {
            pattern: /flex-(col|row).+/,
            variants: ['mobile', '2sm', 'sm', 'md', 'lg', 'xl', '2xl'],
        },
        {
            pattern: /items-.+/,
            variants: ['mobile', '2sm', 'sm', 'md', 'lg', 'xl', '2xl'],
        },
        {
            pattern: /justify-.+/,
            variants: ['mobile', '2sm', 'sm', 'md', 'lg', 'xl', '2xl'],
        },
        {
            pattern: /gap-[0-9]+/,
            variants: ['mobile', '2sm', 'sm', 'md', 'lg', 'xl', '2xl'],
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
