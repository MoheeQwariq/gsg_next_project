"use client";
import React, { useState, useEffect } from "react";
import AddSectionModal from "./AddSectionModal";
import EditSectionModal from "./EditSectionModal";
import type { ProfileSection } from "@/types/profile";
import profileSectionsStyles from "@/styles/profileSections";
import ProfileSectionItem from "./ProfileSectionItem";
import { useTheme } from "@/context/ThemeContext";
import {
  getUserSections,
  addUserSection,
  updateProfileSection,
  deleteProfileSection,
} from "@/services/profile/sections.service";
import type { User } from "@/types/user";

interface ProfileSectionsProps {
  isOwner: boolean;
  user: User;
}

export default function ProfileSections({ isOwner, user }: ProfileSectionsProps) {
  const { theme } = useTheme();
  const styles = profileSectionsStyles[theme];

  const [sections, setSections] = useState<ProfileSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchSections() {
      try {
        const fetchedData = await getUserSections(user.id);
        const fetchedSections = Array.isArray(fetchedData)
          ? fetchedData
          : fetchedData ?? [];
        setSections(fetchedSections);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError( "حدث خطأ أثناء جلب الأقسام");
        } else {
          setError("حدث خطأ أثناء جلب الأقسام");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSections();
  }, [user.id]);

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

  const handleAddSection = async (newSection: Omit<ProfileSection, "id">) => {
    try {
      const savedSection = await addUserSection(user.id, newSection);
      setSections((prev) => [...prev, savedSection]);
    } catch (err) {
      console.error("Error adding section:", err);
    }
    closeModal();
  };

  const handleUpdateSection = async (updated: ProfileSection) => {
    try {
      const updatedSection = await updateProfileSection(
        user.id,
        updated.id,
        {
          title: updated.title,
          content: updated.content,
          imageUrl: updated.imageUrl || "",
          imageDirection: updated.imageDirection || "left",
        }
      );
      setSections((prev) =>
        prev.map((s) => (s.id === updatedSection.id ? updatedSection : s))
      );
    } catch (err) {
      console.error("Error updating section:", err);
    }
    closeEditModal();
  };

  const handleDeleteSection = async (section: ProfileSection) => {
    try {
      await deleteProfileSection(user.id, section.id);
      setSections((prev) => prev.filter((s) => s.id !== section.id));
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  return (
    <div className={styles.container} dir="rtl">
      {isOwner && (
        <div className={styles.addButtonWrapper}>
          <button onClick={openModal} className={styles.addButton}>
            إضافة قسم
          </button>
        </div>
      )}
      {loading && <p>جاري تحميل الأقسام...</p>}
      {error && <p className={styles.emptyMessage}>خطأ: {error}</p>}
      {sections && sections.map((section) => (
        <ProfileSectionItem
          key={section.id}
          section={section}
          isOwner={isOwner}
          onEdit={openEditModal}
          onDelete={handleDeleteSection}
        />
      ))}
      {isOwner && (
        <AddSectionModal
          isOpen={modalOpen}
          onClose={closeModal}
          onAddSection={handleAddSection}
          user={user}
        />
      )}
      {isOwner && editingSection && (
        <EditSectionModal
          user={user}
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
