export type SkillCategory = "languages" | "frontend" | "ui" | "backend" | "devops" | "other";

export type Skills = {
  [key in SkillCategory]: string[];
};

export const skills = {
  languages: ["JavaScript", "TypeScript", "Java", "Go"],
  frontend: ["HTML", "CSS", "React", "Next.js", "Redux", "Zustand", "React Query"],
  ui: ["Tailwind CSS", "SASS", "Styled Components", "MUI", "Ant Design", "Shadcn UI"],
  backend: ["Node.js", "Springboot", "Firebase", "MongoDB", "PostgreSQL", "SQLite"],
  devops: ["Docker", "AWS", "Git", "GitHub", "GitLab", "CI/CD"],
  other: ["Redis", "Websocket"],
};
