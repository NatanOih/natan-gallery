import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getUploads() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const uploads = await db.query.uploads.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return uploads;
}
