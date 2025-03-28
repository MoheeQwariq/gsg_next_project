import React from "react";
import Comment from "./Comment";

const Comments = () => {
  return (
    <div className="mx-auto mt-8 max-w-6xl rounded-xl bg-white p-6 shadow-sm md:p-8">
      <h3 className="mb-6 text-2xl font-bold text-gray-900">التعليقات </h3>

      <div className="mb-8 rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col gap-4">
          <textarea
            placeholder="أضف تعليقك..."
            className="min-h-24 w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:from-blue-700 hover:to-indigo-700 cursor-pointer">
              إضافة التعليق
            </button>
          </div>
        </div>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;
