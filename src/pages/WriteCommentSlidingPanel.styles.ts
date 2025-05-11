import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CloseButton } from '../style/commonStyle.ts';

export const Panel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  //left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  height: 50vh;
  background-color: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 11;
  border: 1px solid #e0e0e0;

  // 모바일에서는 더 높은 높이를 확보
  @media (max-width: 480px) {
    height: 60vh; // 모바일에서 더 높은 높이로 조정
    max-height: calc(100vh - 50px); // 최대 높이 제한 (상단 여백 확보)
  }
`;

export const PanelContent = styled.div`
  padding: 24px;
  padding-bottom: 36px; /* 하단 버튼 여백 */
  padding-top: 32px; /* 상단 여백 증가 */
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  /* 모바일에서 상단 여백 더 확보 */
  @media (max-width: 480px) {
    padding-top: 40px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin-top: 10px; /* 상단 여백 추가 */
  margin-bottom: 24px;
  line-height: 1.4;
  padding-right: 40px;

  @media (max-width: 480px) {
    font-size: 20px;
    padding-right: 30px;
    margin-top: 12px; /* 모바일에서 상단 여백 증가 */
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 0 0 24px 0;
  padding: 16px;
  border: none;
  border-radius: 12px;
  resize: none;
  font-size: 16px;
  background-color: #eef9ff;
  min-height: 100px;

  &::placeholder {
    color: #999;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #60c3fb;
  border: none;
  color: white;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 12px; /* 모바일에서 하단 여백 */
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  width: 768px;
  background-color: #4d4d4d; // 반투명 검정색 배경
  transform: translateX(-50%);
  z-index: 10; // Panel보다 낮은 z-index
`;

// 닫기 버튼 스타일링 개선
export const PanelCloseButton = styled(CloseButton)`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
  background: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    top: 16px;
    right: 16px;
  }
`;
