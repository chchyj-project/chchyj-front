import styled from 'styled-components';
import { ScrollAwareBottomButtonProps } from '../types/PraiseItem.ts';
import Common from './Common.ts';
import styleToken from './styleToken.ts';

export const RowFlexBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #404040;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
  }
`;

export const ScrollAwareBottomButtonWrapper = styled.div<ScrollAwareBottomButtonProps>`
  position: fixed;
  bottom: 25px;
  z-index: 100;
  display: flex;
  justify-content: center;
  max-width: 784px;
  width: 100%;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%)
    translateY(${(props) => (props.visible ? '0' : '100px')});
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
`;

// 버튼 자체의 스타일 (기존 코드에서 가져온 것)
export const BottomButton = styled.button`
  height: 56px;
  width: 90%;
  background-color: ${Common.colors.skyblue};
  color: ${styleToken.color.white};
  font-size: 18px;
  font-weight: 700;
  line-height: 19px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${() => {
      // 스카이블루보다 약간 더 어두운 색상
      const lightenColor = Common.colors.skyblue;
      return lightenColor.replace(
        /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
        (_, r, g, b) => {
          return `rgb(${Math.max(0, parseInt(r) - 20)}, ${Math.max(0, parseInt(g) - 20)}, ${Math.max(0, parseInt(b) - 20)})`;
        },
      );
    }};
  }

  &:active {
    transform: scale(0.98);
  }
`;
