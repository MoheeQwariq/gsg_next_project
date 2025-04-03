declare namespace Stories {
  export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    authorEmail: string;
    image?: string | null;
    category: ' قصص شخصية' | 'قصص شهداء ومفقودين' | 'قصص النزوح واللجوء' |'قصص النزوح واللجوء' |'التعليم وسط الحرب' |'قصص الحياة اليومية الي تحت الحصار';
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

