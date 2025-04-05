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
  author: {
    name: string;
    image: string;
  };
}
export interface BlogId {
  blogId: string;
}
