export interface ContainerProps {
  isLast?: boolean;
  isFirst?: boolean;
  bgColor?: string;
}

export interface IconProps {
  size?: string;
}

export type Article = {
  commentCount: number;
  content: string;
  createdAt: string;
  id: number;
  userId: number;
  userName: string;
};

export type PageInfo = {
  totalCount: number;
  limit: number;
  offset: number;
};

export type ArticleResponse = {
  list: Article[];
  pageInfo: PageInfo;
};
