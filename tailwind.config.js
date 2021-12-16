const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    colors: {
      ...defaultColors,
      "color-bg": "#F3ECEC",
    },
  },
  variants: {
    extend: {},
    container: [],
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          "@media (min-width: 1536px)": {
            maxWidth: "1536px",
          },
          "@media (min-width: 1280px)": {
            maxWidth: "1280px",
          },
          "@media (min-width: 1024px)": {
            maxWidth: "1024px",
          },
          "@media (min-width: 768px)": {
            maxWidth: "768px",
          },
          "@media (min-width: 640px)": {
            maxWidth: "640px",
          },
          maxWidth: "100%",
        },
      });
    },
  ],
};
