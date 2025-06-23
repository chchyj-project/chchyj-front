// components/ReportModal.tsx
import { useReportModalStore } from '../../store/useReportModalStore';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  Overlay,
  Modal,
  Title,
  ReportTypeList,
  ReportTypeItem,
  SubmitButton, 
  OtherReasonInput,
  LabelText,
  OtherReasonContainer,
} from './ReportModal.styles';
import CircleButton from '../common/CircleButton';

const reportTypes = [
  { id: 'abuse', label: '욕설 또는 부적절한 언어 사용' },
  { id: 'privacy', label: '개인정보 노출' },
  { id: 'adult', label: '홍보 또는 스팸성 내용' },
  { id: 'spam', label: '무관한 내용 또는 장난성 댓글' },
  { id: 'other', label: '운영방침에 어긋나는 기타 사유' },
];

export default function ReportModal() {
  const { isOpen, closeReportModal, submitReport } = useReportModalStore();
  const [selectedType, setSelectedType] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const modalRef = useRef(null);

  // 디버깅용 로그 추가
  console.log('ReportModal 렌더링 - isOpen:', isOpen);

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
      console.log('ReportModal 열림 - 상태 초기화');
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

  const handleRadioChange = (typeId: string) => {
    setSelectedType(typeId);
  };

  // Portal로 렌더링할 Modal 컴포넌트
  const modalContent = (
    <>

      {/* AnimatePresence 일시적으로 제거하고 직접 렌더링 */}
      {isOpen && (
        <Overlay onClick={closeReportModal}>
          <Modal onClick={(e) => e.stopPropagation()}>

            <Title>신고사유를 선택해주세요</Title>

            <ReportTypeList>
              {reportTypes.map((type) => (
                <ReportTypeItem key={type.id}>
                  <CircleButton
                    isActive={selectedType === type.id}
                    onClick={(e) => handleRadioChange(type.id)}
                  />
                  <LabelText>{type.label}</LabelText>
                </ReportTypeItem>
              ))}
              <OtherReasonContainer>
                <OtherReasonInput
                  placeholder="내용을 기재하세요"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  style={{ marginLeft: '30px', marginTop: '8px' }}
                />
              </OtherReasonContainer>
            </ReportTypeList>

            <SubmitButton onClick={handleSubmit}>신고하기</SubmitButton>
          </Modal>
        </Overlay>
      )}
    </>
  );

  // Portal을 사용해서 document.body에 직접 렌더링
  return ReactDOM.createPortal(modalContent, document.body);
}
