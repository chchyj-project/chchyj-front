export interface Reply {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  isLike: boolean;
  canDelete: boolean;
  likeCount: number;
}

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
