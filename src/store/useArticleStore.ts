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
}

export const useArticleStore = create<ArticleState>((set) => ({
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
}));
