import sqlite3 from "better-sqlite3";
const db = sqlite3("stories.db");
db.pragma("foreign_keys = ON");
const securePassword =
  "$2b$12$OGlKAjuTnvhjSdYhaoGKuOTs9XuVfM1B2pCacvKbENMew.cENK3Nm";
 
db.prepare(
  `
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
    likes INTEGER DEFAULT 0,
    commentsCount INTEGER DEFAULT 0,
    author TEXT ,
    authorEmail TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN (
      'قصص شخصية',
      'قصص شهداء ومفقودين',
      'قصص النزوح واللجوء',
      'التعليم وسط الحرب',
      'قصص الحياة اليومية الي تحت الحصار'
    )),
    createdAt TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY(authorEmail) REFERENCES users(email) ON DELETE CASCADE
  );
`
).run();
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS followers (
    followerEmail TEXT NOT NULL,
    followedEmail TEXT NOT NULL,
    PRIMARY KEY (followerEmail, followedEmail),
    FOREIGN KEY (followerEmail) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (followedEmail) REFERENCES users(email) ON DELETE CASCADE
  );
`
).run();
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS stars (
  userEmail TEXT NOT NULL,
  starredEmail TEXT NOT NULL,
  PRIMARY KEY (userEmail, starredEmail),
  FOREIGN KEY (userEmail) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (starredEmail) REFERENCES users(email) ON DELETE CASCADE
);

`
).run();

db.prepare(
  `
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

`
).run();

