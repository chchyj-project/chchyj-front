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
  color: black;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

// 드롭다운 메뉴
export const DropdownMenu = styled.div<{ $isopen: string }>`
  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 8px;
  padding: 4px 8px;
  min-width: 60px;
  display: ${(props) => (props.$isopen == 'true' ? 'flex' : 'none')};
  flex-direction: column;
  gap: 4px;
  z-index: 1000;
`;

// 신고하기 버튼 (파란색)
export const ReportButton = styled.button`
  width: 100%;
  padding: 2px;
  border: none;
  background-color: #4285f4;
  color: white;
  text-align: center;
  cursor: pointer;
  font-size: 9px;
  font-weight: 500;
  border-radius: 3px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3367d6;
  }
`;

// 삭제하기 버튼 (회색)
export const DeleteButton = styled.button`
  width: 100%;
  padding: 2px;
  border: none;
  background-color: #9e9e9e;
  color: white;
  text-align: center;
  cursor: pointer;
  font-size: 9px;
  font-weight: 500;
  border-radius: 3px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #757575;
  }
`;
