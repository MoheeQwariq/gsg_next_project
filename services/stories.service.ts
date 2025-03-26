import sqlite3  from "better-sqlite3"
const db = sqlite3("stories.db");
const getAllPosts = () => {
    const result = db.prepare(`SELECT * FROM posts`).all();
    return result as Stories.Post[];
  };
  
export { getAllPosts };
  