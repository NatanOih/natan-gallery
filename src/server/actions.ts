"use server";

import { deleteImage } from "./queries";
import { revalidatePath } from "next/cache";

export async function deleteAction(idAsNum: number) {
  await deleteImage(idAsNum);
  revalidatePath("/");
  // redirect("/");
  return 1;
}
