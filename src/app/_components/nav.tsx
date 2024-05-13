import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import UploadClient, { UploadDropzoneClient } from "./uploadClient";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-black p-2 text-xl font-semibold text-white">
      <Link href="/">Gallery</Link>
      <div className="flex flex-row items-center justify-center gap-10  rounded-lg  bg-white  p-1 text-black">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {/* <UploadDropzoneClient /> */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
