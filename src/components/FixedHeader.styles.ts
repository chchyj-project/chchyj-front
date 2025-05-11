import styled from 'styled-components';
import Common from '../style/Common.ts';
import styleToken from '../style/styleToken.ts';

interface ContainerProps {
  $bgColor: string;
}

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
`;

export const FixedHeaderWrapper = styled.div`
  z-index: 150;
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: transparent;
`;

export const HeaderContainer = styled.header<ContainerProps>`
  max-width: 379px;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  color: #111111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding: 0 24px;
  box-sizing: border-box;
  background-color: ${(props) => props.$bgColor || Common.colors.gray};
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Nickname = styled.button`
  color: #6b90ff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`;

export const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 4px;
`;

export const New = styled.div`
  width: 12px;
  height: 12px;
  color: #fff;
  background-color: ${styleToken.color.primary};
  border-radius: 8px;
  font-size: 7px;
  text-align: center;
  line-height: 10.5px;
  border: 1px solid #fff;
  margin-left: -10px;
`;

export const AppContainer = styled.div`
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
