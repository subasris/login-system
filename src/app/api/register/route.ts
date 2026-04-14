import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (user.length === 0) {
    return Response.json({ message: "User not found" });
  }

  if (user[0].password !== password) {
    return Response.json({ message: "Wrong password" });
  }

  return Response.json({ message: "Login success" });
}