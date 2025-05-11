// components/ReportModal.tsx
import { useReportModalStore } from '../../store/reportModalStore';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Overlay,
  Modal,
  Title,
  ReportTypeList,
  ReportTypeItem,
  SubmitButton,
  OtherReasonInput,
} from './ReportModal.styles';
import CircleButton from '../common/CircleButton';
import styled from 'styled-components';

const reportTypes = [
  { id: 'abuse', label: '욕설 또는 부적절한 언어 사용' },
  { id: 'privacy', label: '개인정보 노출' },
  { id: 'adult', label: '홍보 또는 스팸성 내용' },
  { id: 'spam', label: '무관한 내용 또는 장난성 댓글' },
  { id: 'other', label: '운영방침에 어긋나는 기타 사유' },
];

// Label을 위한 새로운 스타일 컴포넌트 추가
const LabelText = styled.span`
  margin-left: 12px; // 왼쪽 여백 추가
`;

export default function ReportModal() {
  const { isOpen, closeReportModal, submitReport } = useReportModalStore();
  const [selectedType, setSelectedType] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const modalRef = useRef(null);

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // 모달이 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedType('');
      setOtherReason('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (selectedType) {
      try {
        const description = selectedType === 'other' ? otherReason : '';
        await submitReport(selectedType, description);
        setSelectedType('');
        setOtherReason('');
      } catch (error) {
        console.error('신고 제출 중 오류 발생:', error);
      }
    }
  };

  const handleRadioChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    isActive: boolean,
    typeId: string,
  ) => {
    if (isActive) {
      setSelectedType(typeId);
    } else {
      setSelectedType('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeReportModal}
        >
          <Modal
            ref={modalRef}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Title>신고사유를 선택해주세요</Title>

            <ReportTypeList>
              {reportTypes.map((type) => (
                <ReportTypeItem key={type.id}>
                  <CircleButton
                    onClick={(e, isActive) =>
                      handleRadioChange(e, isActive, type.id)
                    }
                  />
                  <LabelText>{type.label}</LabelText>
                </ReportTypeItem>
              ))}
              <OtherReasonInput
                placeholder="기타 사유를 입력해주세요"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            </ReportTypeList>

            <SubmitButton onClick={handleSubmit}>신고하기</SubmitButton>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
