"use client";

import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";

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
export function UploadDropzoneClient() {
  const router = useRouter();
  return (
    <UploadDropzone
      config={{ appendOnPaste: true }}
      endpoint={"imageUploader"}
      onClientUploadComplete={() => {
        router.refresh();
      }}
    />
  );
}

export function SignInButtonClient() {
  return <SignInButton />;
}
