"use client";

import React, { useState } from "react";
import AddSectionModal from "./AddSectionModal";

type SectionAlignment = "left" | "right";

interface ProfileSection {
  id: number;
  heading: string;
  content: string;
  imageUrl: string;
  alignment: SectionAlignment;
}

export default function ProfileSections() {
  const [sections, setSections] = useState<ProfileSection[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddSection = (newSection: Omit<ProfileSection, "id">) => {
    setSections(prev => [...prev, { id: Date.now(), ...newSection }]);
    closeModal();
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:from-blue-700 hover:to-indigo-700"
        >
          إضافة قسم
        </button>
      </div>

      {sections.map(section => {
        const isImageLeft = section.alignment === "left";
        return (
          <div
            key={section.id}
            className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            {isImageLeft && (
              <div className="relative h-64 w-full">
                <img
                  src={section.imageUrl}
                  alt={section.heading}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-6 text-right flex flex-col justify-center">
              <h2 className="mb-2 text-xl font-bold text-gray-900 text-right">
                {section.heading}
              </h2>
              <p className="text-gray-600 text-right">{section.content}</p>
            </div>
            {!isImageLeft && (
              <div className="relative h-64 w-full order-first md:order-none">
                <img
                  src={section.imageUrl}
                  alt={section.heading}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        );
      })}

      <AddSectionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onAddSection={handleAddSection}
      />
    </div>
  );
}
