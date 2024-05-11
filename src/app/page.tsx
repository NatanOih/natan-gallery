import { SignedOut, SignedIn } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div
          className="flex w-56 flex-col items-center gap-2 p-1"
          key={image.id}
        >
          <div className="text-center text-sm">
            {image.name} uploaded by: {image.userName}
          </div>
          <img alt="image" className="" src={image.url} />
        </div>
      ))}
    </div>
  );
}

async function Audios() {
  const audios = await db.query.audios.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4">
      {audios.map((audio) => (
        <div
          className=" flex flex-col items-center justify-center p-2"
          key={audio.id}
        >
          <div className=" text-sm">
            name: {audio.name} uploaded by: {audio.userName}{" "}
          </div>
          <audio controls>
            <source src={audio.url} />
          </audio>
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
        <Images />
        <Audios />
      </SignedIn>
    </main>
  );
}
