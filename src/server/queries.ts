import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { uploads } from "./db/schema";
import { and, eq } from "drizzle-orm";

export async function getUploads() {
  const uploads = await db.query.uploads.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return uploads;
}

export async function getImage(id: number) {
  // const user = auth();

  // if (!user.userId) throw new Error("Unatuhorized");

  const image = await db.query.uploads.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  // if (image.userId !== user.userId)
  //   throw new Error("you cant see other`s pictures");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unatuhorized");

  await db
    .delete(uploads)
    .where(and(eq(uploads.id, id), eq(uploads.userId, user.userId)));

  return 1;
}
