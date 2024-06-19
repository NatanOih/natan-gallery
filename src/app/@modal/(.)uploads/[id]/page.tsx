import { FullPageImageView } from "~/app/common/full-image-page";

import { Modal } from "./modal";

export const dynamic = "force-dynamic";

export default function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  return (
    <>
      <Modal>
        <FullPageImageView id={imageId} />
      </Modal>
    </>
  );
}
