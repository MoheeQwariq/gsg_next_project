export interface CategoryTabProps {
  children: React.ReactNode;
  category: string;
}
export interface BlogDetail {
  blogId: string;
  title: string;
  category: string;
  content: string;
  tags: string;
  imageUrl: string;
  createdAt: string;
  like: number;
  commentsCount?: number;
  author: {
    id: number;
    name: string;
    image: string;
  };
}
export interface BlogId {
  blogId: string;
}
