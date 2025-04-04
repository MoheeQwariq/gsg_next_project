"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import type { UserProfile, ProfileSection } from "@/types/profile";
import profileSectionsStyles from "@/styles/profileSections";

interface SectionItemProps {
    section: ProfileSection;
    onEdit: (section: ProfileSection) => void;
  }
  
  const SectionItem: React.FC<SectionItemProps> = ({ section, onEdit }) => {
    const isImageLeft = section.imageDirection === "left";
  
    return (
      <div className={profileSectionsStyles.sectionCard}>
        {isImageLeft && section.imageUrl && (
          <div className={profileSectionsStyles.sectionImage}>
            <Image
              src={section.imageUrl}
              alt={section.title}
              fill
              className="object-cover"
            />
          </div>
        )}
  
        <div className={profileSectionsStyles.sectionContent}>
          <div className={profileSectionsStyles.sectionHeader}>
            <button
              onClick={() => onEdit(section)}
              className="text-gray-500 hover:text-gray-700"
              title="تعديل القسم"
            >
              <FaPen className="w-5 h-5" />
            </button>
            <h2 className={profileSectionsStyles.sectionTitle}>{section.title}</h2>
          </div>
          <p className={profileSectionsStyles.sectionText}>{section.content}</p>
        </div>
  
        {!isImageLeft && section.imageUrl && (
          <div className={`${profileSectionsStyles.sectionImage} order-first md:order-none`}>
            <Image
              src={section.imageUrl}
              alt={section.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    );
    };
  
  export default SectionItem;
  