export interface UserProfile{
    id: number;
    userId: number;

    bio?: string;
    coverUrl?: string ;
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


export const defaultUserProfile: UserProfile = {
    id: 0,
    userId: 0,
    bio: "",
    coverUrl: "",
    facebookUrl: "",
    XUrl: "",
    linkedinUrl: "",
    phoneNumber: "",
    website: "",
    country: "",
    city: "",
    birthdate: "",
    followersCount: 0,
    articlesCount: 0,
    starsCount: 0,
    commentsCount: 0,
    isFollowing: false,
    showStats: false,
    showInteractions: false,

};
export interface ProfileSection {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;   
    imageDirection?: "left" | "right"; 
}