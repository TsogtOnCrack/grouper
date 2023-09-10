/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,jsx}"],
    theme: {
        extend: {},
        screens: {
            "computer": "1175px",
            "tablet": "640px"
        }
    },
    plugins: [],
}