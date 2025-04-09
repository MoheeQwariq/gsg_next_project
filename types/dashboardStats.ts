export interface MonthStat {
    month: string; // "يناير", ....
    count: number;
  }
  
  export interface UserStats {
    articleCounts: MonthStat[];
    commentCounts: MonthStat[];
    followerCounts: MonthStat[];
    loveCounts: MonthStat[];
  }
  export interface Interaction {
    id: number;
    type: string; // "comment" | "like" |
    content?: string;
    articleId: number;
  }