import calenview1 from "@/assets/images/projects/calenview1.png";
import calenview2 from "@/assets/images/projects/calenview2.png";
import calenview3 from "@/assets/images/projects/calenview3.png";
import calenview4 from "@/assets/images/projects/calenview4.png";
import kassavirtanen from "@/assets/images/projects/kassavirtanen.png";
import logset1 from "@/assets/images/projects/logset1.png";
import logset2 from "@/assets/images/projects/logset2.png";
import omakala1 from "@/assets/images/projects/omakala1.png";
import omakala2 from "@/assets/images/projects/omakala2.png";
import talousvirta from "@/assets/images/projects/talousvirta.png";
import { ExperienceItem } from "../app/components/experience/ExperienceContent";

export const experienceData: ExperienceItem[] = [
  {
    duration: "Nov, 2022 - Present",
    role: "Software Engineer",
    companyName: "Triona Oy",
    companyUrl: "https://www.triona.fi/",
    companyLogo:
      "https://media.licdn.com/dms/image/v2/C4D0BAQFuBcg1EBKA6Q/company-logo_200_200/company-logo_200_200/0/1631306613470?e=1756339200&v=beta&t=9lmjw1NmmkJWfuUdR4NkyyhuwJ2tBsWYJsEm74DG2EE",
    highlights: [
      "Led frontend development of a desktop app for forwarders to optimize wood harvesting.",
      "Led performance audits and optimization on low-end hardware.",
      "Reduced bundle size and improved FCP using dynamic imports and code-splitting.",
      "Familiar with OpenLayers performance tuning and map layer management.",
    ],
    images: [omakala1, omakala2, logset1, logset2],
  },
  {
    duration: "Mar, 2022 - Nov, 2022",
    role: "Frontend Engineer",
    companyName: "Kassavirtanen Oy",
    companyUrl: "https://www.kassavirtanen.fi/en/",
    companyLogo:
      "https://media.licdn.com/dms/image/v2/D560BAQH9vgDeTx4_7w/company-logo_200_200/B56ZYaTXLmGcAI-/0/1744198005967/kassavirtanen_logo?e=1756339200&v=beta&t=AmOr1It-cZZQYt90TNugtpear1elX9HBOlypNUXwSjY",
    highlights: [
      "Developed highly intuitive and responsive billing and invoicing services dashboard.",
      "Diagnosed and resolved complex bugs, improving app stability.",
      "Refactored and optimized internal projects for maintainability.",
      "Collaborated with C#/.NET teams to deliver robust web solutions.",
    ],
    images: [kassavirtanen, talousvirta],
  },
  {
    duration: "Sep, 2021 - Apr, 2022",
    role: "Web Developer",
    companyName: "Classfunc Softwares",
    companyUrl: "https://classfunc.com/",
    companyLogo: "https://avatars.githubusercontent.com/u/42835289?s=200&v=4",
    highlights: [
      "Developed high-quality UI components for streaming and calendar tools.",
      "Integrated frontend with backend systems to improve UX and performance.",
      "Resolved critical bugs and enhanced feature stability.",
      "Worked directly with Japanese clients to translate requirements.",
    ],
    images: [calenview1, calenview2, calenview3, calenview4],
  },
];
