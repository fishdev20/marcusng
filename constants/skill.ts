export type SkillCategory = "languages" | "frontend" | "ui" | "backend" | "devops" | "other";

export type Skills = {
  [key in SkillCategory]: string[];
};

export const skills: Skills = {
  languages: ["javascript", "typescript", "java", "go"],
  frontend: ["html", "css", "react", "nextjs", "redux", "zustand", "react query"],
  ui: ["tailwind css", "sass", "styled components", "mui", "ant design", "shadcn ui"],
  backend: ["node.js", "springboot", "firebase", "mongodb", "postgresql", "sqlite"],
  devops: ["docker", "aws", "git", "github", "gitlab", "ci/cd"],
  other: ["redis", "websocket"],
};
