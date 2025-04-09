export interface Comment {
    id: string;
    content: string;
    authorId: number;
    createdAt: string;
    likes: number;
}

export interface CommentData {
    content: string;
    authorId?: number; 
}