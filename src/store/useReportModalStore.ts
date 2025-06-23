// stores/reportModalStore.ts
import { create } from 'zustand';
import { axiosInstance } from '../api/axiosConfig.ts';

interface ReportModalStore {
  isOpen: boolean;
  targetContent: string;
  targetId?: number;
  targetType?: 'article' | 'reply'; // 신고 대상 타입
  openReportModal: (
    content: string,
    id: number,
    type: 'article' | 'reply',
  ) => void;
  closeReportModal: () => void;
  submitReport: (reportType: string, description: string) => Promise<void>;
}

export const useReportModalStore = create<ReportModalStore>((set, get) => ({
  isOpen: false,
  targetContent: '',
  targetId: undefined,
  targetType: undefined,

  openReportModal: (content, id, type) => {
    console.log('openReportModal 호출됨:', { content, id, type });
    set({
      isOpen: true,
      targetContent: content,
      targetId: id,
      targetType: type,
    });
    console.log('신고 모달 상태 업데이트 완료');
  },

  closeReportModal: () =>
    set({
      isOpen: false,
      targetContent: '',
      targetId: undefined,
      targetType: undefined,
    }),

  submitReport: async (reportType, description) => {
    const { targetId, targetType } = get();
    console.log('targetType>>', targetType, targetId);
    console.log(
      'submitReport>>',
      reportType,
      description,
      targetId,
      targetType,
    );
    try {
      // API 호출
      const response = await axiosInstance.post('/abuse', {
        reason: description,
        type: targetType,
        id: targetId,
        category: reportType,
      });

      console.log('abuse response>>', response.data);

      // 성공 시 모달 닫기
      get().closeReportModal();
      return response.data;
    } catch (error) {
      console.error('Report submission failed:', error);
      throw error;
    }
  },
}));
