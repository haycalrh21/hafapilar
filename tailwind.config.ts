import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        hijau: "#0F4C5C",
        departement: "#63767A",
        hero: "#07242B",
        cardtesti: "#0F4C5C80",
        testi: "#07242B",
        testi2: "#63767A",
        impact: "#F2AF29",
      },
      fontWeight: {
        thin: "100",
        hairline: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        "extra-bold": "800",
        black: "900",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
