import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");
db.pragma("foreign_keys = ON");


db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'user')),
    avatar TEXT,
    birthday TEXT
  );
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER UNIQUE NOT NULL,
    bio TEXT,
    coverUrl TEXT,
    facebookUrl TEXT,
    linkedinUrl TEXT,
    xUrl TEXT,
    phoneNumber TEXT,
    showStats BOOLEAN DEFAULT 1,
    showInteractions BOOLEAN DEFAULT 1,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
  );
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS profile_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    imageUrl TEXT,
    imageDirection TEXT CHECK(imageDirection IN ('left', 'right')) DEFAULT 'left',
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
  );
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS user_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    imageUrl TEXT,
    likes INTEGER DEFAULT 0,
    commentsCount INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
  );
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    author TEXT NOT NULL,
    authorEmail TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN (
      'قصص شخصية',
      'قصص شهداء ومفقودين',
      'قصص النزوح واللجوء',
      'التعليم وسط الحرب',
      'قصص الحياة اليومية الي تحت الحصار'
    )),
    createdAt TEXT NOT NULL,
    FOREIGN KEY(authorEmail) REFERENCES users(email)
  );
`
).run();

const securePassword =
  "$2b$12$OGlKAjuTnvhjSdYhaoGKuOTs9XuVfM1B2pCacvKbENMew.cENK3Nm";

const fakeUsers = [
  {
    name: "Aseel",
    email: "aseel@gmail.com",
    password: securePassword,
    role: "admin",
    avatar: "/images.jpg",
  },
  {
    name: "Mohee",
    email: "mohee@example.com",
    password: securePassword,
    role: "user",
    avatar: "/images.jpg",
  },
  {
    name: "Lama",
    email: "lama@example.com",
    password: securePassword,
    role: "user",
    avatar: "/images.jpg",
  },
  {
    name: "Faisal",
    email: "faisal@example.com",
    password: securePassword,
    role: "user",
    avatar: "/images.jpg",
  },
  {
    name: "Abd Alsalam",
    email: "abdalsalam@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
  },
  {
    name: "أحمد سالم",
    email: "ahmeds@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
  },
  {
    name: "سارة محمود",
    email: "sarah@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
  },
  {
    name: "فاطمة علي",
    email: "fatima@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
  },
];

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, password, role, avatar)
  VALUES (@name, @email, @password, @role, @avatar)
`);

for (const user of fakeUsers) {
  insertUser.run(user);
}

const getUserByEmail = db
  .prepare(`SELECT name FROM users WHERE email = ?`)
  .pluck();

const fakePosts = [
  {
    title: "رحلتي في البحث عن جذوري",
    content: "لطالما سمعت قصصًا عن أجدادي الذين فقدوا أرضهم خلال النكبة...",
    image: "/download (1).jpg",
    authorEmail: "mohee@example.com",
    category: "قصص شخصية",
    createdAt: "2025-03-26",
  },
  {
    title: "استشهاد صديقي في الحرب",
    content: "في أحد الأيام، كنا نلعب في الحي كما نفعل دائمًا...",
    image: "/download (1).jpg",
    authorEmail: "ahmeds@example.com",
    category: "قصص شهداء ومفقودين",
    createdAt: "2025-03-27",
  },
  {
    title: "نزوح قسري تحت القصف",
    content: "في منتصف الليل، اضطررنا لحزم أمتعتنا والهروب من منزلنا...",
    image: "/download (1).jpg",
    authorEmail: "sarah@example.com",
    category: "قصص النزوح واللجوء",
    createdAt: "2025-03-28",
  },
  {
    title: "التعليم في ظل الحرب: تحديات بلا حدود",
    content: "أصبح الوصول إلى الإنترنت والكهرباء معركة يومية...",
    image: "/download (1).jpg",
    authorEmail: "fatima@example.com",
    category: "التعليم وسط الحرب",
    createdAt: "2025-03-29",
  },
  {
    title: "الحياة اليومية تحت الحصار",
    content: "شراء الطعام، الحصول على الماء، حتى الذهاب إلى المستشفى...",
    image: null,
    authorEmail: "abdalsalam@example.com",
    category: "قصص الحياة اليومية الي تحت الحصار",
    createdAt: "2025-03-30",
  },
];

const insertPost = db.prepare(`
  INSERT INTO posts (title, content, image, author, authorEmail, category, createdAt)
  VALUES (@title, @content, @image, @author, @authorEmail, @category, @createdAt)
`);

for (const post of fakePosts) {
  const authorName = getUserByEmail.get(post.authorEmail);
  if (authorName) {
    post.author = authorName;
    insertPost.run(post);
  }
}
