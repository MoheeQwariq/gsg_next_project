
const loginFormStyles = {
    light: {
      wrapper: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rtl",
      container: "w-full max-w-md bg-white rounded-3xl shadow-2xl p-8",
      title: "text-3xl font-bold text-gray-800 text-center mb-2",
      subtitle: "text-gray-500 text-center mb-6",
      errorBox: "bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm border border-red-100 text-right",
      form: "space-y-5",
      input: "block w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2 bg-transparent text-gray-800 placeholder-gray-400",
      submitButton: "w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl",
      signupMessage: "text-center text-gray-500 mt-6",
      signupLink: "text-blue-600 hover:text-blue-800 font-medium mr-1",
    },
    dark: {
      wrapper: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 rtl",
      container: "w-full max-w-md bg-[#12151d] rounded-3xl shadow-2xl p-8",
      title: "text-3xl font-bold text-white text-center mb-2",
      subtitle: "text-gray-300 text-center mb-6",
      errorBox: "bg-red-900 text-red-100 p-4 rounded-xl mb-6 text-sm border border-red-400 text-right",
      form: "space-y-5",
      input: "text-white block w-full border border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-2 bg-transparent text-gray-100 placeholder-gray-400",
      submitButton: "w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl",
      signupMessage: "text-center text-gray-400 mt-6",
      signupLink: "text-blue-400 hover:text-blue-300 font-medium mr-1",
    },
  };
  
  export default loginFormStyles;
  