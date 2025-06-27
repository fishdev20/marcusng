import calenview2 from "@/assets/images/projects/calenview2.png";
import kassavirtanen from "@/assets/images/projects/kassavirtanen.png";
import logset1 from "@/assets/images/projects/logset1.png";
import logset2 from "@/assets/images/projects/logset2.png";
import omakala1 from "@/assets/images/projects/omakala1.png";
import omakala2 from "@/assets/images/projects/omakala2.png";
import talousvirta from "@/assets/images/projects/talousvirta.png";
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    name: "Logset maps",
    type: "Featured",
    role: "Full-stack Engineer",
    desc: "Logset Maps is a desktop application developed to assist forwarder operators in visualizing, planning, and reporting timber harvesting operations in forests.",
    github: "",
    stack: [
      "electron",
      "react",
      "zustand",
      "mui",
      "openLayer",
      "tailwindcss",
      "typescript",
      "sqlite",
      "prisma",
      "websocket",
      "redis",
      "rust",
      "window",
      "docker",
      "gitlab",
    ],
    images: [logset1, logset2],
  },
  {
    name: "Omakala",
    type: "Featured",
    role: "Full-stack Engineer",
    desc: "Omakala is a cross-platform mobile and web application designed to support recreational fishers in Finland by providing real-time catch reporting, fishing licenses, and location tracking.",
    github: "",
    url: "https://omakala.fi/",
    stack: [
      "react",
      "react native",
      "expo",
      "redux",
      "mui",
      "typescript",
      "openLayer",
      "postgreSQL",
      "java",
      "springboot",
      "azure",
      "docker",
      "k8s",
      "gitlab",
    ],
    images: [omakala1, omakala2],
  },
  {
    name: "Talousvirta",
    type: "Featured",
    desc: "Free and simple invoicing solution for companies.",
    github: "",
    stack: ["react", "javascript", "mui", ".net", "c++", "azure", "github", "redux"],
    images: [talousvirta],
  },
  {
    name: "Kassavirtanen",
    type: "Featured",
    desc: "Free and simple invoicing solution for small business",
    github: "",
    stack: ["react", "javascript", "mui", ".net", "c++", "azure", "github", "redux"],
    images: [kassavirtanen],
  },
  {
    name: "Calenview",
    type: "Featured",
    desc: "Calenview is a powerful calendar and scheduling tool designed for educational institutions and organizations. It streamlines planning with a visual interface, supports custom views, and enables efficient event coordination across teams and departments.",
    github: "",
    stack: ["react", "nodejs", "firebase", "antdesign", "mui", "googlecloud"],
    images: [calenview2],
  },
];
