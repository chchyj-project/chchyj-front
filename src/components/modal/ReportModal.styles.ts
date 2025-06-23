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
  width: 267px;
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: auto;
  display: flex;
  flex-direction: column;
  z-index: 1001; /* Overlay보다 높은 z-index 설정 */
  
  /* 임시 디버깅용 스타일 */
  border: 2px solid red;

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
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 10;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
`;

export const Description = styled.p`
  display: none;
`;

export const ReportTypeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

export const ReportTypeItem = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 0;
  border: none;
`;

// Label을 위한 새로운 스타일 컴포넌트 추가
export const LabelText = styled.span`
  margin-left: 12px; // 왼쪽 여백 추가
`;

export const LabelTextDiv = styled.div`
  margin-left: 10px;
  font-size: 14px;
  white-space: nowrap;
`;

export const TextArea = styled.textarea`
  display: none;
`;

export const CharCount = styled.div`
  display: none;
`;

export const SubmitButton = styled.button`
  width: 231px;
  padding: 14px;
  background: #111111;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Jalnan', 'NanumSquareRound', sans-serif;
  &:disabled {
    cursor: not-allowed;
  }
`;

export const OtherReasonInput = styled.input`
  width: 90%;
  padding: 10px 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 14px;
  // margin-top: 8px;s
  // margin-left: 32px;
  // margin-bottom: 10px;

  &::placeholder {
    color: #999;
  }
`;

// 기타 사유 입력을 위한 특별 컨테이너
export const OtherReasonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
