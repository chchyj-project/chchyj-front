// hooks/useApiError.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface UseApiErrorReturn {
  toast: boolean;
  toastMsg: string;
  setToast: (value: boolean) => void;
  handleApiError: (error: unknown) => void;
}

export const useApiError = (): UseApiErrorReturn => {
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const navigate = useNavigate();

  const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setToastMsg(error.response.data.message);
            break;
          case 401:
            setToastMsg('로그인이 필요합니다');
            navigate('/login');
            break;
          case 403:
            setToastMsg('권한이 없습니다');
            break;
          default:
            setToastMsg('저장 중 오류가 발생했습니다');
        }
      } else if (error.request) {
        setToastMsg('서버와 통신할 수 없습니다');
      }
    } else {
      setToastMsg('알 수 없는 오류가 발생했습니다');
    }
    setToast(true);
  };

  return { toast, toastMsg, setToast, handleApiError };
};

// utils/apiUtils.ts
export const handleApiSuccess = (callback: () => void, delay = 2000) => {
  setTimeout(callback, delay);
};
