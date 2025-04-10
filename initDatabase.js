import sqlite3 from "better-sqlite3";
const db = sqlite3("stories.db");
db.pragma("foreign_keys = ON");
const securePassword = "$2b$12$OGlKAjuTnvhjSdYhaoGKuOTs9XuVfM1B2pCacvKbENMew.cENK3Nm";



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

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    role TEXT  CHECK(role IN ('admin', 'user', 'guest')),
    imageUrl TEXT,
    username TEXT UNIQUE NOT NULL,
    birthday TEXT 
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
    category TEXT NOT NULL CHECK(category IN (
      'قصص شخصية',
      'قصص شهداء ومفقودين',
      'قصص النزوح واللجوء',
      'التعليم وسط الحرب',
      'قصص الحياة اليومية الي تحت الحصار'
    )),
    createdAt TEXT NOT NULL,
 FOREIGN KEY(authorEmail) REFERENCES users(email) ON DELETE CASCADE  );
`).run();
db.prepare(`
  CREATE TABLE IF NOT EXISTS followers (
    followerEmail TEXT NOT NULL,
    followedEmail TEXT NOT NULL,
    PRIMARY KEY (followerEmail, followedEmail),
    FOREIGN KEY (followerEmail) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (followedEmail) REFERENCES users(email) ON DELETE CASCADE
  );
`).run();
db.prepare(`
  CREATE TABLE IF NOT EXISTS stars (
  userEmail TEXT NOT NULL,
  starredEmail TEXT NOT NULL,
  PRIMARY KEY (userEmail, starredEmail),
  FOREIGN KEY (userEmail) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (starredEmail) REFERENCES users(email) ON DELETE CASCADE
);

`).run();

db.prepare(`
 CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userEmail TEXT NOT NULL,
  postId INTEGER NOT NULL,
  content TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  love INTEGER DEFAULT 0,
  FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY(userEmail) REFERENCES users(email) ON DELETE CASCADE
);

