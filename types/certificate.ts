export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  featured?: boolean;
  order?: number;
  issuerLogo?: {
    url?: string;
    alt?: string;
  };
}
