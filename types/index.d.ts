declare namespace Stories{
    export interface Post {
        id: number;
        title: string;
        content: string;
        author: string;
        author_email:string
        is_deleted: boolean;
        image:string
      }
      
}