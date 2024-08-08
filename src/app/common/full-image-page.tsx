import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";
import DeleteForm, { DeleteFormProps } from "./deleteForm";

export async function FullPageImageView(props: { id: string }) {
  const idAsNum = Number(props.id);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id");

  const image = (await getImage(idAsNum)) as DeleteFormProps;

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  if (!image || !uploaderInfo) return null;

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center gap-20 ">
      <div className=" flex flex-1 items-center justify-center p-10">
        <img
          src={image.url}
          className=" max-h-[80vh] max-w-[60vw]  rounded-lg border-2 border-black/25  object-contain p-2"
          alt={image.name}
        />
      </div>
      <div className="flex h-full flex-col items-center justify-start  gap-4 border-l p-2 px-6">
        <div className=" w-full border-b p-2 text-center text-lg font-bold">
          {image.name}
        </div>

        <div className="flex flex-col p-2">
          <span className=""> Uploaded By: </span>{" "}
          <span className=" capitalize"> {uploaderInfo.fullName}</span>{" "}
        </div>
        <div className="flex flex-col p-2">
          <span className=""> Uploaded At: </span>{" "}
          <span className=" capitalize">
            {new Date(image.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="p-2">
          <DeleteForm {...image} />
        </div>
      </div>
    </div>
  );
}
