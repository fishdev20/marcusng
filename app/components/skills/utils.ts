import { IconType } from "react-icons";
import {
  SiAntdesign,
  SiCss3,
  SiDocker,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiSass,
  SiSpring,
  SiSqlite,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { FaAws, FaJava } from "react-icons/fa";

export const getSkillIcon = (skill: string): IconType | null => {
  const map: Record<string, IconType> = {
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    Java: FaJava,
    Go: SiGo,
    HTML: SiHtml5,
    CSS: SiCss3,
    React: SiReact,
    "Next.js": SiNextdotjs,
    Redux: SiRedux,
    "React Query": SiReactquery,
    "Tailwind CSS": SiTailwindcss,
    SASS: SiSass,
    "Styled Components": SiStyledcomponents,
    MUI: SiMui,
    "Ant Design": SiAntdesign,
    "Node.js": SiNodedotjs,
    Springboot: SiSpring,
    Firebase: SiFirebase,
    MongoDB: SiMongodb,
    PostgreSQL: SiPostgresql,
    SQLite: SiSqlite,
    Docker: SiDocker,
    AWS: FaAws,
    Git: SiGit,
    GitHub: SiGithub,
    GitLab: SiGitlab,
    Redis: SiRedis,
  };

  return map[skill] || null;
};
