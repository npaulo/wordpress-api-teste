// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: "#0a4f7d", // azul institucional
        secondary: "#0b74b6", // azul mais claro (hover/destaque)
        accent: "#e1262c", // vermelho do coração
        neutral: "#ffffff", // branco principal
        muted: "#f5faff", // fundo claro
        text: "#0a2a43", // azul-acinzentado para texto
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      borderRadius: {
        md: "0.5rem",
        xl: "1rem",
      },
    },
  },
};
