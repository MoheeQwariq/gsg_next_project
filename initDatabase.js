import sqlite3 from "better-sqlite3";
const db = sqlite3("stories.db");
db.pragma("foreign_keys = ON");
const securePassword = "$2b$12$OGlKAjuTnvhjSdYhaoGKuOTs9XuVfM1B2pCacvKbENMew.cENK3Nm";

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    role TEXT  CHECK(role IN ('admin', 'user', 'guest')),
    avatar TEXT,
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
    category TEXT NOT NULL CHECK(category IN ('قصص شخصية', 'قصص شهداء ومفقودين', 'قصص النزوح واللجوء', 'التعليم وسط الحرب', 'قصص الحياة اليومية الي تحت الحصار')),
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

const fakeUsers = [
  { name: "Aseel", email: "aseel@gmail.com", password: securePassword, role: "admin", avatar: "/images.jpg", username: "aseel123", birthday: "1995-07-15" },
  { name: "Mohee", email: "mohee@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "mohee42", birthday: "1995-07-15" },
  { name: "Lama", email: "lama@example.com", password: securePassword, role: "guest", avatar: "/images.jpg", username: "lama_56", birthday: "1995-07-15" },
  { name: "Ahmed", email: "ahmeds@example.com", password: securePassword, role: "admin", avatar: "/images.jpg", username: "ahmed123", birthday: "1990-10-25" },
  { name: "Sarah", email: "sarah@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "sarah_98", birthday: "1998-04-10" },
  { name: "Mohammad", email: "mohammad@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "mohammad101", birthday: "1997-02-18" },
  { name: "Yara", email: "yara@example.com", password: securePassword, role: "guest", avatar: "/images.jpg", username: "yara98", birthday: "1999-09-12" },
  { name: "Omar", email: "omar@example.com", password: securePassword, role: "admin", avatar: "/images.jpg", username: "omar55", birthday: "1992-03-05" },
  { name: "Lina", email: "lina@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "lina_777", birthday: "1996-08-30" },
  { name: "Zain", email: "zain@example.com", password: securePassword, role: "guest", avatar: "/images.jpg", username: "zain99", birthday: "2000-01-22" },
  { name: "Tariq", email: "tariq@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "tariq_1985", birthday: "1985-12-02" },
  { name: "Maya", email: "maya@example.com", password: securePassword, role: "guest", avatar: "/images.jpg", username: "maya_666", birthday: "2001-11-19" },
  { name: "Rami", email: "rami@example.com", password: securePassword, role: "admin", avatar: "/images.jpg", username: "rami_123", birthday: "1988-06-21" },
  { name: "Hanan", email: "hanan@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "hanan_2000", birthday: "2000-09-14" },
  { name: "Samir", email: "samir@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "samir_41", birthday: "1992-04-25" },
  { name: "Nour", email: "nour@example.com", password: securePassword, role: "guest", avatar: "/images.jpg", username: "nour123", birthday: "1995-07-01" },
  { name: "Khaled", email: "khaled@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "khaled1994", birthday: "1994-12-10" },
  { name: "Diana", email: "diana@example.com", password: securePassword, role: "admin", avatar: "/images.jpg", username: "diana_567", birthday: "1990-02-22" },
  { name: "Ali", email: "ali@example.com", password: securePassword, role: "user", avatar: "/images.jpg", username: "ali_1201", birthday: "1993-11-15" },
  { name: "Zaynab", email: "zaynab@example.com", password: securePassword, role: "guest", avatar: "/images.jpg", username: "zaynab_77", birthday: "1998-03-13" }
];

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, password, role, avatar, username, birthday)
  VALUES (@name, @email, @password, @role, @avatar, @username, @birthday)
`);
for (const user of fakeUsers) {
  insertUser.run(user);
}
const fakePosts = [
  {
    title: "رحلتي في البحث عن جذوري",
    content:
      "لطالما سمعت قصصًا عن أجدادي الذين فقدوا أرضهم خلال النكبة، لكنني لم أدرك عمق المأساة حتى بدأت البحث بنفسي...",
    image: "/download (1).jpg",
    authorEmail: "mohee@example.com",
    category: "قصص شخصية",
    createdAt: "2025-03-26",
  },
  {
    title: "استشهاد صديقي في الحرب",
    content:
      "في أحد الأيام، كنا نلعب في الحي كما نفعل دائمًا، ولكن تلك الليلة كانت الأخيرة لصديقي خالد...",
    image: "/download (1).jpg",
    authorEmail: "lina@example.com",
    category: "قصص شهداء ومفقودين",
    createdAt: "2025-03-27",
  },
  {
    title: "نزوح قسري تحت القصف",
    content:
      "في منتصف الليل، اضطررنا لحزم أمتعتنا والهروب من منزلنا بعد أن أصبح هدفًا للصواريخ...",
    image: "/download (1).jpg",
    authorEmail: "omar@example.com",
    category: "قصص النزوح واللجوء",
    createdAt: "2025-03-28",
  },
  {
    title: "التعليم في ظل الحرب: تحديات بلا حدود",
    content:
      "بينما كنت أحاول إنهاء دراستي الجامعية، أصبح الوصول إلى الإنترنت والكهرباء معركة يومية...",
    image: "/download (1).jpg",
    authorEmail: "zaynab@example.com",
    category: "التعليم وسط الحرب",
    createdAt: "2025-03-29",
  },
  {
    title: "الحياة اليومية تحت الحصار",
    content:
      "شراء الطعام، الحصول على الماء، وحتى الذهاب إلى المستشفى أصبحت مهام محفوفة بالمخاطر...",
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
