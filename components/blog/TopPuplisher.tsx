"use client";
import Image from "next/image";
import Link from "next/link";
import { FaUserFriends, FaNewspaper } from "react-icons/fa";
import myPhoto from "@/public/myPhoto.jpg";
import { useTheme } from "@/context/ThemeContext";

interface TopPublisherProps {
  name: string;
  articles: number;
  followers: number;
  imageSrc?: string;
}

// Extracted styles for TopPublisher component
const topPublisherStyles = {
  light: {
    container:
      "group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50",
    imageWrapper:
      "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-100",
    image: "object-cover transition-transform group-hover:scale-105",
    content: "flex flex-1 flex-col",
    name: "font-medium text-gray-900 group-hover:text-blue-600",
    metaContainer:
      "mt-1 flex items-center gap-4 text-xs text-gray-500",
    iconNewspaper: "h-3 w-3 text-blue-500",
    iconUserFriends: "h-3 w-3 text-blue-500",
    link:
      "rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700",
  },
  dark: {
    container:
      "group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700",
    imageWrapper:
      "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-300",
    image: "object-cover transition-transform group-hover:scale-105",
    content: "flex flex-1 flex-col",
    name: "font-medium text-gray-100 group-hover:text-blue-400",
    metaContainer:
      "mt-1 flex items-center gap-4 text-xs text-gray-400",
    iconNewspaper: "h-3 w-3 text-blue-400",
    iconUserFriends: "h-3 w-3 text-blue-400",
    link:
      "rounded-full bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-blue-800 hover:text-blue-400",
  },
};

const TopPublisher = ({ name, articles, followers }: TopPublisherProps) => {
  const { theme } = useTheme();
  const styles = topPublisherStyles[theme];

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={myPhoto}
          alt={name}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h4 className={styles.name}>{name}</h4>

        <div className={styles.metaContainer}>
          <div className="flex items-center gap-1">
            <FaNewspaper className={styles.iconNewspaper} />
            <span>{articles} مقال</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUserFriends className={styles.iconUserFriends} />
            <span>{followers} متابع</span>
          </div>
        </div>
      </div>

      <Link href={`/`} className={styles.link}>
        زيارة الصفحة
      </Link>
    </div>
  );
};

export default TopPublisher;
