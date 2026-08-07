export interface Technology {
  _key?: string;
  name: string;
  /** An Iconify identifier, such as `devicon:react`. */
  icon?: string;
}

export interface SkillGroup {
  _id: string;
  name: string;
  items: Technology[];
  order?: number;
}
