import { db } from "@/db";
import { users } from "@/db/schema";

export async function GET() {
  await db.insert(users).values({
    username: "admin",
    password: "1234",
  });

  return Response.json({ message: "User added" });
}