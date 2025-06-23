import { MoreVertical } from 'lucide-react';
import React from 'react';
import {
  DropdownContainer,
  MoreButton,
  DropdownMenu,
  ReportButton,
  DeleteButton,
} from './CommentActions.styles.ts';

interface CommentActionsProps {
  isopen: string;
  setIsOpen: (e: any) => void;
  type: 'post' | 'comment';
  handleDelete: (replyId: number) => Promise<void>;
  itemId?: number;
  handleEdit?: any;
  canDelete?: boolean;
}

const CommentActions: React.FC<CommentActionsProps> = ({
  isopen,
  setIsOpen,
  type,
  itemId,
  handleEdit,
  handleDelete,
  canDelete = false,
}) => {
  return (
    <DropdownContainer>
      <MoreButton onClick={setIsOpen}>
        <MoreVertical size={16} />
      </MoreButton>
      <DropdownMenu $isopen={isopen}>
        <ReportButton onClick={() => {
          console.log('신고하기 클릭');
          setIsOpen(false);
        }}>
          신고하기
        </ReportButton>
        {canDelete && (
          <DeleteButton onClick={() => handleDelete(Number(itemId))}>
            삭제하기
          </DeleteButton>
        )}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default CommentActions;
