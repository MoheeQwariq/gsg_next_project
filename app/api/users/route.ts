import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from "better-sqlite3";
const db = sqlite3("stories.db");
export async function GET(req: NextRequest) {
  try {
    const users = db.prepare(`SELECT * FROM users`).all() as Stories.User[];
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search')?.toLowerCase() || '';
    const filter = searchParams.get('filter')?.toLowerCase() || '';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '5');

    let filteredUsers = users.filter((user: Stories.User) => {
      const matchSearch = user.name.toLowerCase().includes(search) ||
        (user.email.toLowerCase().includes(search) || false);

      const matchFilter = filter ?
        (user.role.toLowerCase() === filter) :
        true;

      return matchSearch && matchFilter;
    });


    const start = (page - 1) * perPage;
    const paginatedUsers = filteredUsers.slice(start, start + perPage);

    return NextResponse.json({
      total: filteredUsers.length,
      page,
      data: paginatedUsers,
      description: "User data",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب بيانات المستخدمين" },
      { status: 500 }
    );
  }
}
