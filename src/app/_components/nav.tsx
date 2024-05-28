import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import UploadClient, { UploadDropzoneClient } from "./uploadClient";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-black p-2 px-4  font-semibold text-white">
      <Link className="text-4xl hover:text-white/80" href="/">
        Gallery
      </Link>
      <div className="flex flex-row items-center justify-center gap-6  rounded-lg  bg-white  p-2 px-4 text-black">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadClient />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
