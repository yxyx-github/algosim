/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,ts,vue}',
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
    ],
    safelist: [
        {
            pattern: /flex-(col|row).+/,
            variants: ['mb', '2sm', 'sm', 'md', 'lg', 'xl', '2xl'/*, '@mb', '@xs', '@sm', '@md', '@lg', '@xl', '@2xl', '@3xl', '@4xl', '@5xl', '@6xl', '@7xl'*/],
        },
        {
            pattern: /items-.+/,
            variants: ['mb', '2sm', 'sm', 'md', 'lg', 'xl', '2xl'/*, '@mb', '@xs', '@sm', '@md', '@lg', '@xl', '@2xl', '@3xl', '@4xl', '@5xl', '@6xl', '@7xl'*/],
        },
        {
            pattern: /justify-.+/,
            variants: ['mb', '2sm', 'sm', 'md', 'lg', 'xl', '2xl'/*, '@mb', '@xs', '@sm', '@md', '@lg', '@xl', '@2xl', '@3xl', '@4xl', '@5xl', '@6xl', '@7xl'*/],
        },
        {
            pattern: /gap-[0-9]+/,
            variants: ['mb', '2sm', 'sm', 'md', 'lg', 'xl', '2xl'/*, '@mb', '@xs', '@sm', '@md', '@lg', '@xl', '@2xl', '@3xl', '@4xl', '@5xl', '@6xl', '@7xl'*/],
        },
    ],
    theme: {
        extend: {},
        screens: {
            'mb': '0px',
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        containers: {
            'mb': '0rem',
            'xs': '20rem',
            'sm': '24rem',
            'md': '28rem',
            'lg': '32rem',
            'xl': '36rem',
            '2xl': '42rem',
            '3xl': '48rem',
            '4xl': '56rem',
            '5xl': '64rem',
            '6xl': '72rem',
            '7xl': '80rem',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/container-queries'),
    ],
}
