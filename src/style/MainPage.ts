import styled from 'styled-components';
import styleToken from './styleToken.ts';
import { IconProps } from '../types/MainPage.ts';

export const AddtionalWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${styleToken.color.textSub};
  gap: 5px;
  svg {
    margin-right: 4px;
  }
  cursor: pointer;
`;

export const Icon = styled.img<IconProps>`
  margin-left: 4px;
  width: ${(prop) => prop.size};
  height: ${(prop) => prop.size};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PageContainer = styled.div`
  display: flex;
  //width: 100vw;
  flex-direction: column;
  //align-items: center;
  background-color: white;
  //width: 100vw;
  overflow-x: hidden;

  box-sizing: border-box;
`;

export const TitleStyle = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: #333333;
  text-align: left;
  margin-bottom: 8px;
    @media (max-width: 768px) {
  font-size: 20px;
  }
  line-height: 1.4; /* 줄 간격 조정 */
  word-wrap: break-word; /* 단어 단위로 줄바꿈 */
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #333333;
  text-align: left;
  margin-bottom: 16px;
  line-height: 1.4; /* 줄 간격 조정 */
  max-width: 400px; /* 줄바꿈 일정하게 유지 */
  word-wrap: break-word;
`;
