"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaPen,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import ProfileEditModal, { UserProfile } from "./ProfileEditModal";

type User = {
  id: number;
  name: string;
  bio: string;
  avatarUrl: string;
  coverUrl?: string;
  x?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  phone?: string;
  email?: string;
};

interface ProfileHeaderProps {
  user: User;
  isOwner?: boolean;
}

export default function ProfileHeader({
  user,
  isOwner = false,
}: ProfileHeaderProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserProfile>({
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    coverUrl: user.coverUrl,
    x: user.x,
    facebook: user.facebook,
    instagram: user.instagram,
    linkedin: user.linkedin,
    phone: user.phone,
    email: user.email,
  });

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleSave = (updatedData: UserProfile) => {
    setUserData(updatedData);
    setEditModalOpen(false);
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      dir="rtl"
    >
      {userData.coverUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={userData.coverUrl}
            alt="صورة الغلاف"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="relative p-6">
        <div className="absolute -top-12 right-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md">
            <Image
              src={userData.avatarUrl}
              alt={userData.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-12 text-right">
          <div className="flex flex-row-reverse items-center justify-end gap-2">
            {isOwner && (
              <button
                onClick={openEditModal}
                className="text-gray-500 hover:text-gray-700"
                title="تحرير الملف الشخصي"
              >
                <FaPen />
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              {userData.name}
            </h2>
          </div>

          <p className="mt-2 text-gray-600 text-right">{userData.bio}</p>

          {(userData.phone || userData.email) && (
            <div className="mt-4 flex flex-col  justify-end gap-4 text-sm text-gray-500">
              {userData.phone && (
                <div className="flex   justify-first  items-center gap-1">
                  <FaPhone className="text-blue-500" />
                  <span>{userData.phone}</span>
                </div>
              )}
              {userData.email && (
                <div className="flex items-center gap-1">
                  <FaEnvelope className="text-green-500" />
                  <span>{userData.email}</span>
                </div>
              )}
            </div>
          )}

          {(userData.x ||
            userData.facebook ||
            userData.instagram ||
            userData.linkedin) && (
            <div className="mt-4 flex flex-row-reverse items-center justify-start gap-4 text-xl text-gray-400">
              {userData.x && (
                <a
                  href={userData.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                  aria-label="X"
                >
                  <span className="font-bold">X</span>
                </a>
              )}
              {userData.facebook && (
                <a
                  href={userData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              )}
              {userData.instagram && (
                <a
                  href={userData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              )}
              {userData.linkedin && (
                <a
                  href={userData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
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
        currentData={userData}
      />
    </div>
  );
}
