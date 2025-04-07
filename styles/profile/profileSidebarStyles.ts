const profileSidebarStyles = {
  light: {
    container: "space-y-6",
    card: "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4",
    headerCard: "flex items-center gap-x-4",
    avatarContainer: "relative h-12 w-12 overflow-hidden rounded-full",
    image: "object-cover",
    nameText: "text-lg font-bold text-gray-900",
    emailText: "text-sm text-gray-600",
    quickLinksCard: "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4",
    quickLinkTitle: "mb-2 text-lg font-bold text-gray-900",
    quickLinkItem: "block text-blue-600 hover:underline",
  },
  dark: {
    container: "space-y-6",
    card: "overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-sm p-4",
    headerCard: "flex items-center gap-x-4",
    avatarContainer: "relative h-12 w-12 overflow-hidden rounded-full",
    image: "object-cover",
    nameText: "text-lg font-bold text-gray-100",
    emailText: "text-sm text-gray-300",
    quickLinksCard: "overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-sm p-4",
    quickLinkTitle: "mb-2 text-lg font-bold text-gray-100",
    quickLinkItem: "block text-blue-400 hover:underline",
  },
};

export default profileSidebarStyles;