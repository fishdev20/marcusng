export interface Profile {
  _id: string;
  fullName: string;
  headline?: string;
  currentCompany: string;
  currentCompanyLink: string;
  profileImage?: {
    alt?: string;
    url?: string;
  };
  shortBio?: string;
  location?: string;
  fullBio?: any[];
  email?: string;
  resumeURL?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    twitch?: string;
  };
  skills?: string[];
}
