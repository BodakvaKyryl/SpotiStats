// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionProperty: {
        opacity: "opacity",
      },
      transitionDuration: {
        "500": "500ms",
      },
      transitionTimingFunction: {
        "in-out": "ease-in-out",
      },
    },
  },
};
