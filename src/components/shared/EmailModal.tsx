"use client";

import { useEffect, useCallback } from "react";
import { EmailCapture } from "./EmailCapture";
import { BracketLabel } from "./BracketLabel";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  source: string;
}

export function EmailModal({
  isOpen,
  onClose,
  title,
  description,
  source,
}: EmailModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative glass rounded-sm p-8 md:p-12 max-w-lg w-full animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-sm cursor-pointer"
        >
          [ESC]
        </button>

        <BracketLabel text="UNLOCK" className="mb-6 block" />
        <h3 className="text-lg md:text-xl font-light text-white uppercase tracking-wide mb-3">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-8">
          {description}
        </p>

        <EmailCapture
          source={source}
          placeholder="Your work email"
          buttonText="Unlock Content"
        />
      </div>
    </div>
  );
}
