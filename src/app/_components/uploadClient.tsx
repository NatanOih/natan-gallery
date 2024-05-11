"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { UploadButton } from "~/utils/uploadthing";

export default function UploadClient() {
  const router = useRouter();
  return (
    <UploadButton
      endpoint={"imageUploader"}
      onClientUploadComplete={() => {
        router.refresh();
      }}
    />
  );
}
