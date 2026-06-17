export type Page = {
  name: string;
  to: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  authorId: number;
};
