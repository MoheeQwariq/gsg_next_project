export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "اليوم";
  } else if (diffDays === 1) {
    return "أمس";
  } else if (diffDays < 7) {
    return `قبل ${diffDays} أيام`;
  } else if (diffDays < 30) {
    return `قبل ${Math.floor(diffDays / 7)} أسابيع`;
  } else {
    return `قبل ${Math.floor(diffDays / 30)} أشهر`;
  }
};
