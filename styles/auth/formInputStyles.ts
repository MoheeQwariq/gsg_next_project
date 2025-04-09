const formInputStyles = {
    light: {
      container: "space-y-2 text-right",
      label: "block text-gray-700 font-medium",
      input:
        "w-full px-4 py-3 rounded-xl border border-gray-200 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
      inputPaddingLeft: "pl-12",
      inputPaddingRight: "pr-10",
      icon: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400",
      rightIcon: "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700",
    },
    dark: {
      container: "space-y-2 text-right",
      label: "block text-gray-300 font-medium",
      input:
        "w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-100 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all",
      inputPaddingLeft: "pl-12",
      inputPaddingRight: "pr-10",
      icon: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400",
      rightIcon: "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300",
    },
  };
  export default formInputStyles;   