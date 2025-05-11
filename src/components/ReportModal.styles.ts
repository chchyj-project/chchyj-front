import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto; /* 모바일에서 스크롤 가능하도록 */
  padding: 20px 0; /* 상하 여백 추가 */
`;

export const Modal = styled(motion.div)`
  position: relative;
  width: 90%;
  max-width: 500px;
  max-height: 90vh; /* 화면 높이의 90%로 제한 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 허용 */
  background: white;
  border-radius: 16px;
  padding: clamp(16px, 5vw, 24px); /* 반응형 패딩 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: auto; /* 중앙 정렬 */

  /* 모바일 최적화 */
  @media (max-width: 480px) {
    width: 95%;
    max-height: 80vh; /* 모바일에서는 더 작게 */
  }

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: clamp(8px, 3vw, 16px);
  right: clamp(8px, 3vw, 16px);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 10;
`;

export const Title = styled.h2`
  font-size: clamp(18px, 4vw, 20px);
  font-weight: bold;
  margin-bottom: clamp(12px, 3vw, 16px);
`;

export const Description = styled.p`
  color: #666;
  font-size: clamp(14px, 3vw, 16px);
  margin-bottom: clamp(16px, 5vw, 24px);
`;

export const ReportTypeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2vw, 12px);
  margin-bottom: clamp(16px, 5vw, 24px);
`;

export const ReportTypeItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: clamp(8px, 2vw, 12px);
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);

  &:hover {
    background: #f8f9fa;
  }
`;

export const RadioInput = styled.input`
  margin-right: 8px;
  min-width: 18px;
  min-height: 18px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: clamp(80px, 15vh, 120px);
  padding: clamp(12px, 3vw, 16px);
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 12px;
  resize: none;
  font-size: clamp(14px, 3vw, 16px);

  &::placeholder {
    color: #999;
  }
`;

export const CharCount = styled.div`
  text-align: right;
  color: #666;
  font-size: clamp(10px, 2vw, 12px);
  margin-bottom: 12px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: clamp(12px, 3vw, 16px);
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: clamp(14px, 3vw, 16px);
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:disabled {
    cursor: not-allowed;
  }
`;
