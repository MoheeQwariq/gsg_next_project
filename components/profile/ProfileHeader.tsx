"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPen, FaFacebook, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import ProfileEditModal from "./ProfileHeaderEditModal";
import type { UserProfile } from "@/types/profile";
import profileHeaderStyles from "@/styles/profileHeader";

interface IProps {
  profile: UserProfile;
  isOwner: boolean;
}

export default function ProfileHeader({ profile, isOwner = false }: IProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>(profile);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleSave = (updatedData: UserProfile) => {
    setProfileData(updatedData);
    setEditModalOpen(false);
  };

  return (
    <div className={profileHeaderStyles.container} dir="rtl">
      <div className={profileHeaderStyles.cover}>
        <Image
          src={profileData.coverUrl || "/blog-image.jpg"}
          alt="صورة الغلاف"
          fill
          className={profileHeaderStyles.coverImage}
        />
      </div>
      
      <div className={profileHeaderStyles.content}>
        <div className={profileHeaderStyles.avatarWrapper}>
          <div className={profileHeaderStyles.avatarContainer}>
            <Image
              src={profileData.avatarUrl || "/user.svg"}
              alt={profileData.user.name}
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
            <h2 className={profileHeaderStyles.name}>
              {profileData.user.name}
            </h2>
          </div>

          <p className={profileHeaderStyles.bio}>{profileData.bio}</p>

          {(profileData.phoneNumber || profileData.user.email) && (
            <div className={profileHeaderStyles.contactContainer}>
              {profileData.phoneNumber && (
                <div className={profileHeaderStyles.contactRow}>
                  <FaPhone className="text-blue-500" />
                  <span>{profileData.phoneNumber}</span>
                </div>
              )}
              {profileData.user.email && (
                <div className={profileHeaderStyles.contactRow}>
                  <FaEnvelope className="text-green-500" />
                  <span>{profileData.user.email}</span>
                </div>
              )}
            </div>
          )}

          {(profileData.XUrl ||
            profileData.facebookUrl ||
            profileData.linkedinUrl) && (
            <div className={profileHeaderStyles.socialContainer}>
              {profileData.XUrl && (
                <a
                  href={profileData.XUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={profileHeaderStyles.socialLinkX}
                  aria-label="X"
                >
                  <span className="font-bold">X</span>
                </a>
              )}
              {profileData.facebookUrl && (
                <a
                  href={profileData.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={profileHeaderStyles.socialLinkFacebook}
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              )}
              {profileData.linkedinUrl && (
                <a
                  href={profileData.linkedinUrl}
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
        currentData={profileData}
      />
    </div>
  );
}
