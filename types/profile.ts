import { Identifier } from './../node_modules/@types/estree/index.d';
import { User } from "./user";

export interface UserProfile{
    sections: never[];
    id: number;
    user: User;

    bio?: string;
    avatarUrl?: string;
    coverUrl?: string;
    facebookUrl?: string;
    XUrl?: string;
    linkedinUrl?: string;
    phoneNumber?: string;
    website?: string;
    country?: string;
    city?: string;
    birthdate?: string;

    followersCount?: number;
    articlesCount?: number;
    starsCount?: number;
    commentsCount?: number;
    isFollowing?: boolean;

    showStats?: boolean;
    showInteractions?: boolean;
}

export interface ProfileSection {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;   
    imageDirection?: "left" | "right"; 
}