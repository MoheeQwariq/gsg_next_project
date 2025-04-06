const profileDropdownStyles = {
    light: {
      container: "relative inline-block mr-2",
      button: "group flex items-center gap-x-3 focus:outline-none cursor-pointer",
      imageWrapper: "relative h-10 w-10 overflow-hidden rounded-full",
      image: "h-full w-full object-cover",
      userName:
        "hidden text-gray-800 font-medium md:inline-block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3652E1] group-hover:to-[#8057F5]",
      dropdown:
        "absolute left-0 top-full z-50 mt-2 w-48 max-w-xs rounded-lg bg-white border border-gray-200 shadow-lg",
      dropdownList: "py-2",
      dropdownItem:
        "block px-4 py-2 text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#3652E1] hover:to-[#8057F5]",
      dropdownItemFlex:
        "flex items-center gap-x-1.5 block px-4 py-2 text-red-600 hover:text-red-800",
      separator: "border-t border-gray-200 my-1",
    },
    dark: {
      container: "relative inline-block mr-2",
      button: "group flex items-center gap-x-3 focus:outline-none cursor-pointer",
      imageWrapper: "relative h-10 w-10 overflow-hidden rounded-full",
      image: "h-full w-full object-cover",
      userName:
        "hidden text-gray-200 font-medium md:inline-block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8A9BF9] group-hover:to-[#D1B2FF]",
      dropdown:
        "absolute left-0 top-full z-50 mt-2 w-48 max-w-xs rounded-lg bg-gray-800 border border-gray-700 shadow-lg",
      dropdownList: "py-2",
      dropdownItem:
        "block px-4 py-2 text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#8A9BF9] hover:to-[#D1B2FF]",
      dropdownItemFlex:
        "flex items-center gap-x-1.5 block px-4 py-2 text-red-400 hover:text-red-600",
      separator: "border-t border-gray-700 my-1",
    },
  };
  
  export default profileDropdownStyles;
  