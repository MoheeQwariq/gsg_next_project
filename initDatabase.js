import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");
db.pragma("foreign_keys = ON");
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'user')),
    avatar TEXT
  );
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    author TEXT NOT NULL,
    authorEmail TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('success', 'sad', 'inspirational')),
    createdAt TEXT NOT NULL,
    FOREIGN KEY(authorEmail) REFERENCES users(email)
  );
`).run();

const fakeUsers = [
  { name: "Admin User", email: "admin@example.com", role: "admin" },
  { name: "John Doe", email: "johndoe@example.com", role: "user" },
  { name: "Jane Smith", email: "janesmith@example.com", role: "user" },
  { name: "seel", email: "seel@example.com", role: "user" },
  { name: "محمد عبد الله", email: "mohammed@example.com", role: "user" },
  { name: "أحمد سالم", email: "ahmeds@example.com", role: "user" },
  { name: "سارة محمود", email: "sarah@example.com", role: "user" },
  { name: "فاطمة علي", email: "fatima@example.com", role: "user" }
];

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, role) VALUES (@name, @email, @role)
`);

for (const user of fakeUsers) {
  insertUser.run(user);
}

const getUserByEmail = db.prepare(`SELECT name FROM users WHERE email = ?`).pluck();

const fakePosts = [
  {
    title: "قصص نجاح في قطاع غزة: تجاوز التحديات الاقتصادية",
    content: "رغم الظروف الاقتصادية الصعبة في غزة، تمكن عدد من رواد الأعمال من تأسيس شركات مبتكرة ...",
    image: "https://example.com/gaza-success-story.jpg",
    authorEmail: "mohammed@example.com",
    type: "success",
    createdAt: "2025-03-26"
  },
  {
    title: "التحديات التي يواجهها المطورون في غزة",
    content: "يواجه المطورون في غزة العديد من التحديات، مثل نقص المعدات التقنية...",
    image: "https://example.com/challenges-in-gaza.jpg",
    authorEmail: "ahmeds@example.com",
    type: "success",
    createdAt: "2025-03-27"
  },
  {
    title: "مبادرات شبابية من غزة لتطوير البرمجة",
    content: "بدأت العديد من المبادرات الشبابية في غزة بتقديم ورش عمل ودورات تعليمية...",
    image: null,
    authorEmail: "sarah@example.com",
    type: "success",
    createdAt: "2025-03-28"
  },
  {
    title: "أهمية الأمن الإلكتروني في غزة",
    content: "في غزة، يعد الأمن الإلكتروني أمرًا بالغ الأهمية، حيث تكافح المؤسسات المحلية...",
    image: "https://example.com/cybersecurity-gaza.jpg",
    authorEmail: "fatima@example.com",
    type: "sad",
    createdAt: "2025-03-29"
  }
];

const insertPost = db.prepare(`
  INSERT INTO posts (title, content, image, author, authorEmail, type, createdAt)
  VALUES (@title, @content, @image, @author, @authorEmail, @type, @createdAt)
`);

for (const post of fakePosts) {
  const authorName = getUserByEmail.get(post.authorEmail);
  if (authorName) {
    post.author = authorName; 
    insertPost.run(post);
  } 
}
