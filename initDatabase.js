import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

const fakePosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    content: "Web development is evolving with new frameworks and technologies...",
    image: "https://example.com/future-web.jpg",
    author: "John Doe",
    authorEmail: "johndoe@example.com",
    type: "inspirational",
    createdAt: "2025-03-26",
  },
  {
    id: 2,
    title: "Understanding TypeScript",
    content: "TypeScript enhances JavaScript by adding static types...",
    image: "https://example.com/typescript-guide.jpg",
    author: "Jane Smith",
    authorEmail: "janesmith@example.com",
    type: "inspirational",
    createdAt: "2025-03-27",
  },
  {
    id: 3,
    title: "Next.js vs React: Which One to Choose?",
    content: "Both Next.js and React offer powerful capabilities, but the choice depends on...",
    image: "https://example.com/next-vs-react.jpg",
    author: "Ali Ahmed",
    authorEmail: "aliahmed@example.com",
    type: "success",
    createdAt: "2025-03-28",
  },
  {
    id: 4,
    title: "Best Practices for API Security",
    content: "Ensuring API security involves authentication, authorization, and encryption...",
    image: "https://example.com/api-security.jpg",
    author: "Sara Khan",
    authorEmail: "sarakhan@example.com",
    type: "sad",
    createdAt: "2025-03-29",
  },
];

db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    author TEXT NOT NULL,
    authorEmail TEXT NOT NULL,
    type TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );
`).run();

const insertData = () => {
  const insertCommand = db.prepare(`
    INSERT INTO posts (title, content, image, author, authorEmail, type, createdAt)
    VALUES (@title, @content, @image, @author, @authorEmail, @type, @createdAt)
  `);

  for (const post of fakePoالقصةsts) {
    insertCommand.run({
      title: String(post.title),
      content: String(post.content),
      image: post.image ? String(post.image) : "default.jpg",
      author: String(post.author),
      authorEmail: String(post.authorEmail),
      type: String(post.type),
      createdAt: String(post.createdAt),
    });
  }
};

insertData();
