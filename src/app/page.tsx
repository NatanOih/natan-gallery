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
        <div className="flex w-48 flex-col items-center gap-2 " key={image.id}>
          <div className="">{image.name}</div>
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
          <h1> {audio.name} </h1>
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
