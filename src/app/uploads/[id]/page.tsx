import { FullPageImageView } from "~/app/common/full-image-page";

export default function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  return <FullPageImageView id={imageId} />;
}
