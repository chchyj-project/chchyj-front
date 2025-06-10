// useArticleStore.ts - 페이지네이션 기능 추가

import { create } from 'zustand';
import { axiosInstance } from '../api/axiosConfig.ts';

// 게시글 타입 정의 (프로젝트에 맞게 조정해야 합니다)
export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replyCount: number;
  userId: number;
  nickname: string;
  // 기타 필요한 필드들
}

export interface MyArticle {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  replyCount: number;
  userId: number;
}

export interface MyArticleResponse {
  list: MyArticle[];
  pageInfo: {
    totalCount: number;
    limit: number;
    offset: number;
  };
}

interface ArticleState {
  // 상태
  articles: Article[];
  isWriteMode: boolean;
  bgColor: string;
  nickname: string | null;
  selectedArticleId: number | null;
  page: number;
  hasMore: boolean;
  isLoading: boolean;

  // 액션
  fetchArticles: () => Promise<void>;
  fetchArticlesWithPagination: (
    page: number,
    size?: number,
  ) => Promise<Article[]>;
  fetchMyArticlesWithPagination: (
    page: number,
    size?: number,
  ) => Promise<MyArticleResponse>;
  setArticles: (articles: Article[]) => void;
  appendArticles: (articles: Article[]) => void;
  setWriteMode: (isWriteMode: boolean) => void;
  setNickname: (nickname: string | null) => void;
  setBgColor: (color: string) => void;
  setSelectedArticleId: (id: number | null) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  resetPagination: () => void;
  deleteArticle: (articleId: number | null) => Promise<boolean>;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  // 초기 상태
  articles: [],
  isWriteMode: false,
  bgColor: 'white',
  nickname: null,
  selectedArticleId: null,
  page: 1,
  hasMore: true,
  isLoading: false,

  // 기존 메서드 - 이제는 첫 페이지만 가져옵니다
  fetchArticles: async () => {
    try {
      set({ isLoading: true });
      const articles = await get().fetchArticlesWithPagination(1);
      set({
        articles,
        page: 1,
        hasMore: articles.length > 0,
        isLoading: false,
      });
    } catch (error) {
      console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
      set({ isLoading: false });
    }
  },

  // 새로운 페이지네이션 메서드
  fetchArticlesWithPagination: async (page: number, size: number = 10) => {
    try {
      // 실제 API 엔드포인트에 맞게 수정
      const response = await fetch(`/articles?page=${page}&size=${size}`);

      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다');
      }

      const data = await response.json();
      return data.articles || []; // API 응답 구조에 맞게 조정
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  },

  // 마이 페이지네이션 내 칭찬게시글 조회 메서드
  fetchMyArticlesWithPagination: async (page: number, size: number = 10) => {
    try {
      // 실제 API 엔드포인트에 맞게 수정
      const response = await axiosInstance.get(
        `/articles/my-articles?offset=${page}&limit=${size}`,
      );

      console.log('직접 호출 response>>>', response);
      const data = response.data;
      console.log('직접 호출 data>>>', data);

      return data || []; // API 응답 구조에 맞게 조정
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  },

  // 게시글 설정 (전체 교체)
  setArticles: (articles: Article[]) => set({ articles }),

  // 게시글 추가 (기존 배열에 추가)
  appendArticles: (newArticles: Article[]) => {
    set((state) => ({
      articles: [...state.articles, ...newArticles],
    }));
  },

  // 기존 메서드들
  setWriteMode: (isWriteMode: boolean) => set({ isWriteMode }),
  setNickname: (nickname: string | null) => set({ nickname }),
  setBgColor: (color: string) => set({ bgColor: color }),
  setSelectedArticleId: (id: number | null) => set({ selectedArticleId: id }),

  // 페이지네이션 관련 새로운 메서드들
  setPage: (page: number) => set({ page }),
  setHasMore: (hasMore: boolean) => set({ hasMore }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  // 페이지네이션 리셋 (새로고침이나 필터 변경 시 사용)
  resetPagination: () => set({ page: 1, hasMore: true }),

  deleteArticle: async (articleId: number | null) => {
    console.log('articleId delete>>', articleId);
    try {
      const response = await axiosInstance.delete(`/articles/${articleId}`);

      if (response.status === 200 || response.status === 204) {
        // 기존 상태 가져오기
        const currentArticles = get().articles;

        // articleId와 일치하는 항목의 인덱스 찾기
        const indexToRemove = currentArticles.findIndex(
          (article: Article) => article.id === articleId,
        );

        // 배열에서 해당 항목이 있으면 제거
        if (indexToRemove !== -1) {
          const updatedArticles = [...currentArticles]; // 배열 복사
          updatedArticles.splice(indexToRemove, 1); // 해당 항목 제거

          // 상태 업데이트
          set({ articles: updatedArticles });
        } else {
          // 응답에서 받은 리스트로 업데이트 (기존 코드)
          set({ articles: response.data.list });
        }

        return true; // 삭제 성공
      }
      return false;
    } catch (error) {
      console.error('게시글 삭제 중 에러 발생:', error);
      throw error;
    }
  },
}));
