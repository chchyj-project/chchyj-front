import styled from 'styled-components';

// 드롭다운 메뉴 컨테이너
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// 더보기 버튼
export const MoreButton = styled.button`
  background: none;
  border: none;
  padding: 0px;
  cursor: pointer;
  color: #999;
`;

// 드롭다운 메뉴
export const DropdownMenu = styled.div<{ $isopen: string }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  min-width: 120px;
  display: ${(props) => (props.$isopen == 'true' ? 'block' : 'none')};
  z-index: 1000;
  font-family: 'Jalnan', 'NanumSquareRound', sans-serif;
`;

// 메뉴 아이템
export const MenuItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  font-family: 'Jalnan', 'NanumSquareRound', sans-serif;

  &:hover {
    background-color: #f5f5f5;
  }
`;
