const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                themecolor: "#00cff4",
                black: "#3a3a3a ",
                lightblack: "rgba(58, 58, 58, 0.50) ",
                themebgcolor: '#f6f6f6',
                deletecolor: '#fb275d',
                gray1: "#c0bcbc",
                baseColor: "#F6F3FE",
                bordercolor: '#eaeaea',
            },
            fontFamily: {
                "product_sansbold_italic": "product_sansbold_italic",
                "product_sansbold": "product_sansbold",
                "product_sansitalic": "product_sansitalic",
                "product_sans_mediumregular": "product_sans_mediumregular",
                "product_sansregular": "product_sansregular",
            },
            screens: {
                xs: { min: "300px", max: "500px" },
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
