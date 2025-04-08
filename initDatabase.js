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
  role TEXT NOT NULL CHECK(role IN ('admin', 'user','guest')),
  avatar TEXT,
  username TEXT UNIQUE NOT NULL

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
    category TEXT NOT NULL CHECK(category IN ('قصص شخصية', 'قصص شهداء ومفقودين', 'قصص النزوح واللجوء', 'التعليم وسط الحرب', 'قصص الحياة اليومية الي تحت الحصار')),
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
    username: "aseel123",
  },
  {
    name: "Mohee",
    email: "mohee@example.com",
    password: securePassword,
    role: "user",
    avatar: "/images.jpg",
    username: "mohee42",
  },
  {
    name: "Lama",
    email: "lama@example.com",
    password: securePassword,
    role: "guest",
    avatar: "/images.jpg",
    username: "lama_56",
  },
  {
    name: "Faisal",
    email: "faisal@example.com",
    password: securePassword,
    role: "admin",
    avatar: "/images.jpg",
    username: "faisal_23",
  },
  {
    name: "Abd Alsalam",
    email: "abdalsalam@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
    username: "abdalsalam_1",
  },
  {
    name: "Menaa",
    email: "Menaa@example.com",
    password: securePassword,
    role: "guest",
    avatar: "/images.jpg",
    username: "menaa_salem",
  },
  {
    name: "سارة محمود",
    email: "sarah@example.com",
    password: securePassword,
    role: "user",
    avatar: "/images.jpg",
    username: "sarah_mohamed",
  },
  {
    name: "فاطمة علي",
    email: "fatima@example.com",
    password: securePassword,
    role: "admin",
    avatar: "/images.jpg",
    username: "fatima_ali",
  },
  {
    name: "Ali",
    email: "ali@example.com",
    password: securePassword,
    role: "guest",
    avatar: "/images.jpg",
    username: "ali_123",
  },
  {
    name: "Nora",
    email: "nora@example.com",
    password: securePassword,
    role: "user",
    avatar: "/images.jpg",
    username: "nora_234",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: securePassword,
    role: "admin",
    avatar: null,
    username: "john_doe_100",
  },
  {
    name: "Maya Ali",
    email: "maya.ali@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
    username: "maya_ali_321",
  },
  {
    name: "Omar Farooq",
    email: "omar.farooq@example.com",
    password: securePassword,
    role: "guest",
    avatar: null,
    username: "omar_22",
  },
  {
    name: "Ranya Zaid",
    email: "ranya.zaid@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
    username: "ranya_456",
  },
  {
    name: "Khalid Alhassan",
    email: "khalid.alhassan@example.com",
    password: securePassword,
    role: "admin",
    avatar: null,
    username: "khalid_789",
  },
  {
    name: "Lina Abed",
    email: "lina.abed@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
    username: "lina_333",
  },
  {
    name: "Zayd Ali",
    email: "zayd.ali@example.com",
    password: securePassword,
    role: "guest",
    avatar: null,
    username: "zayd_444",
  },
  {
    name: "Huda Al Rashed",
    email: "huda.rashed@example.com",
    password: securePassword,
    role: "admin",
    avatar: null,
    username: "huda_555",
  },
  {
    name: "Layla Ahmad",
    email: "layla.ahmad@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
    username: "layla_666",
  },
  {
    name: "Rami Salim",
    email: "rami.salim@example.com",
    password: securePassword,
    role: "guest",
    avatar: "/rami_avatar.jpg",
    username: "rami_777",
  },
  {
    name: "Jasmine El-Tayeb",
    email: "jasmine.el.tayeb@example.com",
    password: securePassword,
    role: "user",
    avatar: null,
    username: "jasmine_888",
  },
  {
    name: "Salman Al-Turk",
    email: "salman.alturk@example.com",
    password: securePassword,
    role: "admin",
    avatar: null,
    username: "salman_999",
  }
];



const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, password, role, avatar,username) 
  VALUES (@name, @email, @password, @role, @avatar,@username)
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
    authorEmail: "ahmeds@example.com",
    category: "قصص شهداء ومفقودين",
    createdAt: "2025-03-27",
  },
  {
    title: "نزوح قسري تحت القصف",
    content:
      "في منتصف الليل، اضطررنا لحزم أمتعتنا والهروب من منزلنا بعد أن أصبح هدفًا للصواريخ...",
    image: "/download (1).jpg",
    authorEmail: "sarah@example.com",
    category: "قصص النزوح واللجوء",
    createdAt: "2025-03-28",
  },
  {
    title: "التعليم في ظل الحرب: تحديات بلا حدود",
    content:
      "بينما كنت أحاول إنهاء دراستي الجامعية، أصبح الوصول إلى الإنترنت والكهرباء معركة يومية...",
    image: "/download (1).jpg",
    authorEmail: "fatima@example.com",
    category: "التعليم وسط الحرب",
    createdAt: "2025-03-29",
  },
  {
    title: "الحياة اليومية تحت الحصار",
    content:
      "شراء الطعام، الحصول على الماء، وحتى الذهاب إلى المستشفى أصبحت مهام محفوفة بالمخاطر...",
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
