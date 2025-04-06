const profilePageStyles = {
  light: {
    headerContainer:
      "mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center",
    pageHeading:
      "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5]",
    sectionContainer: "mt-8",
    sectionHeading:
      "mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5] text-right",
    emptyMessage: "p-4 text-center text-gray-600",
  },
  dark: {
    headerContainer:
      "mb-6 flex flex-col justify-between gap-4 border-b border-gray-700 pb-4 sm:flex-row sm:items-center",
    pageHeading:
      "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8A9BF9] to-[#D1B2FF]",
    sectionContainer: "mt-8",
    sectionHeading:
      "mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8A9BF9] to-[#D1B2FF] text-right",
    emptyMessage: "p-4 text-center text-gray-300",
  },
};

export default profilePageStyles;
