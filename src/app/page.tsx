import { SignedOut, SignedIn } from "@clerk/nextjs";
import { UploadDropzoneClient } from "./_components/uploadClient";
import { getUploads } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Uploads() {
  const uploads = await getUploads();

  const audioExtensions = [".mp3", ".wav", ".m4a", ".ogg", "wma"]; // Add more extensions as needed

  return (
    <section className="flex flex-col items-center justify-center gap-10 p-4">
      <div className="cursor-pointer rounded-md border-[1px] border-dashed border-zinc-300 bg-zinc-900 transition hover:bg-white/90">
        <SignedIn>
          <UploadDropzoneClient />
        </SignedIn>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {[...uploads, ...uploads, ...uploads].map((upload, index) => (
          <div
            key={upload.id + "" + index}
            className="w-100 h-100 flex flex-col items-center justify-center gap-1 overflow-hidden rounded-sm border-[1px] border-white p-2 transition-all hover:border-zinc-500 hover:bg-white/90 hover:text-black"
          >
            <p className="max-w-40 truncate text-center"> {upload.name}</p>
            <p> uploaded by: {upload.userName}</p>
            {audioExtensions.some((ext) => upload.url.endsWith(ext)) ? (
              <div className="flex h-60 w-60 items-center justify-center">
                <audio
                  className=" rotate-[27deg] cursor-pointer rounded-md transition-all hover:bg-black hover:text-white "
                  controls
                >
                  <source src={upload.url} />
                </audio>
              </div>
            ) : (
              <Link
                className="flex h-60 w-60 items-center justify-center overflow-hidden border-2 border-black transition-all hover:scale-[102%]"
                scroll={false}
                href={`/uploads/${upload.id}`}
              >
                {/* <div className="flex h-60 w-60 items-center justify-center transition-all hover:scale-[102%]"> */}
                <Image
                  width={300}
                  height={300}
                  style={{ objectFit: "contain" }}
                  src={upload.url}
                  alt={upload.name}
                />
                {/* </div> */}
              </Link>
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
