export type Reply = {
  id: number;
  createdAt: string;
  userId: number;
  userName: string;
  content: string;
  isLike: boolean;
};

export type ArticleDetail = {
  id: number;
  createdAt: string;
  userId: number;
  userName: string;
  content: string;
  replyList: Reply[];
};
