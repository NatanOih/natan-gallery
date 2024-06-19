"use server";

import { redirect } from "next/navigation";
import { deleteImage } from "./queries";
import { revalidatePath } from "next/cache";

export async function deleteAction(idAsNum: number) {
  await deleteImage(idAsNum);
  revalidatePath("/");
  // redirect("/");
  return 1;
}
