const signUpFormStyles = {
    light: {
      wrapper: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rtl",
      container: "w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row",
      formSection: "w-full md:w-1/2 p-8 md:p-12 bg-white",
      headerContainer: "text-center mb-8",
      logoWrapper: "inline-block mb-4",
      logoContainer: "w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center",
      logoSvg: "h-8 w-8 text-white",
      title: "text-3xl font-bold text-gray-800 mb-2",
      subtitle: "text-gray-500",
      errorBox: "bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm border border-red-100 text-right",
      successBox: "bg-green-50 text-green-500 p-4 rounded-xl mb-6 text-sm border border-green-100 text-right",

      form: "space-y-5",
      submitButton: "w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl",
      footerText: "text-center text-gray-500 mt-6",
      footerLink: "text-blue-600 hover:text-blue-800 font-medium mr-1",
    },
    dark: {
      wrapper: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 rtl",
      container: "w-full max-w-5xl bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row",
      formSection: "w-full md:w-1/2 p-8 md:p-12 bg-gray-800",
      headerContainer: "text-center mb-8",
      logoWrapper: "inline-block mb-4",
      logoContainer: "w-16 h-16 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 flex items-center justify-center",
      logoSvg: "h-8 w-8 text-white",
      title: "text-3xl font-bold text-white mb-2",
      subtitle: "text-gray-400",
      errorBox: "bg-red-900 text-red-100 p-4 rounded-xl mb-6 text-sm border border-red-400 text-right",
      successBox: "bg-green-900 text-green-100 p-4 rounded-xl mb-6 text-sm border border-green-400 text-right",

      form: "space-y-5",
      submitButton: "w-full py-4 mt-6 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl",
      footerText: "text-center text-gray-400 mt-6",
      footerLink: "text-blue-400 hover:text-blue-300 font-medium mr-1",
    },
  };
  
  export default signUpFormStyles;
  