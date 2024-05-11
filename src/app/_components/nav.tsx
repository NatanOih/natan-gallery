import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import UploadClient from "./uploadClient";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <div className="flex flex-row items-center justify-center gap-4 rounded-2xl bg-white  p-2">
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
