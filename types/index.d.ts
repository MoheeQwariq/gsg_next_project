declare namespace Stories {
  export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    authorEmail: string;
    image: string;
    type: 'success' | 'sad' | 'inspirational';
    createdAt: string;
  }
  export interface User {
    id: number;
    name: string;
    email: string;
  }
}
