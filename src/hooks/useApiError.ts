// hooks/useApiError.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UseApiErrorReturn {
  handleApiError: (error: unknown) => void;
}

export const useApiError = (): UseApiErrorReturn => {
  const navigate = useNavigate();

  const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast(error.response.data.message);
            break;
          case 401:
            toast('로그인이 필요합니다');
            navigate('/login');
            break;
          case 403:
            toast('권한이 없습니다');
            break;
          default:
            toast('저장 중 오류가 발생했습니다');
        }
      } else if (error.request) {
        toast('서버와 통신할 수 없습니다');
      }
    } else {
      toast('알 수 없는 오류가 발생했습니다');
    }
  };

  return { handleApiError };
};

// utils/apiUtils.ts
export const handleApiSuccess = (callback: () => void, delay = 2000) => {
  setTimeout(callback, delay);
};
