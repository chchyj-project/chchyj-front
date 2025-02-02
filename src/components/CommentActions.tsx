import styled from 'styled-components';
import { MoreVertical } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

// 드롭다운 메뉴 컨테이너
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// 더보기 버튼
const MoreButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #999;
`;

// 드롭다운 메뉴
const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  min-width: 120px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

// 메뉴 아이템
const MenuItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }
`;

interface CommentActionsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: 'post' | 'comment';
  commentId?: number;
}

// 컴포넌트 사용 예시
const CommentActions: React.FC<CommentActionsProps> = ({
  isOpen,
  setIsOpen,
  type,
  commentId,
}) => {
  const handleEdit = () => {
    // 수정 로직
    setIsOpen(false);
  };

  const handleDelete = () => {
    // 삭제 로직
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <MoreButton onClick={() => setIsOpen(!isOpen)}>
        <MoreVertical size={16} />
      </MoreButton>
      <DropdownMenu isOpen={isOpen}>
        {!commentId && <MenuItem onClick={handleEdit}>수정하기</MenuItem>}
        <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default CommentActions;
