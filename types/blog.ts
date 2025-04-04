export interface Article {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  likes: number;
  commentsCount: number;
  category?: string;
  createdAt?: string;
  author?: {
    name: string;
    avatarUrl: string;
  };
}
