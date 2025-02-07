export interface SocialMediaLinks {
    linkedin: string;
    lastfm: string;
    medium: string;
    github: string;
    twitter: string;
}

export interface Education {
    degree: string;
    field: string;
    institution: string;
    year: number;
}

export interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string;
}

export interface Publication {
    title: string;
    year: number;
    link: string;
}
