declare namespace Stories {
  export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    authorEmail: string;
    image?: string | null;
    type: 'success' | 'sad' | 'inspirational';
    createdAt: string;
    userId: number; 
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    avatar?: string | null; 
  }
}

