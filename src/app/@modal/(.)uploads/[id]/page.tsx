import { getImage } from "~/server/queries";

export default async function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(imageId);

  if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id");
  const image = await getImage(idAsNum);
  return (
    <div>
      {" "}
      <img src={image.url} className="h-96 w-96" />{" "}
    </div>
  );
}
