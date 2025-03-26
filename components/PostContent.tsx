'use client';
import { useState } from "react";

interface PostContentProps {
    content: string;
    postId: number;
}

const PostContent: React.FC<PostContentProps> = ({ content, postId }) => {
    const [expandedPost, setExpandedPost] = useState<number | null>(null);

    const handleToggleContent = (postId: number) => {
        setExpandedPost(expandedPost === postId ? null : postId);
    };

    return (
        <div>
            <p>
                {expandedPost === postId ? content : `${content.slice(0, 100)}...`}
            </p>
            <button onClick={() => handleToggleContent(postId)}>
                {expandedPost === postId ? 'Show Less' : 'Read More'}
            </button>
        </div>
    );
};

export default PostContent;
