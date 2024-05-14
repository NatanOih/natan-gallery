import FullPageImageView from "~/components/full-image-page";

export default async function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(imageId);

  if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id");

  return <FullPageImageView id={idAsNum} />;
}
