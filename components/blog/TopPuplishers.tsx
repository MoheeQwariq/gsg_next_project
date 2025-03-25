import React from "react";
import TopPublisher from "./TopPuplisher";

const TopPuplishers = () => {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900">
        أفضل الناشرين
      </h3>
      <div className="space-y-4">
        <TopPublisher name="فيصل أبو زكري" articles={12} followers={256} />
        <TopPublisher name="محيي الدين" articles={8} followers={189} />
        <TopPublisher name=" لمى" articles={15} followers={342} />
      </div>
    </div>
  );
};

export default TopPuplishers;
