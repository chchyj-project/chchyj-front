// components/ReportModal.tsx
import { useReportModalStore } from '../store/reportModalStore';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: 90%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 24px;
`;

const ReportTypeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const ReportTypeItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

const RadioInput = styled.input`
  margin-right: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 16px;
  resize: none;

  &::placeholder {
    color: #999;
  }
`;

const CharCount = styled.div`
  text-align: right;
  color: #666;
  font-size: 12px;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:disabled {
    cursor: not-allowed;
  }
`;

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetContent: string;
  onSubmit: (reportType: string, description: string) => void;
}

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

  const handleSubmit = async () => {
    if (selectedType && description.trim()) {
      try {
        await submitReport(selectedType, description);
        setSelectedType('');
        setDescription('');
      } catch (error) {
        // 에러 처리
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
