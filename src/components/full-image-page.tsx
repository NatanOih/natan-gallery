import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const idAsNum = Number(props.id);

  if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id");
  const image = await getImage(idAsNum);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center gap-20 ">
      <div className=" flex flex-1 items-center justify-center p-10">
        <img
          src={image.url}
          className=" max-h-[80vh]   rounded-lg border-2 border-black/25  object-contain p-2"
        />
      </div>
      <div className="flex h-full   flex-col gap-2 border-l">
        <div className=" w-full border-b p-2 text-center text-lg font-bold">
          {image.name}
        </div>

        <div className="flex w-full  flex-col p-2">
          <span className=""> Uploaded By: </span>{" "}
          <span className="px-2 capitalize"> {uploaderInfo.fullName}</span>{" "}
        </div>
        <div className="flex flex-col p-2">
          <span className=""> Uploaded At: </span>{" "}
          <span className="px-2 capitalize">
            {new Date(image.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
