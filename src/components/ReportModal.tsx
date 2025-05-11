// components/ReportModal.tsx
import { useReportModalStore } from '../store/reportModalStore';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Overlay,
  Modal,
  CloseButton,
  Title,
  Description,
  ReportTypeList,
  ReportTypeItem,
  RadioInput,
  TextArea,
  CharCount,
  SubmitButton,
} from './ReportModal.styles';

const reportTypes = [
  { id: 'spam', label: '스팸/광고성 콘텐츠' },
  { id: 'abuse', label: '욕설/비방/혐오 발언' },
  { id: 'adult', label: '음란물/성적인 콘텐츠' },
  { id: 'privacy', label: '개인정보 노출' },
  { id: 'copyright', label: '저작권 침해' },
  { id: 'other', label: '기타' },
];

export default function ReportModal() {
  const { isOpen, targetContent, closeReportModal, submitReport } =
    useReportModalStore();
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
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
      setDescription('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (selectedType && description.trim()) {
      try {
        await submitReport(selectedType, description);
        setSelectedType('');
        setDescription('');
      } catch (error) {
        // 에러 처리
        console.error('신고 제출 중 오류 발생:', error);
      }
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
            <CloseButton onClick={closeReportModal}>
              <X size={24} />
            </CloseButton>

            <Title>신고하기</Title>
            <Description>부적절한 내용에 대해 신고해 주세요.</Description>

            <ReportTypeList>
              {reportTypes.map((type) => (
                <ReportTypeItem key={type.id}>
                  <RadioInput
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={selectedType === type.id}
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  {type.label}
                </ReportTypeItem>
              ))}
            </ReportTypeList>

            <TextArea
              placeholder="구체적인 신고 사유를 입력해 주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
            />

            <CharCount>{description.length}/500자</CharCount>

            <SubmitButton
              disabled={!selectedType || !description.trim()}
              onClick={handleSubmit}
            >
              신고하기
            </SubmitButton>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
