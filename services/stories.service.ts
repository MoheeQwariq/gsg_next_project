import sqlite3  from "better-sqlite3"
const db = sqlite3("stories.db");
const getAllPosts = () => {
    const result = db.prepare(`SELECT * FROM posts`).all();
    return result as Stories.Post[];
  };
  
 const deletePost = (id: number) => {
  const deleteCommand = db.prepare("DELETE FROM posts WHERE id = ?");
  const result = deleteCommand.run(id);
  return result.changes > 0;
};

export { getAllPosts, deletePost };
  