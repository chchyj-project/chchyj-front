export interface ContainerProps {
  $islast?: boolean;
  isFirst?: boolean;
  bgColor?: string;
}

export interface IconProps {
  size?: string;
}

export type Article = {
  replyCount: number;
  content: string;
  createdAt: string;
  id: number;
  userId: number;
  nickname: string;
};

export type PageInfo = {
  totalCount: number;
  limit: number;
  offset: number;
};

export type ArticleResponse = {
  data: { list: Article[]; pageInfo: PageInfo };
};
