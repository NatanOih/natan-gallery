import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getUploads() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const uploads = await db.query.uploads.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return uploads;
}

export async function getImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unatuhorized");

  const image = await db.query.uploads.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  // if (image.userId !== user.userId)
  //   throw new Error("you cant see other`s pictures");

  return image;
}
