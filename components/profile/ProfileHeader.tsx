"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPen, FaFacebook, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import ProfileEditModal from "./ProfileHeaderEditModal";
import profileHeaderStyles from "@/styles/profileHeader";
import { useAuth } from "@/context/AuthContext";

interface IProps {
  isOwner: boolean;
}

export default function ProfileHeader({ isOwner }: IProps) {
  const { user, profile } = useAuth();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const handleSave = (updatedData: typeof profile) => {
    closeEditModal();
  };

  return (
    <div className={profileHeaderStyles.container} dir="rtl">
      <div className={profileHeaderStyles.cover}>
        <Image
          src={profile.coverUrl || "/blog-image.jpg"}
          alt="صورة الغلاف"
          fill
          className={profileHeaderStyles.coverImage}
        />
      </div>

      <div className={profileHeaderStyles.content}>
        <div className={profileHeaderStyles.avatarWrapper}>
          <div className={profileHeaderStyles.avatarContainer}>
            <Image
              src={user.imageUrl || "/user.svg"}
              alt={user.name}
              fill
              className={profileHeaderStyles.avatarImage}
            />
          </div>
        </div>
        <div className={profileHeaderStyles.infoContainer}>
          <div className={profileHeaderStyles.headerRow}>
            {isOwner && (
              <button
                onClick={openEditModal}
                className={profileHeaderStyles.editButton}
                title="تحرير الملف الشخصي"
              >
                <FaPen />
              </button>
            )}
            <h2 className={profileHeaderStyles.name}>{user.name}</h2>
          </div>

          <p className={profileHeaderStyles.bio}>{profile.bio}</p>

          {(profile.phoneNumber || user.email) && (
            <div className={profileHeaderStyles.contactContainer}>
              {profile.phoneNumber && (
                <div className={profileHeaderStyles.contactRow}>
                  <FaPhone className="text-blue-500" />
                  <span>{profile.phoneNumber}</span>
                </div>
              )}
              {user.email && (
                <div className={profileHeaderStyles.contactRow}>
                  <FaEnvelope className="text-green-500" />
                  <span>{user.email}</span>
                </div>
              )}
            </div>
          )}

          {(profile.facebookUrl || profile.XUrl || profile.linkedinUrl) && (
            <div className={profileHeaderStyles.socialContainer}>
              {profile.XUrl && (
                <a
                  href={profile.XUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={profileHeaderStyles.socialLinkX}
                  aria-label="X"
                >
                  <span className="font-bold">X</span>
                </a>
              )}
              {profile.facebookUrl && (
                <a
                  href={profile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={profileHeaderStyles.socialLinkFacebook}
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={profileHeaderStyles.socialLinkLinkedin}
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
        currentData={profile}
      />
    </div>
  );
}
