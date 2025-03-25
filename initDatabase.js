const sqlite3 = require("better-sqlite3")
const db = sqlite3("stories.db");

const fakePosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    content: "Web development is evolving with new frameworks and technologies...",
    image: "https://example.com/future-web.jpg",
    author: "John Doe",
    author_email: "johndoe@example.com",
    is_deleted: false,
  },
  {
    id: 2,
    title: "Understanding TypeScript",
    content: "TypeScript enhances JavaScript by adding static types...",
    image: "https://example.com/typescript-guide.jpg",
    author: "Jane Smith",
    author_email: "janesmith@example.com",
    is_deleted: false,
  },
  {
    id: 3,
    title: "Next.js vs React: Which One to Choose?",
    content: "Both Next.js and React offer powerful capabilities, but the choice depends on...",
    image: "https://example.com/next-vs-react.jpg",
    author: "Ali Ahmed",
    author_email: "aliahmed@example.com",
    is_deleted: false,
  },
  {
    id: 4,
    title: "Best Practices for API Security",
    content: "Ensuring API security involves authentication, authorization, and encryption...",
    image: "https://example.com/api-security.jpg",
    author: "Sara Khan",
    author_email: "sarakhan@example.com",
    is_deleted: false,
  },
];

db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    author TEXT NOT NULL,
    author_email TEXT NOT NULL,
    is_deleted BOOLEAN DEFAULT 0
  );
`).run();



const insertData = () => {
  const insertCommand = db.prepare(`
    INSERT INTO posts (title, content, image, author, author_email, is_deleted) 
    VALUES (@title, @content, @image, @author, @author_email, @is_deleted)
  `);

  for (const post of fakePosts) {
    insertCommand.run({
      title: String(post.title),
      content: String(post.content),
      image: post.image ? String(post.image) : "default.jpg",
      author: String(post.author),
      author_email: String(post.author_email),
      is_deleted: post.is_deleted ? 1 : 0
    });
  }
};

insertData();
