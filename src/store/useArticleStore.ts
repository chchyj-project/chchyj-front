// src/store/useArticleStore.ts
import { create } from 'zustand';
import { Article, ArticleResponse } from '../types/MainPage';
import { axiosInstance } from '../api/axiosConfig';

interface ArticleState {
  articles: Article[];
  isWriteMode: boolean;
  bgColor: string;
  nickname: string | null;
  selectedArticleId: number | null; // 추가된 부분
  fetchArticles: () => Promise<void>;
  setArticles: (articles: Article[]) => void; // 추가
  addArticle: (article: Article) => void; // 새 글 추가용
  setWriteMode: (isWrite: boolean) => void;
  setNickname: (nickname: string | null) => void;
  setBgColor: (color: string) => void; // 추가
  setSelectedArticleId: (id: number | null) => void; // 추가된 부분
  deleteArticle: (articleId: number | null) => Promise<boolean>;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  isWriteMode: false,
  bgColor: 'white',
  nickname: null,
  selectedArticleId: null, // 추가된 부분

  fetchArticles: async () => {
    try {
      const response: ArticleResponse = await axiosInstance.get('/articles', {
        params: { limit: 20, offset: 0 },
      });
      set({ articles: response.data.list });
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  },

  setArticles: (articles: Article[]) => {
    set({ articles });
  },

  // 새 글 작성 시 목록 맨 앞에 추가
  addArticle: (article: Article) => {
    set((state) => ({
      articles: [article, ...state.articles],
    }));
  },

  setWriteMode: (isWrite: boolean) => {
    set({
      isWriteMode: isWrite,
      bgColor: isWrite ? '#4D4D4D' : 'white',
    });
  },

  setNickname: (nickname: string | null) => {
    set({ nickname });
  },

  setBgColor: (color: string) => {
    set({ bgColor: color });
  },

  setSelectedArticleId: (id: number | null) => {
    // 추가된 부분
    set({ selectedArticleId: id });
  },

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
