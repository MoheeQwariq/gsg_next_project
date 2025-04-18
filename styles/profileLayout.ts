const profileLayoutStyles = {
  light: {
    container: "container mx-auto px-4 py-8 bg-white",
    grid: "grid grid-cols-1 gap-8 lg:grid-cols-4",
    main: "order-1 lg:col-span-3",
    sidebar: "order-2 lg:sticky lg:top-24 lg:self-start",
    dir: "rtl",
  },
  dark: {
    container: "container mx-auto px-4 py-8 bg-gray-900",
    grid: "grid grid-cols-1 gap-8 lg:grid-cols-4",
    main: "order-1 lg:col-span-3",
    sidebar: "order-2 lg:sticky lg:top-24 lg:self-start",
    dir: "rtl",
  },
};

export default profileLayoutStyles;
