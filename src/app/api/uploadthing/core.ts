import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { uploads } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" }, audio: {} })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
      /* @ts-expect-error כככ */
      const response = await clerkClient.users.getUser(user.userId);

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, firstName: response.firstName };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("metadata", metadata);
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      await db.insert(uploads).values({
        /* @ts-expect-error כככ */
        name: file.name,
        url: file.url,
        userId: metadata.userId,
        userName: metadata.firstName,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
