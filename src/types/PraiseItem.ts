export type Reply = {
  id: number;
  createdAt: string;
  userId: number;
  nickname: string;
  content: string;
  isLike: boolean;
  canDelete: boolean;
};

export type ArticleDetail = {
  id: number;
  createdAt: string;
  userId: number;
  nickname: string;
  content: string;
  replyList: Reply[];
};

export type ScrollAwareBottomButtonProps = {
  visible: boolean;
};
