
const articleInfoStyles = {
  light: {
    emptyContainer:
      "mx-auto max-w-6xl rounded-xl bg-white p-8 text-center shadow-sm",
    emptyHeading: "mb-2 text-2xl font-semibold text-gray-800",
    emptyText: "text-gray-600",
    emptyLink:
      "mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
    container:
      "mx-auto max-w-6xl overflow-hidden rounded-xl bg-white shadow-sm",
    headerContainer: "border-b border-gray-100 p-6 md:p-8",
    headerTop:
      "flex justify-between items-center mb-4",
    backLink:
      "p-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer",
    categoryBadge:
      "rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700",
    date:
      "flex items-center gap-1 text-sm text-gray-500",
    headerTitle:
      "mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl",
    authorSection:
      "flex items-center gap-3",
    authorImage:
      "relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-100",
    authorInfo: "",
    authorName: "font-medium text-gray-900",
    authorRole: "text-sm text-gray-500",
    metaContainer:
      "flex items-center gap-4 text-sm text-gray-500",
    metaItem: "flex items-center gap-1",
    metaIconEye: "h-4 w-4 text-gray-400",
    metaIconHeart: "h-4 w-4 text-red-400",
    metaIconComment: "h-4 w-4 text-blue-400",
    imageContainer:
      "relative h-64 w-full sm:h-80 md:h-96",
    image: "object-cover",
    contentContainer: "p-6 md:p-8",
    contentLabel: "text-2xl",
    contentText:
      "my-8 whitespace-pre-wrap leading-relaxed text-gray-700",
    tagsContainer: "mt-8 flex flex-wrap gap-2",
    tag: "rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700",
  },
  dark: {
    emptyContainer:
      "mx-auto max-w-6xl rounded-xl bg-gray-800 p-8 text-center shadow-sm",
    emptyHeading: "mb-2 text-2xl font-semibold text-gray-100",
    emptyText: "text-gray-400",
    emptyLink:
      "mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
    container:
      "mx-auto max-w-6xl overflow-hidden rounded-xl bg-gray-800 shadow-sm",
    headerContainer: "border-b border-gray-700 p-6 md:p-8",
    headerTop:
      "flex justify-between items-center mb-4",
    backLink:
      "p-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 cursor-pointer",
    categoryBadge:
      "rounded-lg bg-blue-900 px-3 py-1 text-sm font-medium text-blue-300",
    date:
      "flex items-center gap-1 text-sm text-gray-400",
    headerTitle:
      "mb-6 text-3xl font-bold leading-tight text-gray-100 md:text-4xl",
    authorSection:
      "flex items-center gap-3",
    authorImage:
      "relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-300",
    authorInfo: "",
    authorName: "font-medium text-gray-100",
    authorRole: "text-sm text-gray-400",
    metaContainer:
      "flex items-center gap-4 text-sm text-gray-400",
    metaItem: "flex items-center gap-1",
    metaIconEye: "h-4 w-4 text-gray-300",
    metaIconHeart: "h-4 w-4 text-red-400",
    metaIconComment: "h-4 w-4 text-blue-300",
    imageContainer:
      "relative h-64 w-full sm:h-80 md:h-96",
    image: "object-cover",
    contentContainer: "p-6 md:p-8",
    contentLabel: "text-2xl",
    contentText:
      "my-8 whitespace-pre-wrap leading-relaxed text-gray-300",
    tagsContainer: "mt-8 flex flex-wrap gap-2",
    tag: "rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300",
  },
};
export default articleInfoStyles;