"use client";

import { useState } from "react";
import ReservationModal from "./ReservationModal";

interface ReservationButtonProps {
  tourName: string;
  tourSlug?: string;
  variant?: "full" | "compact";
}

export default function ReservationButton({
  tourName,
  tourSlug,
  variant = "full"
}: ReservationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (variant === "compact") {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          Rezervasyon Yap
        </button>
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tourName={tourName}
          tourSlug={tourSlug}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        Rezervasyon Yap
      </button>
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourName={tourName}
        tourSlug={tourSlug}
      />
    </>
  );
}
