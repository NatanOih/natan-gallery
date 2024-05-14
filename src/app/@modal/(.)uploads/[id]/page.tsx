import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(imageId);

  return (
    <Modal>
      <FullPageImageView id={idAsNum} />
    </Modal>
  );
}
