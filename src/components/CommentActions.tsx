import { MoreVertical } from 'lucide-react';
import React from 'react';
import {
  DropdownContainer,
  MoreButton,
  DropdownMenu,
  MenuItem,
} from './CommentActions.styles.ts';

interface CommentActionsProps {
  isopen: string;
  setIsOpen: (e: any) => void; // boolean 파라미터 제거
  type: 'post' | 'comment';
  handleDelete: (replyId: number) => Promise<void>;
  itemId?: number;
  handleEdit?: any;
}

const CommentActions: React.FC<CommentActionsProps> = ({
  isopen,
  setIsOpen,
  type,
  itemId,
  handleEdit,
  handleDelete,
}) => {
  return (
    <DropdownContainer>
      <MoreButton onClick={setIsOpen}>
        {/* 단순히 setIsOpen 호출 */}
        <MoreVertical size={16} />
      </MoreButton>
      <DropdownMenu $isopen={isopen}>
        {!itemId && (
          <MenuItem onClick={() => handleEdit && handleEdit(Number(itemId))}>
            수정하기
          </MenuItem>
        )}
        <MenuItem onClick={() => handleDelete(Number(itemId))}>
          삭제하기
        </MenuItem>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default CommentActions;
