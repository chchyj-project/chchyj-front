// PopupContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import styled from 'styled-components';
import Common from '../../style/Common.ts';

// 팝업 타입 정의
type PopupType = 'alert' | 'confirm' | 'custom';

// 팝업 데이터 인터페이스
interface PopupData {
  id: string;
  type: PopupType;
  title?: string;
  message?: string;
  component?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmText?: string;
  cancelText?: string;
}

// 컨텍스트 인터페이스
interface PopupContextType {
  popups: PopupData[];
  showAlert: (title: string, message: string, onClose?: () => void) => void;
  showConfirm: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string,
  ) => void;
  showCustom: (component: ReactNode, onClose?: () => void) => void;
  closePopup: (id: string) => void;
  closeAllPopups: () => void;
}

// 컨텍스트 생성
const PopupContext = createContext<PopupContextType | null>(null);

// 스타일드 컴포넌트
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PopupTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`;

const PopupContent = styled.div`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  background-color: ${(props) =>
    props.$primary ? Common.colors.skyblue : '#E5E7EB'};
  color: ${(props) => (props.$primary ? 'white' : '#374151')};

  &:hover {
    background-color: ${(props) =>
      props.$primary ? Common.colors.skyblue : '#D1D5DB'};
  }
`;

// 팝업 프로바이더 컴포넌트
export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [popups, setPopups] = useState<PopupData[]>([]);

  // 고유 ID 생성 함수
  const generateId = () =>
    `popup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 알림 팝업 표시
  const showAlert = (title: string, message: string, onClose?: () => void) => {
    const id = generateId();
    const newPopup: PopupData = {
      id,
      type: 'alert',
      title,
      message,
      onClose,
      confirmText: '확인',
    };
    setPopups([...popups, newPopup]);
    return id;
  };

  // 확인 팝업 표시
  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText: string = '확인',
    cancelText: string = '취소',
  ) => {
    const id = generateId();
    const newPopup: PopupData = {
      id,
      type: 'confirm',
      title,
      message,
      onConfirm,
      onCancel,
      onClose: onCancel,
      confirmText,
      cancelText,
    };
    setPopups([...popups, newPopup]);
    return id;
  };

  // 커스텀 팝업 표시
  const showCustom = (component: ReactNode, onClose?: () => void) => {
    const id = generateId();
    const newPopup: PopupData = {
      id,
      type: 'custom',
      component,
      onClose,
    };
    setPopups([...popups, newPopup]);
    return id;
  };

  // 팝업 닫기
  const closePopup = (id: string) => {
    const popup = popups.find((p) => p.id === id);
    if (popup && popup.onClose) {
      popup.onClose();
    }
    setPopups(popups.filter((popup) => popup.id !== id));
  };

  // 모든 팝업 닫기
  const closeAllPopups = () => {
    popups.forEach((popup) => {
      if (popup.onClose) {
        popup.onClose();
      }
    });
    setPopups([]);
  };

  // 컨텍스트 값
  const contextValue: PopupContextType = {
    popups,
    showAlert,
    showConfirm,
    showCustom,
    closePopup,
    closeAllPopups,
  };

  return (
    <PopupContext.Provider value={contextValue}>
      {children}

      {/* 팝업 렌더링 */}
      {popups.map((popup) => (
        <Overlay
          key={popup.id}
          onClick={() => popup.type !== 'confirm' && closePopup(popup.id)}
        >
          <PopupContainer onClick={(e) => e.stopPropagation()}>
            {popup.type !== 'custom' ? (
              <>
                <PopupHeader>
                  <PopupTitle>{popup.title}</PopupTitle>
                  <CloseButton onClick={() => closePopup(popup.id)}>
                    ×
                  </CloseButton>
                </PopupHeader>
                <PopupContent>{popup.message}</PopupContent>
                <ButtonGroup>
                  {popup.type === 'confirm' && (
                    <Button
                      onClick={() => {
                        if (popup.onCancel) popup.onCancel();
                        closePopup(popup.id);
                      }}
                    >
                      {popup.cancelText}
                    </Button>
                  )}
                  <Button
                    $primary
                    onClick={() => {
                      if (popup.type === 'confirm' && popup.onConfirm) {
                        popup.onConfirm();
                      }
                      closePopup(popup.id);
                    }}
                  >
                    {popup.confirmText || '확인'}
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <CloseButton
                  style={{ position: 'absolute', top: '10px', right: '10px' }}
                  onClick={() => closePopup(popup.id)}
                >
                  ×
                </CloseButton>
                {popup.component}
              </>
            )}
          </PopupContainer>
        </Overlay>
      ))}
    </PopupContext.Provider>
  );
};

// 팝업 훅
export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupContext');
  }
  return context;
};
