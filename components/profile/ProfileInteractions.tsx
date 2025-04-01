import React from "react";

type Interaction = {
  id: number;
  type: string; 
  content?: string;
  articleId: number;
};

interface ProfileInteractionsProps {
  interactions: Interaction[];
}

export default function ProfileInteractions({
  interactions,
}: ProfileInteractionsProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">التفاعلات الأخيرة</h3>
      <ul className="space-y-3 text-gray-700">
        {interactions.map((interaction) => (
          <li key={interaction.id}>
            {interaction.type === "comment" ? (
              <>
                <span className="font-medium">
                  علق على المقال رقم {interaction.articleId}:
                </span>{" "}
                {interaction.content}
              </>
            ) : interaction.type === "like" ? (
              <span className="font-medium">
                أعجب بالمقال رقم {interaction.articleId}
              </span>
            ) : (
              <span>{interaction.type}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
