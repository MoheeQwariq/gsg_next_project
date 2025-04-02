"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import AddSectionModal from "./AddSectionModal";
import EditSectionModal from "./EditSectionModal";

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<ProfileSection | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openEditModal = (section: ProfileSection) => {
    setEditingSection(section);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingSection(null);
    setEditModalOpen(false);
  };

  const handleAddSection = (newSection: Omit<ProfileSection, "id">) => {
    setSections((prev) => [...prev, { id: Date.now(), ...newSection }]);
    closeModal();
  };

  const handleUpdateSection = (updated: {
    heading: string;
    content: string;
    imageUrl: string;
    alignment: "left" | "right";
  }) => {
    if (editingSection) {
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === editingSection.id ? { ...sec, ...updated } : sec
        )
      );
      closeEditModal();
    }
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

      {sections.map((section) => {
        const isImageLeft = section.alignment === "left";
        return (
          <div
            key={section.id}
            className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            {isImageLeft && (
              <div className="relative h-64 w-full">
                <Image
                  src={section.imageUrl}
                  alt={section.heading}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 text-right flex flex-col justify-center">
              <div className="flex flex-row-reverse items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(section)}
                  className="text-gray-500 hover:text-gray-700"
                  title="تعديل القسم"
                >
                  <FaPen className="w-5 h-5" />
                </button>
                <h2 className="mb-2 text-xl font-bold text-gray-900 text-right">
                  {section.heading}
                </h2>
              </div>
              <p className="text-gray-600 text-right">{section.content}</p>
            </div>

            {!isImageLeft && (
              <div className="relative h-64 w-full order-first md:order-none">
                <Image
                  src={section.imageUrl}
                  alt={section.heading}
                  fill
                  className="object-cover"
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

      {editingSection && (
        <EditSectionModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onSave={handleUpdateSection}
          currentData={{
            heading: editingSection.heading,
            content: editingSection.content,
            imageUrl: editingSection.imageUrl,
            alignment: editingSection.alignment,
          }}
        />
      )}
    </div>
  );
}
