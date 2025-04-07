"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPen, FaFacebook, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import ProfileEditModal from "./ProfileHeaderEditModal";
import profileHeaderStyles from "@/styles/profileHeader";
import { useTheme } from "@/context/ThemeContext";
import type { User } from "@/types/user";
import type { UserProfile } from "@/types/profile";
import { updateProfile } from "@/services/profile/profile.service";

interface IProps {
  isOwner: boolean;
  user: User;
  profile: UserProfile;
}

export default function ProfileHeader({ isOwner, user, profile }: IProps) {
  const { theme } = useTheme();
  const styles = profileHeaderStyles[theme];
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(profile);
  const [currentUser, setCurrentUser] = useState<User>(user);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleSave = async (updatedUser: User, updatedProfile: UserProfile) => {
    try {
      const newProfile = await updateProfile(updatedProfile.id, updatedProfile);
      setCurrentProfile(newProfile);
      setCurrentUser(updatedUser);
      closeEditModal();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.cover}>
        <Image
          src={currentProfile.coverUrl || "/blog-image.jpg"}
          alt="صورة الغلاف"
          fill
          className={styles.coverImage}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarContainer}>
            <Image
              src={currentUser.imageUrl || "/user.svg"}
              alt={currentUser.name}
              fill
              className={styles.avatarImage}
            />
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.headerRow}>
            {isOwner && (
              <button
                onClick={openEditModal}
                className={styles.editButton}
                title="تحرير الملف الشخصي"
              >
                <FaPen />
              </button>
            )}
            <h2 className={styles.name}>{currentUser.name}</h2>
          </div>

          <p className={styles.bio}>{currentProfile.bio}</p>

          {(currentProfile.phoneNumber || currentUser.email) && (
            <div className={styles.contactContainer}>
              {currentProfile.phoneNumber && (
                <div className={styles.contactRow}>
                  <FaPhone className="text-blue-500" />
                  <span>{currentProfile.phoneNumber}</span>
                </div>
              )}
              {currentUser.email && (
                <div className={styles.contactRow}>
                  <FaEnvelope className="text-green-500" />
                  <span>{currentUser.email}</span>
                </div>
              )}
            </div>
          )}

          {(currentProfile.facebookUrl || currentProfile.XUrl || currentProfile.linkedinUrl) && (
            <div className={styles.socialContainer}>
              {currentProfile.XUrl && (
                <a
                  href={currentProfile.XUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLinkX}
                  aria-label="X"
                >
                  <span className="font-bold">X</span>
                </a>
              )}
              {currentProfile.facebookUrl && (
                <a
                  href={currentProfile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLinkFacebook}
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              )}
              {currentProfile.linkedinUrl && (
                <a
                  href={currentProfile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLinkLinkedin}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <ProfileEditModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSave={handleSave}
        user={currentUser}
        profile={currentProfile}
        isOwner={isOwner}
      />
    </div>
  );
}
