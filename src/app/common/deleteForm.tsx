"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { deleteAction } from "~/server/actions";

export default function DeleteForm(props: { id: number }) {
  const router = useRouter();
  return (
    <form
      action={async () => {
        await deleteAction(props.id);
        router.back();
      }}
    >
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
}
