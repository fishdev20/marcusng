export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  excerpt?: string;
  recommendationDate?: string;
  linkedinUrl?: string;
  featured?: boolean;
  order?: number;
  avatar?: {
    url?: string;
    alt?: string;
  };
}
