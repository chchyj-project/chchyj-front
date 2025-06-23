import { motion } from 'framer-motion';
import styled from 'styled-components';
import Common from '../../style/Common';

export const Overlay = styled(motion.div)`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  z-index: 9999 !important;
  overflow-y: auto; /* 모바일에서 스크롤 가능하도록 */
  padding: 20px 0; /* 상하 여백 추가 */
`;

export const Modal = styled(motion.div)`
  position: relative !important;
  width: 320px !important;
  background: white !important;
  border-radius: 12px !important;
  padding: 32px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  margin: auto !important;
  display: flex !important;
  flex-direction: column !important;
  z-index: 10000 !important;
  

  /* 모바일 최적화 */
  @media (max-width: 480px) {
    width: 95% !important;
    max-height: 80vh !important;
    padding: 28px !important;
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
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  line-height: 1.4;
`;

export const Description = styled.p`
  display: none;
`;

export const ReportTypeList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const ReportTypeItem = styled.label`
  display: flex;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  padding: 6px 0;
  border: none;
  line-height: 1.5;
`;

// Label을 위한 새로운 스타일 컴포넌트 추가
export const LabelText = styled.span`
  margin-left: 10px;
  font-size: 14px;
  line-height: 17px;
  font-family: 'SUIT';
  font-style: normal;
`;

export const LabelTextDiv = styled.div`  margin-left: 10px;
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
  width: 100%;
  padding: 14px;
  background: #111111;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Jalnan', 'NanumSquareRound', sans-serif;
  margin-top: 8px;
  &:disabled {
    cursor: not-allowed;
  }
`;

export const OtherReasonInput = styled.input`
  width: 90%;
  padding: 10px 12px;
  border: 1px solid #eee;
  border-radius: 3px;
  font-size: 14px;
  opacity: 0.3;
  background-color: ${Common.colors.gray};
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

