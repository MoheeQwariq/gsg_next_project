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
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
  );
`).run();

const fakeUsers = [
  { name: "Admin User", email: "admin@example.com", role: "admin" },
  { name: "John Doe", email: "johndoe@example.com", role: "user" },
  { name: "Jane Smith", email: "janesmith@example.com", role: "user" },
  { name: "seel", email: "seel@example.com", role: "user" }
];

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, role) VALUES (@name, @email, @role)
`);

for (const user of fakeUsers) {
  insertUser.run(user);
}

const getUserId = db.prepare(`SELECT id FROM users WHERE email = ?`).pluck();

const fakePosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    content: " ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium ratione, veritatis, natus, ipsum laborum sed est corporis impedit tempore quia. Nemo perspiciatis aliquam, ducimus dolor ex molestias fugiat corporis sapiente blanditiis esse voluptatum tenetur totam modi similique? Obcaecati optio incidunt expedita minus voluptates neque quis libero praesentium eligendi odio, sapiente debitis? Natus omnis, atque incidunt impedit dolorem necessitatibus consequatur a asperiores quis nam quisquam minima aspernatur est aperiam ullam facere veniam illum autem alias labore blanditiis! Voluptas repellat sunt sit debitis. Eum placeat odit at officia! Distinctio, inventore? Necessitatibus, perspiciatis cum, sequi, praesentium quis quo optio quidem amet quos nostrum rerum aut labore unde assumenda impedit. Officia labore laudantium necessitatibus, autem sequi explicabo harum vitae iure, voluptate similique eius nesciunt tenetur quod distinctio provident voluptates nostrum atque quas quam incidunt ipsa natus vel eligendi. Veritatis facilis dolorum at nam itaque, illo ab eaque rerum quisquam asperiores architecto libero ullam, explicabo, doloremque sed sequi. Aspernatur, reprehenderit! Facere dolore accusamus provident minima optio, tenetur non quas quibusdam nisi accusantium eaque similique vel, possimus ad porro voluptatibus tempora reiciendis. Cum numquam dignissimos officia totam fugiat, explicabo ipsum et possimus nesciunt nam tempora odio sed quos deserunt consequatur vero obcaecati ad perspiciatis saepe aperiam. Laudantium ab nobis, omnis aliquam excepturi, similique nostrum voluptas, nihil nam accusantium quia vitae ea quaerat animi temporibus fugiat fuga eos dolorem atque repellendus velit impedit! Dolor, iusto earum. Voluptatem, eligendi soluta. Obcaecati accusamus earum aliquid nesciunt illo et maiores autem tempora voluptatibus temporibus non tenetur itaque dignissimos, soluta alias nisi quia explicabo, modi ut assumenda officia est, consequuntur ratione. Consequuntur praesentium odit, non molestias in eligendi autem iste repudiandae quos sunt unde totam architecto ducimus quis officiis tempore eum a sit tempora maiores quod reprehenderit possimus? Incidunt deleniti doloribus dolor! Soluta exercitationem dolores molestias deleniti incidunt amet, dolorem nobis eum sed culpa nihil, repellendus facilis aliquam unde dolore. Doloribus, tempora maxime. Rerum tenetur ipsum vitae aliquam debitis! Blanditiis libero temporibus sequi ipsum. Numquam inventore dicta itaque eos corrupti saepe quisquam minima, quae fugit voluptate cum fuga qui! Labore inventore itaque, amet dolorum consectetur dolor temporibus assumenda, natus id saepe iure blanditiis fugit nam excepturi laboriosam totam? Suscipit, deserunt voluptatibus? Maxime quas quis aperiam officiis fugit consequatur, necessitatibus esse corporis nulla aliquam minima aut, omnis eos, neque nisi itaque pariatur repellendus. Soluta dolor, fugiat, vero excepturi animi quo odit vel totam quaerat eveniet natus assumenda vitae. Quos magnam, consectetur ut adipisci voluptates fugit! Illum corporis fuga explicabo dolorem voluptatum quia rerum quo officia maiores iusto obcaecati eaque alias id quidem eos facilis impedit accusamus, assumenda beatae. Fugit itaque in laudantium deserunt numquam veritatis atque enim blanditiis corporis adipisci quos, facere nulla nisi consectetur autem iusto iure dicta eum, voluptate molestiae culpa sequi sunt ipsam? Esse accusantium omnis, dolor aliquam laudantium sequi similique delectus excepturi facere non possimus cupiditate nulla consequuntur illum nesciunt recusandae, sit provident cumque! Recusandae numquam consequuntur dignissimos labore architecto aspernatur earum a dolor non fuga voluptatem itaque velit, iste quasi nobis, voluptate sint voluptatibus molestiae magni, quod rerum inventore ratione. Rerum reprehenderit cumque omnis quia quisquam id consequuntur necessitatibus aliquam at molestias ea eos laudantium reiciendis repellat minus, beatae dignissimos unde dolorem fugit. Suscipit obcaecati vero voluptatum optio atque! Asperiores eos excepturi eligendi doloremque recusandae, et dolor, dolorum voluptatum aspernatur ipsa tempore repudiandae illo vero, saepe vel magnam vitae quos placeat deleniti ut quas. Voluptates quasi maiores quam velit, ut corporis architecto deserunt dignissimos quas dicta error deleniti blanditiis totam consectetur. Nulla eaque quaerat repellat doloribus odit eius harum quasi suscipit aperiam quod laudantium blanditiis, reiciendis deleniti sit esse tempore in a debitis voluptas quia? Alias ex commodi numquam? Voluptate consequatur impedit, tempore necessitatibus, est facilis voluptatum veritatis a numquam excepturi labore architecto in aut. Dicta voluptatum non libero nemo harum deserunt officia earum error natus nisi dolore quae perspiciatis odio laudantium saepe, velit eum vero. Quam molestiae aliquid tenetur nisi non perspiciatis, itaque eligendi ex qui debitis ipsa beatae minima eius odio quod cumque sint. Laboriosam, veritatis quos ipsa quaerat tempore aliquam optio accusantium sint totam? Pariatur, possimus, ea nisi labore magnam nulla laboriosam ratione libero tenetur, accusamus tempora quae. Eligendi sit vel quidem suscipit delectus, facere necessitatibus quasi dolores sequi pariatur corporis sed, est officia esse alias, excepturi iure ipsam nobis. Odit fugiat, quo, porro nulla natus eos sed accusamus excepturi amet veritatis inventore necessitatibus tempore incidunt eum dicta fugit, blanditiis exercitationem labore nihil recusandae libero corporis optio! Eos, dolorum. Vel odit alias blanditiis temporibus hic, ipsa molestias aliquam, sequi laborum, totam ad et minima. Officiis, fugit dolor? Suscipit hic atque molestiae ipsam, unde vitae similique consequuntur animi! Placeat sunt illum accusamus excepturi officiis alias reiciendis vel ratione, officia similique saepe aliquid esse cum, ducimus quae voluptatibus voluptas! Commodi cum, recusandae velit harum dolor modi aliquid tempora praesentium eveniet animi quam id. Ratione fuga, unde obcaecati cupiditate praesentium neque rerum nostrum totam temporibus odit dicta quam suscipit vitae impedit. Quia quis, mollitia sequi reprehenderit maiores blanditiis ex quisquam et! Officia eligendi nam voluptatibus labore iusto eum sapiente laudantium maxime nobis itaque sint vel laborum reprehenderit, explicabo recusandae molestias, in mollitia ipsa voluptatem dolorem odit, provident necessitatibus quibusdam. Exercitationem beatae aliquam tenetur nihil culpa aliquid ipsum ducimus veritatis pariatur ex soluta natus delectus, libero nostrum iure recusandae iusto dolore facilis eveniet error, corrupti, repellat quod consequatur nobis. Omnis facilis quaerat vitae ipsum fugiat, voluptates dolore? Maiores reiciendis quaerat a, tempora in quo quas nulla iusto corporis tempore repudiandae eaque distinctio modi earum reprehenderit repellendus veniam? Labore voluptas esse beatae commodi. Id, quam autem dicta quidem, provident quia velit modi fugiat fuga aperiam cum officiis veritatis nulla nobis excepturi neque possimus, aliquam consectetur inventore nostrum porro! Praesentium quasi assumenda nobis voluptatibus, recusandae dolor consectetur laudantium amet aperiam dolores, ipsum incidunt aliquam et omnis porro nam quis neque, enim excepturi vitae quas. Laudantium provident aspernatur, rem doloribus nostrum ad, fuga et nulla tempore dolores ipsa fugit libero debitis minima, vitae nam totam quasi? Ullam error fuga laboriosam rem reiciendis hic aperiam numquam sunt voluptas culpa quidem doloribus dignissimos iusto deleniti, corporis, ipsum consequatur accusamus explicabo optio. Repellat cupiditate officia rem aperiam voluptatibus vero qui perferendis laudantium? Eos eveniet ex molestiae alias a dolores nostrum quas magni voluptates quod, neque nihil tempora quisquam delectus, quam maxime praesentium distinctio! Laboriosam, nemo quo perspiciatis, nostrum recusandae eveniet officia molestias voluptatem rem incidunt nisi perferendis corporis numquam, laudantium vitae modi excepturi accusamus officiis minima? Voluptatibus illo est obcaecati harum, vero hic reiciendis quasi odit! Doloribus dolore dignissimos veritatis illo ex adipisci ipsa? Itaque ea eaque tempore neque aut fuga, quisquam ad voluptas ut aperiam perferendis minus reprehenderit non vel. Blanditiis, quaerat! Facilis praesentium soluta magni ad nobis ipsa deleniti eius optio voluptas dicta ipsam autem quo est, vel debitis sint nulla architecto culpa distinctio eligendi vitae exercitationem repellendus quis. Ea dignissimos libero aperiam maiores repudiandae corporis sequi ut et, asperiores quis, illum natus possimus accusantium. Saepe consequuntur temporibus delectus quidem dolore dicta rem animi consequatur ad. Ex nemo aut sed eligendi soluta nobis voluptas architecto eum excepturi ea, animi omnis velit quibusdam veritatis praesentium, laboriosam autem corrupti magnam placeat. Obcaecati accusantium vel eveniet! Ullam ut, ratione labore sequi suscipit voluptatem, autem, ab nam reprehenderit vitae nihil? Quisquam facilis aliquid reiciendis iure eaque dolores ipsam nesciunt, alias totam? Cum harum provident accusamus in accusantium, corrupti enim totam ad, tenetur maxime odio aliquid excepturi repellat quam dolore ipsam voluptatum voluptate error nostrum aliquam dolor eligendi fuga distinctio nihil? Ducimus et pariatur aspernatur a! Ex, fuga voluptatum inventore libero sint quisquam nostrum tempora iure molestiae voluptates sapiente dolore amet ipsa soluta ratione delectus voluptatem totam placeat quaerat. Quam, dolor pariatur non ab tenetur ipsum, at fuga, totam accusamus corporis repellat dolore cupiditate explicabo earum? Quae accusantium animi porro, perspiciatis iusto quisquam voluptatibus quasi maxime. Laudantium eum illum recusandae possimus excepturi esse ratione libero tempora, officiis delectus aut modi! Enim, voluptatem! Obcaecati libero explicabo quas eius aut sapiente blanditiis",
    author: "John Doe",
    image: null,
    authorEmail: "johndoe@example.com",
    type: "inspirational",
    createdAt: "2025-03-26",
    userId: getUserId.get("johndoe@example.com")
  },
  {
    id: 2,
    title: "Understanding TypeScript",
    content: "TypeScript enhances JavaScript by adding static types...",
    image: "https://example.com/typescript-guide.jpg",
    author: "Jane Smith",
    authorEmail: "janesmith@example.com",
    type: "success",
    createdAt: "2025-03-27",
    userId: getUserId.get("janesmith@example.com")
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
    userId: getUserId.get("seel@example.com") 
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
    userId: getUserId.get("admin@example.com")
  }
];

const insertPost = db.prepare(`
  INSERT INTO posts (title, content, image, author, authorEmail, type, createdAt, userId)
  VALUES (@title, @content, @image, @author, @authorEmail, @type, @createdAt, @userId)
`);

for (const post of fakePosts) {
  insertPost.run(post);
}


