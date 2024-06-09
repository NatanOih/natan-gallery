/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Link from "next/link";

import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-neutral-900  px-4 font-semibold text-white">
      <Link className="text-4xl hover:text-white/80" href="/">
        Gallery
      </Link>
      <div className="flex flex-row items-center justify-center gap-8  rounded-lg  px-4 text-white">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <div className="flex items-center justify-center rounded-lg bg-blue-200 p-1 opacity-30 transition-all hover:bg-white ">
            <UserButton appearance={{ baseTheme: dark }} />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
