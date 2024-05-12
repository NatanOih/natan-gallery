import { SignedOut, SignedIn } from "@clerk/nextjs";
import { UploadDropzoneClient } from "./_components/uploadClient";
import { getUploads } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Uploads() {
  const uploads = await getUploads();

  const audioExtensions = [".mp3", ".wav", ".m4a", ".ogg", "wma"]; // Add more extensions as needed

  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <div className="rounded-md border-[1px] border-dashed border-zinc-300 bg-zinc-900 ">
        <SignedIn>
          <UploadDropzoneClient />
        </SignedIn>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {[...uploads, ...uploads, ...uploads].map((upload) => (
          <div
            key={upload.id}
            className="flex h-60 w-60 flex-col items-center justify-start gap-1 overflow-hidden truncate  rounded-sm border-[1px] border-white p-2"
          >
            <p className="w-full  text-center"> {upload.name}</p>
            <p> uploaded by: {upload.userName}</p>
            {audioExtensions.some((ext) => upload.url.endsWith(ext)) ? (
              <audio
                className="translate-y-14 -rotate-[25deg] scale-[80%]"
                controls
              >
                <source src={upload.url} />
              </audio>
            ) : (
              <img
                className=" object-scale-down"
                src={upload.url}
                alt={upload.name}
              />
            )}
          </div>
        ))}
      </div>
    </section>
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
