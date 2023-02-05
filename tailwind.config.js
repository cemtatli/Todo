/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#141414",
        "--blue": "#78ACD5",
        "--darkblue": "#0A97FE",
        "--pink": "#DB7CB1",
        "--purple": "#B79DFC",
        "--yellow": "#FCF302",
        "--red": "#FF2460",
      },
      spacing: {
        12.5: "3.125rem",
        15: "3.75rem",
        17.5: "4.375rem",
        25: "6.25rem",
        30: "7.5rem",
        50: "12.5rem",
        100: "25rem",
        200: "50rem",
        400: "100rem",
        1440: "90rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
    },
  },
  plugins: [],
};
