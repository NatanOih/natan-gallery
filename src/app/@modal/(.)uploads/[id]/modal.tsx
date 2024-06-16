"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";

type IconProps = {
  name: string;
  alt: string;
};

export function Icon({ name, alt }: IconProps) {
  return <Image src={`/${name}.png`} alt={alt} width="44" height="44" />;
}

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="  m-0 h-screen w-screen bg-black/90 text-white"
      onClose={onDismiss}
    >
      <button
        className="absolute  left-[2%] top-[2%]  rounded-md border-[1px] border-black bg-white/80 p-2 transition-all hover:invert "
        onClick={onDismiss}
      >
        {" "}
        <Icon name={"exit"} alt="exit" />{" "}
      </button>

      {children}
    </dialog>,

    document.getElementById("modal-root")!,
  );
}
