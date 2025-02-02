// stores/reportModalStore.ts
import { create } from 'zustand';
import { axiosInstance } from '../api/axiosConfig.ts';

interface ReportModalStore {
  isOpen: boolean;
  targetContent: string;
  targetId?: number;
  targetType?: 'post' | 'comment'; // 신고 대상 타입
  openReportModal: (
    content: string,
    id: number,
    type: 'post' | 'comment',
  ) => void;
  closeReportModal: () => void;
  submitReport: (reportType: string, description: string) => Promise<void>;
}

export const useReportModalStore = create<ReportModalStore>((set, get) => ({
  isOpen: false,
  targetContent: '',
  targetId: undefined,
  targetType: undefined,

  openReportModal: (content, id, type) =>
    set({
      isOpen: true,
      targetContent: content,
      targetId: id,
      targetType: type,
    }),

  closeReportModal: () =>
    set({
      isOpen: false,
      targetContent: '',
      targetId: undefined,
      targetType: undefined,
    }),

  submitReport: async (reportType, description) => {
    const { targetId, targetType } = get();
    try {
      // API 호출
      const response = await axiosInstance.post('/abuse', {
        reason: description,
        type: reportType,
        id: targetId,
        targetType: targetType,
      });

      // 성공 시 모달 닫기
      get().closeReportModal();
      return response.data;
    } catch (error) {
      console.error('Report submission failed:', error);
      throw error;
    }
  },
}));
