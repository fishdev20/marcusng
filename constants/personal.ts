type Url = `${"http" | "https"}://${string}`;
type Email = `${string}@${string}.${string}`;
type PhoneNumber = `+${number}${string}`;

export type PersonalInfo = {
  name: string;
  role: string;
  company: {
    name: string;
    url: Url;
  };
  location: string;
  github: Url;
  linkedIn: Url;
  email: Email;
  phone: PhoneNumber;
};

export const personal: PersonalInfo = {
  name: "Minh (Marcus) Nguyen",
  role: "Software Engineer",
  company: {
    name: "Triona Oy",
    url: "https://triona.fi/",
  },
  location: "Finland",
  github: "https://github.com/fishdev20",
  linkedIn: "https://www.linkedin.com/in/minh-nguyen20/",
  email: "minhnguyen.dev20@gmail.com",
  phone: "+358 449824682",
};