db.prepare(
  `
CREATE TABLE IF NOT EXISTS comment_loves (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userEmail TEXT NOT NULL,
  commentId INTEGER NOT NULL,
  FOREIGN KEY(userEmail) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY(commentId) REFERENCES comments(id) ON DELETE CASCADE,
  UNIQUE(userEmail, commentId)  
);
 `
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS post_loves (
  userEmail TEXT NOT NULL,
  postId INTEGER NOT NULL,
  PRIMARY KEY (userEmail, postId),
  FOREIGN KEY(userEmail) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE
);

   `
).run();























const fakeUsers = [
  { name: "أسيل", email: "aseel@example.com", password: securePassword, role: "user", imageUrl: "url-to-aseel-image", username: "aseel", birthday: "1995-01-01" },
  { name: "لمى", email: "lama@example.com", password: securePassword, role: "user", imageUrl: "url-to-lama-image", username: "lama", birthday: "1996-05-01" },
  { name: "منة", email: "mena@example.com", password: securePassword, role: "user", imageUrl: "url-to-mena-image", username: "mena", birthday: "1997-03-01" },
  { name: "فيصل", email: "faisal@example.com", password: securePassword, role: "user", imageUrl: "url-to-faisal-image", username: "faisal", birthday: "1994-12-01" },
  { name: "عبدالسلام", email: "abdelsalam@example.com", password: securePassword, role: "user", imageUrl: "url-to-abdelsalam-image", username: "abdelsalam", birthday: "1993-07-01" },
  { name: "محيي", email: "mohee@example.com", password: securePassword, role: "user", imageUrl: "url-to-mohee-image", username: "mohee", birthday: "1998-02-01" }
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
    title: "الطموح رغم الحرب",
    content: "رغم دمار الحي، أصرت أسيل على استكمال مشروع تخرجها باستخدام الإنترنت الضعيف من على سطح المنزل.",
    image: "/download (1).jpg",
    likes: 5,
    commentsCount: 2,
    authorEmail: "aseel@example.com",
    category: "قصص الحياة اليومية الي تحت الحصار",
    createdAt: "2025-04-10",
    userId: 1
  },
  {
    title: "وداع الشهيد يوسف",
    content: "امل تروي لحظة وداعها لشقيقها يوسف الذي استشهد أثناء محاولته إنقاذ الجرحى.",
    image: "/download (1).jpg",
    likes: 3,
    commentsCount: 2,
    authorEmail: "aseel@example.com",
    category: "قصص شهداء ومفقودين",
    createdAt: "2025-04-10",
    userId: 1
  },

  
  {
    title: "معاناة أم نازحة",
    content: "لمى تكتب عن جارتها التي اضطرت للنزوح مع خمسة أطفال وتعيش الآن في مدرسة مزدحمة.",
    image: "/download (1).jpg",
    likes: 2,
    commentsCount: 1,
    authorEmail: "lama@example.com",
    category: 'قصص النزوح واللجوء',
    createdAt: "2025-04-10",
    userId: 2
  },
  {
    title: "يوميات فتاة تحت الحصار",
    content: "لمى توثق تفاصيل يومها من انقطاع الكهرباء والبحث عن مياه صالحة للشرب.",
    image: "/download (1).jpg",
    likes: 4,
    commentsCount: 2,
    authorEmail: "lama@example.com",
    category: "قصص الحياة اليومية الي تحت الحصار",
    createdAt: "2025-04-10",
    userId: 2
  },

  
  {
    title: "الدرس تحت القصف",
    content: "منة تحكي كيف واصلت تدريس الأطفال في ملجأ باستخدام شمعة وسبورة خشبية.",
    image: "/download (1).jpg",
    likes: 2,
    commentsCount: 2,
    authorEmail: "mena@example.com",
    category: "التعليم وسط الحرب",
    createdAt: "2025-04-10",
    userId: 3
  },
  {
    title: "رحيل الطفلة دينا",
    content: "قصة مؤثرة عن الطفلة دينا التي استشهدت أثناء لعبها أمام بيتها، كتبتها منة بروح موجعة.",
    image: "/download (1).jpg",
    likes: 0,
    commentsCount: 1,
    authorEmail: "mena@example.com",
    category: "قصص الشهداء والمفقودين",
    createdAt: "2025-04-10",
    userId: 3
  },

  
  {
    title: "مهمة إعلامية محفوفة بالخطر",
    content: "فيصل المصور يروي كيف تعرض للإصابة أثناء توثيق لحظة قصف مبنى سكني.",
    image: "/download (1).jpg",
    likes: 6,
    commentsCount: 0,
    authorEmail: "faisal@example.com",
    category: "قصص شخصية",
    createdAt: "2025-04-10",
    userId: 4
  },
  {
    title: "منزلنا صار رماد",
    content: "فيصل يتحدث عن تدمير منزله بالكامل بعد غارة جوية، وكيف تأقلم مع الحياة في المخيم.",
    image: "/download (1).jpg",
    likes: 0,
    commentsCount: 0,
    authorEmail: "faisal@example.com",
    category: "قصص النزوح واللجوء",
    createdAt: "2025-04-10",
    userId: 4
  },

  
  {
    title: "طفولتي في زمن القصف",
    content: "عبدالسلام يروي ذكرياته كطفل عاش أولى أيام العدوان، والفرق بين طفولته وطفولة أبنائه.",
    image: "/download (1).jpg",
    likes: 1,
    commentsCount: 0,
    authorEmail: "abdelsalam@example.com",
    category: "قصص شخصية",
    createdAt: "2025-04-10",
    userId: 5
  },
  {
    title: "أمل رغم الركام",
    content: "قصة جارته العجوز التي لم تترك التطريز رغم تدمير بيتها.",
    image: "/download (1).jpg",
    likes: 0,
    commentsCount: 0,
    authorEmail: "abdelsalam@example.com",
    category: "قصص الحياة اليومية الي تحت الحصار",
    createdAt: "2025-04-10",
    userId: 5
  },

  
  {
    title: "ممرض في الخطوط الأمامية",
    content: "محيي يروي كيف عمل تحت القصف لإنقاذ المصابين، وهو يعلم أن المستشفى قد يُقصف بأي لحظة.",
    image: "/download (1).jpg",
    likes: 0,
    commentsCount: 0,
    authorEmail: "mohee@example.com",
    category: "قصص شخصية",
    createdAt: "2025-04-10",
    userId: 6
  },
  {
    title: "أخي الشهيد",
    content: "احمد يكتب عن فقدان أخيه في قصف استهدف الشارع أثناء عودته من السوق.",
    image: "/download (1).jpg",
    likes: 0,
    commentsCount: 0,
    authorEmail: "mohee@example.com",
    category: "قصص الشهداء والمفقودين",
    createdAt: "2025-04-10",
    userId: 6
  }
];


const insertPost = db.prepare(`
  INSERT INTO posts (title, content, image, likes, commentsCount, authorEmail, category, createdAt, userId)
VALUES (@title, @content, @image, @likes, @commentsCount,
        @authorEmail, @category, @createdAt, @userId)

`);
for (const post of fakePosts) {
  const authorName = db
    .prepare(`SELECT name FROM users WHERE email = ?`)
    .pluck()
    .get(post.authorEmail);
  if (authorName) {
    post.author = authorName;
    insertPost.run(post);
  }
}







const fakeFollowers = [
  { followerEmail: "aseel@example.com", followedEmail: "lama@example.com" },
  { followerEmail: "aseel@example.com", followedEmail: "mena@example.com" },
  { followerEmail: "lama@example.com", followedEmail: "aseel@example.com" },
  { followerEmail: "mena@example.com", followedEmail: "mohee@example.com" },
  { followerEmail: "faisal@example.com", followedEmail: "aseel@example.com" },
  { followerEmail: "abdelsalam@example.com", followedEmail: "mena@example.com" },
  { followerEmail: "mohee@example.com", followedEmail: "faisal@example.com" },
  { followerEmail: "mohee@example.com", followedEmail: "abdelsalam@example.com" },
];

const insertFollower = db.prepare(`
  INSERT INTO followers (followerEmail, followedEmail)
  VALUES (@followerEmail, @followedEmail)
`);

for (const follow of fakeFollowers) {
  insertFollower.run(follow);
}




const fakeStars = [
  { userEmail: "aseel@example.com", starredEmail: "lama@example.com" },
  { userEmail: "aseel@example.com", starredEmail: "faisal@example.com" },
  { userEmail: "lama@example.com", starredEmail: "aseel@example.com" },
  { userEmail: "mena@example.com", starredEmail: "abdelsalam@example.com" },
  { userEmail: "faisal@example.com", starredEmail: "mohee@example.com" },
  { userEmail: "abdelsalam@example.com", starredEmail: "mena@example.com" },
  { userEmail: "mohee@example.com", starredEmail: "aseel@example.com" },
  { userEmail: "mohee@example.com", starredEmail: "abdelsalam@example.com" },
];


const insertStar = db.prepare(
  "INSERT OR IGNORE INTO stars (userEmail, starredEmail) VALUES (@userEmail, @starredEmail)"
);

for (const star of fakeStars) {
  insertStar.run(star);
}



const fakeComments = [
  { userEmail: "aseel@example.com", postId: 1, content: "قصة مؤثرة، الله يرحم الشهيد.", createdAt: "2025-04-10", love: 3 },
  { userEmail: "lama@example.com", postId: 1, content: "أنا متأثرة جدًا بما حدث له.", createdAt: "2025-04-10", love: 3 },
  { userEmail: "mena@example.com", postId: 2, content: "الحياة تحت الحصار صعبة جدًا، ولكنهم يصمدون.", createdAt: "2025-04-10", love: 1 },
  { userEmail: "faisal@example.com", postId: 2, content: "أبناء غزة لا يستسلمون مهما كانت الظروف.", createdAt: "2025-04-10", love: 2 },
  { userEmail: "abdelsalam@example.com", postId: 3, content: "التعليم هو الأمل الوحيد في غزة.", createdAt: "2025-04-10", love: 5 },
  { userEmail: "mohee@example.com", postId: 4, content: "النازحون بحاجة إلى الدعم والمساعدة.", createdAt: "2025-04-10", love: 1 },
  { userEmail: "aseel@example.com", postId: 4, content: "اللهم فرج همهم وأزح الغمة عنهم.", createdAt: "2025-04-10", love: 0 },
  { userEmail: "lama@example.com", postId: 5, content: "الأطفال في غزة هم رمز الأمل، رغم كل شيء.", createdAt: "2025-04-10", love: 0},
  { userEmail: "mena@example.com", postId: 5, content: "الله يحفظهم ويرعاهم.", createdAt: "2025-04-10", love: 3 },
  { userEmail: "faisal@example.com", postId: 6, content: "قصة محيي تذكرنا بقوة وصمود غزة.", createdAt: "2025-04-10", love: 0 }
];
const insertComment = db.prepare(`
  INSERT INTO comments (userEmail, postId, content, createdAt, love)
  VALUES (@userEmail, @postId, @content, @createdAt, @love)
`);

for (const comment of fakeComments) {
  insertComment.run(comment);
}





const fakePostLoves = [
  { userEmail: "aseel@example.com", postId: 1 },
  { userEmail: "lama@example.com", postId: 1 },
  { userEmail: "mena@example.com", postId: 2 },
  { userEmail: "faisal@example.com", postId: 2 },
  { userEmail: "abdelsalam@example.com", postId: 3 },
  { userEmail: "mohee@example.com", postId: 3 },
  { userEmail: "aseel@example.com", postId: 4 },
  { userEmail: "lama@example.com", postId: 4 },
  { userEmail: "mena@example.com", postId: 5 },
  { userEmail: "faisal@example.com", postId: 5 },
  { userEmail: "abdelsalam@example.com", postId: 5 },
  { userEmail: "mohee@example.com", postId: 5 },
  { userEmail: "aseel@example.com", postId: 2 },
  { userEmail: "faisal@example.com", postId: 1 },
  { userEmail: "mena@example.com", postId: 1 },
  { userEmail: "mohee@example.com", postId: 1 },
  { userEmail: "abdelsalam@example.com", postId: 7 },
  { userEmail: "mohee@example.com", postId: 7},
  { userEmail: "aseel@example.com", postId: 7 },
  { userEmail: "faisal@example.com", postId: 7},
  { userEmail: "mohee@example.com", postId: 7 },
  { userEmail: "lama@example.com", postId: 7 },
  { userEmail: "lama@example.com", postId: 9},
];
const insertPostLove = db.prepare(`
  INSERT INTO post_loves (userEmail, postId)
  VALUES (@userEmail, @postId)
`);

for (const love of fakePostLoves) {
  insertPostLove.run(love);
}





const commentLovesData = [
  { userEmail: "lama@example.com", commentId: 1 },
  { userEmail: "mena@example.com", commentId: 1 },
  { userEmail: "abdelsalam@example.com", commentId: 1 },

  { userEmail: "mena@example.com", commentId: 2 },
  { userEmail: "faisal@example.com", commentId: 2 },
  { userEmail: "aseel@example.com", commentId: 2 },
  

  { userEmail: "abdelsalam@example.com", commentId: 3 },

  { userEmail: "mohee@example.com", commentId: 4 },
  { userEmail: "aseel@example.com", commentId: 4 },

  { userEmail: "lama@example.com", commentId: 5 },
  { userEmail: "mena@example.com", commentId: 5 },
  { userEmail: "aseel@example.com", commentId: 5 },
  { userEmail: "mohee@example.com", commentId: 5 },
  { userEmail: "faisal@example.com", commentId: 5 },

  { userEmail: "faisal@example.com", commentId: 6 },

  { userEmail: "abdelsalam@example.com", commentId: 9},
  { userEmail: "mohee@example.com", commentId: 9},
  { userEmail: "aseel@example.com", commentId: 9},
];
const insertCommentsLove = db.prepare(`
  INSERT INTO post_loves (userEmail, commentId)
  VALUES (@userEmail, @commentId)
`);

for (const love of commentLovesData) {
  insertCommentsLove.run(love);
}



const profiles = [
  {
    userId: 1,
    bio: "أنا أسيل من غزة، أشارك قصص شعبنا الصامد.",
    coverUrl: "/images (2).jpg",
    facebookUrl: "https://facebook.com/aseel",
    linkedinUrl: "https://linkedin.com/in/aseel",
    xUrl: "https://x.com/aseel",
    phoneNumber: "0599000001",
    showStats: true,
    showInteractions: true,
  },
  {
    userId: 2,
    bio: "كاتبة من غزة، أنقل معاناة الناس بكلماتي.",
    coverUrl: "/images (1).jpg",
    facebookUrl: "https://facebook.com/lama",
    linkedinUrl: "https://linkedin.com/in/lama",
    xUrl: "https://x.com/lama",
    phoneNumber: "0599000002",
    showStats: true,
    showInteractions: true,
  },
  {
    userId: 3,
    bio: "غزاوية أؤمن بالأمل والتغيير.",
    coverUrl: "/download (2).jpg",
    facebookUrl: "https://facebook.com/mena",
    linkedinUrl: "https://linkedin.com/in/mena",
    xUrl: "https://x.com/mena",
    phoneNumber: "0599000003",
    showStats: true,
    showInteractions: true,
  },
  {
    userId: 4,
    bio: "صوت شبابي من غزة، أنشر قصصنا للعالم.",
    coverUrl: "/images (4).jpg",
    facebookUrl: "https://facebook.com/faisal",
    linkedinUrl: "https://linkedin.com/in/faisal",
    xUrl: "https://x.com/faisal",
    phoneNumber: "0599000004",
    showStats: true,
    showInteractions: true,
  },
  {
    userId: 5,
    bio: "طالب من غزة، أشارك قصص الأمل في ظل الحصار.",
    coverUrl: "/images (3).jpg",
    facebookUrl: "https://facebook.com/abdelsalam",
    linkedinUrl: "https://linkedin.com/in/abdelsalam",
    xUrl: "https://x.com/abdelsalam",
    phoneNumber: "0599000005",
    showStats: true,
    showInteractions: true,
  },
  {
    userId: 6,
    bio: "من غزة الصمود، أشارك تجاربي في الحياة اليومية.",
    coverUrl: "/download (3).jpg",
    facebookUrl: "https://facebook.com/mohee",
    linkedinUrl: "https://linkedin.com/in/mohee",
    xUrl: "https://x.com/mohee",
    phoneNumber: "0599000006",
    showStats: true,
    showInteractions: true,
  }
];

const insertProfile = db.prepare(`
  INSERT INTO profiles (userId, bio, coverUrl, facebookUrl, linkedinUrl, xUrl, phoneNumber, showStats, showInteractions)
  VALUES (@userId, @bio, @coverUrl, @facebookUrl, @linkedinUrl, @xUrl, @phoneNumber, @showStats, @showInteractions)
`);

for (const profile of profiles) {
  insertProfile.run(profile);
}


const profileSections = [
  {
    userId: 1,
    title: "عنّي",
    content: "أنا أسيل، مهندسة كمبيوتر شغوفة بتطوير الويب ودعم قضايا غزة.",
    imageUrl: "aseel-about.jpg",
    imageDirection: "left"
  },
  {
    userId: 1,
    title: "هدفي",
    content: "أستخدم مهاراتي التقنية لتسليط الضوء على معاناة أهلنا في غزة.",
    imageUrl: "aseel-goal.jpg",
    imageDirection: "right"
  },

  {
    userId: 2,
    title: "رسالتي",
    content: "أسعى لنشر الوعي بقضايا فلسطين من خلال الفن والكلمة.",
    imageUrl: "lama-message.jpg",
    imageDirection: "right"
  },
  {
    userId: 2,
    title: "شغفي",
    content: "أحب الكتابة والتصميم، وأدمجهما لنقل صوت غزة للعالم.",
    imageUrl: "lama-passion.jpg",
    imageDirection: "left"
  },

  
  {
    userId: 3,
    title: "قصتي",
    content: "كبرتُ أرى الظلم، فقررت أن أكون صوتًا للحق.",
    imageUrl: "mena-story.jpg",
    imageDirection: "left"
  },
  {
    userId: 3,
    title: "إلهامي",
    content: "كل طفل ناجٍ من العدوان هو مصدر إلهامي اليومي.",
    imageUrl: "mena-inspiration.jpg",
    imageDirection: "right"
  },

  
  {
    userId: 4,
    title: "مسيرتي",
    content: "من غزة إلى العالم، أنقل واقعنا وأحلامنا رغم الحصار.",
    imageUrl: "faisal-journey.jpg",
    imageDirection: "right"
  },
  {
    userId: 4,
    title: "حلمي",
    content: "أن أؤسس منصة تنقل روايات أهل غزة كما هي، بلا تزوير.",
    imageUrl: "faisal-dream.jpg",
    imageDirection: "left"
  },

  
  {
    userId: 5,
    title: "أهدافي",
    content: "أؤمن بأن التعليم هو السلاح الأقوى لتحرير العقول.",
    imageUrl: "abdelsalam-goals.jpg",
    imageDirection: "left"
  },
  {
    userId: 5,
    title: "قيمتي",
    content: "القيمة الحقيقية في الإنسان تكمن في عطائه للآخرين.",
    imageUrl: "abdelsalam-value.jpg",
    imageDirection: "right"
  },

  {
    userId: 6,
    title: "إيماني",
    content: "ما دام هناك أمل، ستظل غزة صامدة بشبابها.",
    imageUrl: "mohee-faith.jpg",
    imageDirection: "right"
  },
  {
    userId: 6,
    title: "واجبي",
    content: "واجبي أن أكون داعمًا لكل جريح ونازح في بلدي.",
    imageUrl: "mohee-duty.jpg",
    imageDirection: "left"
  }
];

const insertProfileSection = db.prepare(`
  INSERT INTO profile_sections (userId, title, content, imageUrl, imageDirection)
  VALUES (@userId, @title, @content, @imageUrl, @imageDirection)
`);

for (const section of profileSections) {
  insertProfileSection.run(section);
}




