export interface IBlogCategory {
  title: string;
}

export interface IBlogHeading {
  _key: string;
  style: string;
  children?: Array<{
    text?: string;
  }>;
}

export interface IBlogCard {
  title: string;
  slug: string;
  date: string;
  author: {
    name: string;
  } | null;
  categories: IBlogCategory[];
  smallDesc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
}

export interface IBlogArticle {
  title: string;
  slug: string;
  date: string;
  author: {
    name: string;
  } | null;
  categories: IBlogCategory[];
  smallDesc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  headings: IBlogHeading[];
}
