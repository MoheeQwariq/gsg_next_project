"use client";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { ProfileSection } from "@/types/profile";
import profileSectionsStyles from "@/styles/profileSections";
import { useTheme } from "@/context/ThemeContext";

interface ProfileSectionItemProps {
  section: ProfileSection;
  onEdit: (section: ProfileSection) => void;
  onDelete: (section: ProfileSection) => void;
  isOwner: boolean;
}

const ProfileSectionItem: React.FC<ProfileSectionItemProps> = ({
  section,
  onEdit,
  onDelete,
 isOwner = false,
}) => {
  const { theme } = useTheme();
  const styles = profileSectionsStyles[theme];

  return (
    <div className={styles.sectionCard} dir="rtl">
      <div className={styles.sectionContent}>
        <div className={styles.sectionHeader}>
            {isOwner && (
                <>
                <button onClick={() => onEdit(section)} title="تعديل">
                    <FaEdit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => onDelete(section)} title="حذف">
                    <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
                </>
             )}
        </div>
        <h3 className={styles.sectionTitle}>{section.title}</h3>
        <p className={styles.sectionText}>{section.content}</p>
      </div>
    </div>
  );
};

export default ProfileSectionItem;
