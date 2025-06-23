import { MoreVertical } from 'lucide-react';
import React from 'react';
import { useReportModalStore } from '../store/useReportModalStore';
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
  content?: string; // 신고할 내용
}

const CommentActions: React.FC<CommentActionsProps> = ({
  isopen,
  setIsOpen,
  type,
  itemId,
  handleEdit,
  handleDelete,
  canDelete = false,
  content = '', // 신고할 내용
}) => {
  const { openReportModal } = useReportModalStore();

  const handleReport = () => {
    if (itemId) {
      // type이 'post'면 'article', 'comment'면 'reply'로 변환
      const reportType = type === 'post' ? 'article' : 'reply';
      openReportModal(content, itemId, reportType);
    }
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <MoreButton onClick={setIsOpen}>
        <MoreVertical size={16} />
      </MoreButton>
      <DropdownMenu $isopen={isopen}>
        <ReportButton onClick={handleReport}>
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
