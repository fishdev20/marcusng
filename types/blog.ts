export interface IBlogCard {
  title: string;
  slug: string;
  date: string;
  author: {
    name: string;
  };
  categories: string;
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
  };
  categories: string;
  smallDesc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  headings: string[];
}
