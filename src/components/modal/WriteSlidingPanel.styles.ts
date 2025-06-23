import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CloseButton } from '../../style/commonStyle.ts';
import styleToken from '../../style/styleToken.ts';
import Common from '../../style/Common.ts';

export const Button = styled.button`
  width: 100%;
  background: ${Common.colors.mainBlue};
  height: 56px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
  font-family: 'Jalnan', sans-serif; /* Jalnan 폰트 적용 */
  font-weight: 600;
  font-size: 16px;

  img {
    height: 24px; /* 높이만 설정하여 비율 유지 */
    width: auto; /* 자동으로 비율에 맞춰 조정 */
  }
`;

export const PanelWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  z-index: 9999;
`;

export const Panel = styled(motion.div)`
  width:390px;
  height: auto;
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  overflow-y: auto;

  /* 화면이 390px보다 작을 때 */
  @media (max-width: 390px) {
    width: 100vw; /* 전체 너비 사용 */
    height: auto; 
    max-height: calc(100vh - 80px); /* 최대 높이 제한 (상단 여백 확보) */
    border-radius: 16px 16px 0 0;
  }
`;

export const PanelContent = styled.div`
  margin: 0 auto;
  padding: 24px;
  height: 100%;
  position: relative;
  box-sizing: border-box; /* padding이 width에 포함되도록 */

  /* 모바일에서 상단 여백 더 확보 */
  @media (max-width: 390px) {
    padding: 20px;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 24px 0;
  padding: 16px; /* 8px에서 16px로 증가 */
  border: 1px solid #6b90ff;
  border-radius: 12px;
  opacity: 0.5;
  resize: none;
  font-size: 14px;
  color: #303030;
  height: 200px;
  outline: none;
  transition: 0.2s;
  line-height: 1.5; /* 줄 높이 추가 */
  
  &:focus {
    border: 1px solid #1a4de5;
  }
  
  &::placeholder {
    color: #9e9e9e; /* placeholder 색상 조정 */
    line-height: 1.5; /* placeholder 줄 높이 */
  }
`;

export const Wrapper = styled.div`
  color: #9e9e9e; /* 텍스트 색상 */
  font-size: 14px; /* 기본 폰트 크기 */
  line-height: 1.5; /* 텍스트 간격 */
  margin-bottom: 24px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 2px; /* 아이콘과 텍스트 간격 */
  margin-bottom: 16px; /* 각 Item 사이의 세로 간격 추가 */
  
  &:last-child {
    margin-bottom: 0; /* 마지막 Item은 하단 여백 제거 */
  }
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
  font-size: 25px;
  font-weight: 700;
  line-height: 1.5;
  font-family: 'SUIT Black', 'SUIT ExtraBold', 'SUIT', sans-serif;

  color: #1a1a1a;

  @media (max-width: 480px) {
    font-size: 18px;
    /* padding-right: 30px;
    margin-top: 12px; */ /* 모바일에서 상단 여백 증가 */
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* 반투명 오버레이로 뒤 내용이 살짝 보이게 */
  z-index: 9998; /* Panel보다 낮지만 충분히 높은 z-index */
`;

/* 닫기 버튼 스타일링 개선 */
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