const photoUploadStyles = {
    light: {
      container: "space-y-2 text-right",
      label: "block text-gray-700 font-medium",
      mainRow: "flex items-center gap-4 flex-row-reverse",
      imageWrapper: "relative h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-blue-200",
      image: "object-cover",
      userIcon: "h-10 w-10 text-gray-400",
      fileLabel: "cursor-pointer flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-200 rounded-xl hover:bg-blue-50 transition-colors",
      fileLabelIcon: "h-5 w-5 text-blue-500",
      fileLabelText: "text-blue-600 font-medium",
      input: "hidden",
    },
    dark: {
      container: "space-y-2 text-right",
      label: "block text-gray-300 font-medium",
      mainRow: "flex items-center gap-4 flex-row-reverse",
      imageWrapper: "relative h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-blue-700",
      image: "object-cover",
      userIcon: "h-10 w-10 text-gray-400",
      fileLabel: "cursor-pointer flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-700 rounded-xl hover:bg-blue-900 transition-colors",
      fileLabelIcon: "h-5 w-5 text-blue-400",
      fileLabelText: "text-blue-400 font-medium",
      input: "hidden",
    },
  };
  
  export default photoUploadStyles;
  