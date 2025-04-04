"use client";

import React, { useState } from "react";
import AddSectionModal from "./AddSectionModal";
import EditSectionModal from "./EditSectionModal";
import type { UserProfile, ProfileSection } from "@/types/profile";
import profileSectionsStyles from "@/styles/profileSections";
import useSections from "@/hooks/useSections";
import SectionItem from "./SectionItem";
interface IProps {
  profile: UserProfile;
}

export default function ProfileSections({ profile }: IProps) {
  const initialSections: ProfileSection[] = profile.sections || [];
  const { sections, addSection, updateSection } = useSections(initialSections);

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
    addSection(newSection);
    closeModal();
  };

  const handleUpdateSection = (updated: ProfileSection) => {
    updateSection(updated);
    closeEditModal();
  };

  return (
    <div className={profileSectionsStyles.container} dir="rtl">
      <div className={profileSectionsStyles.addButtonWrapper}>
        <button onClick={openModal} className={profileSectionsStyles.addButton}>
          إضافة قسم
        </button>
      </div>

      {sections.map((section) => (
        <SectionItem key={section.id} section={section} onEdit={openEditModal} />
      ))}

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
            id: editingSection.id,
            title: editingSection.title,
            content: editingSection.content,
            imageUrl: editingSection.imageUrl || "",
            imageDirection: editingSection.imageDirection || "left",
          }}
        />
      )}
    </div>
  );
}
