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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  education?: {
    school: string;
    logo?: { url?: string; alt?: string };
    degree?: string;
    major?: string;
    years?: string;
    location?: string;
    details?: string;
  }[];
}
