export interface Reply {
  canRecommend: boolean | undefined;
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
  canRecommend: boolean;
  canDelete: boolean;
};

export type ScrollAwareBottomButtonProps = {
  visible: boolean;
};
