
const generalNavbarStyles = {
    navContainer: "sticky top-0 z-10 backdrop-blur-sm bg-[#EFEFEF] border-b border-gray-200",
    mainWrapper: "max-w-7xl mx-auto px-4",
    navRow: "flex justify-between h-16 items-center",
  
    brand: "text-2xl font-bold bg-gradient-to-r from-[#7851E9] via-[#423ECD] to-[#3652E1] bg-clip-text text-transparent",
  
    desktopNav: "hidden md:flex items-center space-x-1 space-x-reverse",
  
    mobileToggle: "md:hidden text-gray-700 p-2",
  
    mobileMenuContainer:
      "md:hidden bg-gray-50 border-t border-gray-200 pb-4 px-4 flex flex-col space-y-2 pt-2",
  
    itemBase: "rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
  
    spacingDesktop: "px-4 py-2 mx-1",
    spacingMobile: "px-4 py-3",
  
    activeItem: "bg-gray-200 text-gray-800 shadow-md",
    inactiveItem: "bg-white text-gray-800 hover:bg-gray-100",
  
    loginDesktop: "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-green-50 text-green-600 hover:bg-green-100",
    loginMobile: "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-green-50 text-green-600 hover:bg-green-100 flex justify-center",
  };
  
  export default generalNavbarStyles;
  