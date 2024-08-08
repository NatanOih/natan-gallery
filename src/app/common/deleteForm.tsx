"use client";

import { SignedIn, useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { deleteAction } from "~/server/actions";

export type DeleteFormProps = {
  id: number;
  name: string;
  url: string;
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date | null;
};
export default function DeleteForm(image: DeleteFormProps) {
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <SignedIn>
      {image.userId == userId && (
        <form
          action={async () => {
            await deleteAction(image.id);
            router.back();
          }}
        >
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      )}
    </SignedIn>
  );
}