`).run();


db.prepare(`
CREATE TABLE IF NOT EXISTS comment_loves (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userEmail TEXT NOT NULL,
  commentId INTEGER NOT NULL,
  FOREIGN KEY(userEmail) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY(commentId) REFERENCES comments(id) ON DELETE CASCADE,
  UNIQUE(userEmail, commentId) -- هذه تجعل اليوزر غير قادر على إضافة أكثر من لايك لنفس التعليق
);
 `).run();
 


const fakeUsers = [
  { name: "Aseel", email: "aseel@gmail.com", password: securePassword, role: "admin", imageUrl: "/images.jpg", username: "aseel123", birthday: "1995-07-15" },
  { name: "Mohee", email: "mohee@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "mohee42", birthday: "1995-07-15" },
  { name: "Lama", email: "lama@example.com", password: securePassword, role: "guest", imageUrl: "/images.jpg", username: "lama_56", birthday: "1995-07-15" },
  { name: "Ahmed", email: "ahmeds@example.com", password: securePassword, role: "admin", imageUrl: "/images.jpg", username: "ahmed123", birthday: "1990-10-25" },
  { name: "Sarah", email: "sarah@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "sarah_98", birthday: "1998-04-10" },
  { name: "Mohammad", email: "mohammad@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "mohammad101", birthday: "1997-02-18" },
  { name: "Yara", email: "yara@example.com", password: securePassword, role: "guest", imageUrl: "/images.jpg", username: "yara98", birthday: "1999-09-12" },
  { name: "Sana", email: "Sana@gmail.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "sana123", birthday: "1990-05-10" },
  { name: "Omar", email: "omar@example.com", password: securePassword, role: "admin", imageUrl: "/images.jpg", username: "omar55", birthday: "1992-03-05" },
  { name: "Lina", email: "lina@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "lina_777", birthday: "1996-08-30" },
  { name: "Zain", email: "zain@example.com", password: securePassword, role: "guest", imageUrl: "/images.jpg", username: "zain99", birthday: "2000-01-22" },
  { name: "Tariq", email: "tariq@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "tariq_1985", birthday: "1985-12-02" },
  { name: "Maya", email: "maya@example.com", password: securePassword, role: "guest", imageUrl: "/images.jpg", username: "maya_666", birthday: "2001-11-19" },
  { name: "Rami", email: "rami@example.com", password: securePassword, role: "admin", imageUrl: "/images.jpg", username: "rami_123", birthday: "1988-06-21" },
  { name: "Hanan", email: "hanan@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "hanan_2000", birthday: "2000-09-14" },
  { name: "sanohd", email: "sanohd@gmail.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "sanohd123", birthday: "1990-01-01" },
  { name: "Samir", email: "samir@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "samir_41", birthday: "1992-04-25" },
  { name: "Nour", email: "nour@example.com", password: securePassword, role: "guest", imageUrl: "/images.jpg", username: "nour123", birthday: "1995-07-01" },
  { name: "Khaled", email: "khaled@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "khaled1994", birthday: "1994-12-10" },
  { name: "Diana", email: "diana@example.com", password: securePassword, role: "admin", imageUrl: "/images.jpg", username: "diana_567", birthday: "1990-02-22" },
  { name: "Ali", email: "ali@example.com", password: securePassword, role: "user", imageUrl: "/images.jpg", username: "ali_1201", birthday: "1993-11-15" },
  { name: "Zaynab", email: "zaynab@example.com", password: securePassword, role: "guest", imageUrl: "/images.jpg", username: "zaynab_77", birthday: "1998-03-13" }
];

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, password, role, imageUrl, username, birthday)
  VALUES (@name, @email, @password, @role, @imageUrl, @username, @birthday)
 
`);
for (const user of fakeUsers) {
  insertUser.run(user);
}
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
    authorEmail: "lina@example.com",
    category: "قصص شهداء ومفقودين",
    createdAt: "2025-03-27",
  },
  {
    title: "نزوح قسري تحت القصف",
    content: "في منتصف الليل، اضطررنا لحزم أمتعتنا والهروب من منزلنا...",
    image: "/download (1).jpg",
    authorEmail: "omar@example.com",
    category: "قصص النزوح واللجوء",
    createdAt: "2025-03-28",
  },
  {
    title: "التعليم في ظل الحرب: تحديات بلا حدود",
    content: "أصبح الوصول إلى الإنترنت والكهرباء معركة يومية...",
    image: "/download (1).jpg",
    authorEmail: "zaynab@example.com",
    category: "التعليم وسط الحرب",
    createdAt: "2025-03-29",
  },
  {
    title: "الحياة اليومية تحت الحصار",
    content: "شراء الطعام، الحصول على الماء، حتى الذهاب إلى المستشفى...",
    image: null,
    authorEmail: "ali@example.com",
    category: "قصص الحياة اليومية الي تحت الحصار",
    createdAt: "2025-03-30",
  },
];

const insertPost = db.prepare(`
  INSERT INTO posts (title, content, image, author, authorEmail, category, createdAt)
  VALUES (@title, @content, @image, @author, @authorEmail, @category, @createdAt)
`);
for (const post of fakePosts) {
  const authorName = db.prepare(`SELECT name FROM users WHERE email = ?`).pluck().get(post.authorEmail);
  if (authorName) {
    post.author = authorName;
    insertPost.run(post);
  }
}

const fakeFollowers = [
  { followerEmail: "mohee@example.com", followedEmail: "Sana@gmail.com" },
  { followerEmail: "lama@example.com", followedEmail: "Sana@gmail.com" },
  { followerEmail: "Sana@gmail.com", followedEmail: "aseel@gmail.com" },
  { followerEmail: "Sana@gmail.com", followedEmail: "mohee@example.com" },
  { followerEmail: "rami@example.com", followedEmail: "Sana@gmail.com" },
];

const insertFollower = db.prepare(`
  INSERT OR IGNORE INTO followers (followerEmail, followedEmail)
  VALUES (@followerEmail, @followedEmail)
`);
for (const follower of fakeFollowers) {
  insertFollower.run(follower);
}
const fakeStars = [
  { userEmail: "sanohd@gmail.com", starredEmail: "aseel@gmail.com" },
  { userEmail: "sarah@example.com", starredEmail: "ahmeds@example.com" },
];

const insertStar = db.prepare(
  "INSERT OR IGNORE INTO stars (userEmail, starredEmail) VALUES (@userEmail, @starredEmail)"
);

for (const star of fakeStars) {
  insertStar.run(star);
}