import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CloseButton } from '../style/commonStyle.ts';
import styleToken from '../style/styleToken.ts';

export const Button = styled.button`
  width: 100%;
  background: ${styleToken.color.primary};
  height: 56px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

export const Panel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: calc(50% - 180px); // Shifted slightly to the left
  transform: translateX(-25%);
  width: 100%;
  max-width: 390px;
  height: auto;
  background-color: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  z-index: 201; // Overlay보다 높은 z-index

  // 모바일에서 높이 조정
  @media (max-width: 390px) {
    height: auto; // 모바일에서 더 적은 높이로 조정
    max-height: calc(100vh - 50px); // 최대 높이 제한 (상단 여백 확보)
  }
`;

export const PanelContent = styled.div`
  margin: 0 auto;
  padding: 24px;
  height: 100%;
  position: relative;

  /* 모바일에서 상단 여백 더 확보 */
  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 24px 0;
  padding: 8px;
  border: 1px solid #6b90ff;
  border-radius: 12px;
  resize: none;
  font-size: 14px;
  color: #303030;
  height: 200px;
  outline: none;
  transition: 0.2s;
  &:focus {
    border: 1px solid #1a4de5;
  }
`;

export const Wrapper = styled.div`
  color: #9e9e9e; /* 텍스트 색상 */
  font-size: 14px; /* 기본 폰트 크기 */
  line-height: 1.5; /* 텍스트 간격 */
  margin-bottom: 24px;
`;

export const Item = styled.div`
  /* display: flex;
  align-items: center;
  gap: 10px; 아이콘과 텍스트 간격 */
`;

export const Icon = styled.span`
  font-size: 18px; /* 아이콘 크기 */
`;

export const Text = styled.span`
  display: inline-block;
  font-size: 13px;
  color: ${styleToken.color.secondary};
  margin-left: 8px;
`;

export const Title = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 1.5;
  color: #303030;

  @media (max-width: 480px) {
    font-size: 18px;
    /* padding-right: 30px;
    margin-top: 12px; 모바일에서 상단 여백 증가 */
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: #222; // 반투명 검정색 배경
  transform: translateX(-50%);
  z-index: 200; // Panel보다 낮은 z-index
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
  z-index: 202;

  @media (max-width: 480px) {
    top: 16px;
    right: 16px;
  }
`;
