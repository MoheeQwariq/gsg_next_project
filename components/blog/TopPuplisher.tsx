import Image from "next/image";
import Link from "next/link";
import { FaUserFriends, FaNewspaper } from "react-icons/fa";
import myPhoto from "@/public/myPhoto.jpg";
interface TopPublisherProps {
  name: string;
  articles: number;
  followers: number;
  imageSrc?: string;
}

const TopPublisher = ({ name, articles, followers }: TopPublisherProps) => {
  return (
    <div className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-100">
        <Image
          src={myPhoto}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
          {name}
        </h4>

        <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaNewspaper className="h-3 w-3 text-blue-500" />
            <span>{articles} مقال</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUserFriends className="h-3 w-3 text-blue-500" />
            <span>{followers} متابع</span>
          </div>
        </div>
      </div>

      <Link
        href={`/`}
        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700"
      >
        زيارة الصفحة
      </Link>
    </div>
  );
};

export default TopPublisher;
