const adminNavbarStyles = {
    navContainer: "bg-gradient-to-r from-indigo-600 to-purple-600 sticky top-0 z-30 shadow-lg",
  
    wrapper: "max-w-7xl mx-auto px-4",
  
    navRow: "flex justify-between h-16 items-center",
  
    brand: "font-bold text-xl text-white flex items-center",
  
    desktopNav: "hidden md:flex items-center space-x-1 space-x-reverse",
  
    desktopItemBase: "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 mx-1",
    desktopActive: "bg-white text-indigo-700 shadow-md",
    desktopInactive: "text-white hover:bg-white/20",
  
    mobileToggle: "md:hidden text-white p-2",
  
    mobileMenuContainer: "md:hidden bg-indigo-700 pb-4 px-4",
  
    mobileItemsWrapper: "flex flex-col space-y-2 pt-2",
  
    mobileItemBase: "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
    mobileActive: "bg-white text-indigo-700",
    mobileInactive: "text-white hover:bg-white/10",
  
    loginDesktop: "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 mr-2 bg-white/10 hover:bg-white/20 text-white",
  
    loginMobile: "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white",
  };
  
  export default adminNavbarStyles;
  