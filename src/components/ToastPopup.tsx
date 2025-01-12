import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';

const slideInFromTop = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 0.97;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 0.97;
  }
`;
const ToastContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 768px;
  margin: 0 auto;
  pointer-events: none; // 클릭 이벤트가 뒤의 요소들에 전달되도록
  z-index: 20;
`;

const ToastWrapper = styled.div`
  position: relative; // fixed에서 relative로 변경
  display: flex;
  height: 4rem;
  width: 60%;
  margin: 0 auto; // 가로 중앙 정렬
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: #22c55e;
  opacity: 97%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  top: 50vh; // 세로 중앙 정렬
  transform: translateY(-50%); // 세로 중앙 정렬
  animation: ${(props) =>
      props.$position === 'top' ? slideInFromTop : slideInFromBottom}
    0.5s ease-out forwards;
`;

const ToastMessage = styled.p`
  font-size: 16px; // text-Body에 해당하는 크기
  color: white;
`;

export default function ToastPopup({ message, setToast, position }: any) {
  // 3초 뒤 toast를 false로 변경합니다.
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <ToastContainer>
      <ToastWrapper $position={position}>
        <ToastMessage>{message}</ToastMessage>
      </ToastWrapper>
    </ToastContainer>
  );
}
