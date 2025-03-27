import sqlite3 from "better-sqlite3";
const db = sqlite3("stories.db");

const getAllUsers = () => {
    const users = db.prepare(`SELECT * FROM users`).all();
    return users;
};

export { getAllUsers };
