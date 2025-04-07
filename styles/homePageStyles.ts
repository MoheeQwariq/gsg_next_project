const homePageStyles = {
    light: {
      container: "min-h-screen font-sans bg-[rgb(235,235,235)] text-gray-900",
      heroSection:
        "relative flex flex-col items-center justify-center text-center py-40 px-8 bg-gradient-to-r from-[rgb(49,54,219)] to-blue-500 text-white",
      heroTitle: "text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl",
      heroDescription: "text-lg max-w-2xl mt-4 opacity-90 leading-relaxed mx-auto",
      heroButtonsContainer: "mt-10 flex gap-6",
      heroButton:
        "px-8 py-3 text-lg font-semibold rounded-xl bg-white text-[rgb(49,54,219)] shadow-lg hover:shadow-2xl transition-all duration-300",
  
      featuresSection: "py-24 bg-[rgb(235,235,235)] text-center",
      featuresTitle: "text-4xl font-bold text-gray-900 mb-10",
      featuresGrid: "max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6",
      storyCard: "relative p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300",
      storyImageWrapper: "relative w-full h-48",
      storyCardContent: "p-4",
      storyCardTitle: "text-2xl font-semibold text-gray-800",
      storyCardDescription: "text-gray-600 mt-2",
  
      aboutSection: "py-24 bg-white text-center",
      aboutContainer: "max-w-5xl mx-auto px-6",
      aboutTitle:
        "text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#7851E9] to-[#3652E1] bg-clip-text text-transparent",
      aboutText: "text-lg text-gray-700 leading-relaxed tracking-wide",
      aboutCards: "mt-10 grid grid-cols-1 md:grid-cols-3 gap-8",
      aboutCard: "p-6 rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition",
      aboutCardTitle: "text-xl font-semibold text-gray-900 mb-2",
      aboutCardDescription: "text-gray-600",
  
      contactSection: "py-24 bg-white text-center",
      contactContainer: "max-w-4xl mx-auto px-6",
      contactTitle:
        "text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#7851E9] to-[#3652E1] bg-clip-text text-transparent",
      contactText: "text-lg text-gray-700 leading-relaxed tracking-wide",
      contactLink:
        "inline-block px-6 py-3 text-lg font-medium text-white bg-[rgb(49,54,219)] rounded-full shadow-lg transition transform hover:scale-105 hover:bg-[rgb(35,40,180)] mt-8",
  
      footer: "py-6 bg-gray-900 text-center text-gray-400",
    },
  
    dark: {
      container: "min-h-screen font-sans bg-gray-900 text-gray-100",
      heroSection:
        "relative flex flex-col items-center justify-center text-center py-40 px-8 bg-gradient-to-r from-indigo-700 to-blue-800 text-white",
      heroTitle: "text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl",
      heroDescription: "text-lg max-w-2xl mt-4 opacity-90 leading-relaxed mx-auto",
      heroButtonsContainer: "mt-10 flex gap-6",
      heroButton:
        "px-8 py-3 text-lg font-semibold rounded-xl bg-white text-blue-900 shadow-lg hover:shadow-2xl transition-all duration-300",
  
      featuresSection: "py-24 bg-gray-800 text-center",
      featuresTitle: "text-4xl font-bold text-gray-100 mb-10",
      featuresGrid: "max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6",
      storyCard: "relative p-8 bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition duration-300",
      storyImageWrapper: "relative w-full h-48",
      storyCardContent: "p-4",
      storyCardTitle: "text-2xl font-semibold text-gray-100",
      storyCardDescription: "text-gray-200 mt-2",
  
      aboutSection: "py-24 bg-gray-900 text-center",
      aboutContainer: "max-w-5xl mx-auto px-6",
      aboutTitle:
        "text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent",
      aboutText: "text-lg text-gray-300 leading-relaxed tracking-wide",
      aboutCards: "mt-10 grid grid-cols-1 md:grid-cols-3 gap-8",
      aboutCard: "p-6 rounded-lg bg-gray-800 shadow-sm hover:shadow-md transition",
      aboutCardTitle: "text-xl font-semibold text-gray-100 mb-2",
      aboutCardDescription: "text-gray-400",
  
      contactSection: "py-24 bg-gray-900 text-center",
      contactContainer: "max-w-4xl mx-auto px-6",
      contactTitle:
        "text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent",
      contactText: "text-lg text-gray-300 leading-relaxed tracking-wide",
      contactLink:
        "inline-block px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-full shadow-lg transition transform hover:scale-105 hover:bg-blue-600 mt-8",
  
      footer: "py-6 bg-gray-800 text-center text-gray-400",
    },
  };
  
  export default homePageStyles;
  