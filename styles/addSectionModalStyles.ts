const addSectionModalStyles = {
  light: {
    overlay:
      "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4",
    container:
      "relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto",
    header: "mb-4 flex items-center justify-between border-b border-gray-200 pb-2",
    headerTitle: "text-xl font-bold text-gray-900",
    closeButton:
      "rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700",
    form: "space-y-4",
    label: "block text-sm font-medium text-gray-700 mb-1",
    input:
      "w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    textarea:
      "w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    select:
      "w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    fileUploadLabel:
      "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
    fileUploadInner: "flex flex-col items-center justify-center pt-5 pb-6",
    fileUploadText: "mb-2 text-sm text-gray-500",
    buttonContainer: "flex justify-end gap-3 pt-2",
    cancelButton:
      "rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
    submitButton:
      "rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700",
  },
  dark: {
    overlay:
      "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4",
    container:
      "relative w-full max-w-2xl rounded-xl bg-gray-900 p-6 shadow-xl max-h-[90vh] overflow-y-auto",
    header: "mb-4 flex items-center justify-between border-b border-gray-700 pb-2",
    headerTitle: "text-xl font-bold text-gray-100",
    closeButton:
      "rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200",
    form: "space-y-4",
    label: "block text-sm font-medium text-gray-300 mb-1",
    input:
      "w-full rounded-lg border border-gray-600 p-3 text-gray-300 bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    textarea:
      "w-full rounded-lg border border-gray-600 p-3 text-gray-300 bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    select:
      "w-full rounded-lg border border-gray-600 p-3 text-gray-300 bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    fileUploadLabel:
      "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700",
    fileUploadInner: "flex flex-col items-center justify-center pt-5 pb-6",
    fileUploadText: "mb-2 text-sm text-gray-400",
    buttonContainer: "flex justify-end gap-3 pt-2",
    cancelButton:
      "rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-600",
    submitButton:
      "rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700",
  },
};

export default addSectionModalStyles;
