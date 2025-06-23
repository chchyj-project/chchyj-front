import styled from 'styled-components';
import styleToken from '../style/styleToken.ts';
import Common from '../style/Common.ts';

export const PraiseCard = styled.div`
  background-color: ${styleToken.color.bannerSkyblue};
  margin: 69px 0 0 0;
  padding: 18.99px 24px;
  text-align: left;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 65px;
  }
`;

export const ContentWrapper = styled.div`
  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface IconProps {
  width?: string; // ex: "50px", "5rem"
  height?: string;
  mobileWidth?: string; // @media 변경용
  mobileHeight?: string;
}

export const Icon = styled.img<IconProps>`
  width: ${({ width = '82.96px' }) => width};
  height: ${({ height = '117.64px' }) => height};
  margin-top: -5px;

  @media (max-width: 480px) {
    width: ${({ mobileWidth, width = '82.96px' }) => mobileWidth || width};
    height: ${({ mobileHeight, height = '117.64px' }) =>
    mobileHeight || height};
  }
`;

export const MainButton = styled.button`
  width: 100%;
  background: ${styleToken.color.primary};
  height: 56px;
  border-radius: 8px;
  font-family: 'Jalnan', 'NanumSquareRound', sans-serif;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PraiseList = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${styleToken.color.background};
  margin: 24px;
`;

export const ListGap = styled.div`
  height: 10px;
  margin: 4px 0;
`;

export const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: calc(50vw - 195px + 24px); /* 390px/2 = 195px, 중앙에서 195px 빼고 24px 여백 */
  z-index: 1000;
  pointer-events: none;

  @media (max-width: 390px) {
    right: 24px; /* 화면이 390px 이하일 때는 그냥 우측 24px */
  }

  @media (max-width: 430px) {
    bottom: 16px;
  }
`;

export const FloatingActionButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${styleToken.color.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  margin-right: 0;

  @media (max-width: 390px) {
    width: 50px;
    height: 50px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  background-color: ${Common.colors.gray};
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Jalnan', 'NanumSquareRound', sans-serif;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${FloatingActionButton}:hover & {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 24px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 14px;
  color: #666;
`;

export const LoadingContainer = styled.div`
  padding: 20px 0;
  text-align: center;
  min-height: 60px;
`;
