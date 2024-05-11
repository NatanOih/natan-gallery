import { SignedOut, SignedIn } from "@clerk/nextjs";
import { Fragment } from "react";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Uploads() {
  const uploads = await db.query.uploads.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  const audioExtensions = [".mp3", ".wav", ".m4a", ".ogg", "wma"]; // Add more extensions as needed

  return (
    <div className="flex flex-wrap gap-4">
      {uploads.map((upload) => (
        <div
          key={upload.id}
          className="flex h-56 w-56 flex-col items-center justify-start gap-4  border-2 border-white p-2"
        >
          <p> {upload.name}</p>
          <p> uploaded by: {upload.userName}</p>
          {audioExtensions.some((ext) => upload.url.endsWith(ext)) ? (
            <audio className=" scale-[77%]" controls>
              <source src={upload.url} />
            </audio>
          ) : (
            <img src={upload.url} alt={upload.name} />
          )}
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="p-2">
      <SignedOut>
        <div className="h-full w-full p-4 text-center text-2xl">
          Please sign in
        </div>
      </SignedOut>

      <SignedIn>
        <Uploads />
      </SignedIn>
    </main>
  );
}
