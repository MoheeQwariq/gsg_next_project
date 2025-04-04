"use client";

import { useState } from "react";
import type { ProfileSection } from "@/types/profile";

export default function useSections(initialSections: ProfileSection[]): {
  sections: ProfileSection[];
  addSection: (newSection: Omit<ProfileSection, "id">) => void;
  updateSection: (updated: ProfileSection) => void;
} {
  const [sections, setSections] = useState<ProfileSection[]>(initialSections);

  const addSection = (newSection: Omit<ProfileSection, "id">) => {
    setSections((prev) => [...prev, { id: Date.now(), ...newSection }]);
  };

  const updateSection = (updated: ProfileSection) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === updated.id ? updated : sec))
    );
  };

  return { sections, addSection, updateSection };
}
