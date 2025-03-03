import React from 'react';
import styled from 'styled-components';

// 가장 바깥쪽 컨테이너
const FairyContainer = styled.div`
  width: 5rem; /* w-20 */
  height: 5rem; /* h-20 */
  flex-shrink: 0;
`;

// 하얀 테두리 원형 배경
const CircleWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 9999px; /* rounded-full */
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// 파란 배경 원형
const BlueCircle = styled.div`
  width: 4rem; /* w-16 */
  height: 4rem; /* h-16 */
  border-radius: 9999px; /* rounded-full */
  background-color: #dbeafe; /* bg-blue-100 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 얼굴 컨테이너
const FaceContainer = styled.div`
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  position: relative;
`;

// 얼굴 (흰색 둥근 원형)
const Face = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px; /* rounded-full */
  background-color: white;
  border: 2px solid #93c5fd; /* border-2 border-blue-300 */
`;

// 입 (빨간색 반원)
const Mouth = styled.div`
  position: absolute;
  bottom: 0.25rem; /* bottom-1 */
  left: 50%;
  transform: translateX(-50%);
  width: 1rem; /* w-4 */
  height: 0.5rem; /* h-2 */
  background-color: #f87171; /* bg-red-400 */
  border-radius: 9999px; /* rounded-full */
`;

// 왼쪽 눈
const LeftEye = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  width: 0.25rem; /* w-1 */
  height: 0.25rem; /* h-1 */
  background-color: black;
  border-radius: 9999px; /* rounded-full */
`;

// 오른쪽 눈
const RightEye = styled.div`
  position: absolute;
  top: 50%;
  right: 25%;
  width: 0.25rem; /* w-1 */
  height: 0.25rem; /* h-1 */
  background-color: black;
  border-radius: 9999px; /* rounded-full */
`;

// 모자 (파란색 반원)
const Hat = styled.div`
  position: absolute;
  top: -0.5rem; /* -top-2 */
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem; /* w-6 */
  height: 1.5rem; /* h-6 */
  background-color: #60a5fa; /* bg-blue-400 */
  border-radius: 9999px; /* rounded-full */
`;

// 칭찬요정 컴포넌트
const PraiseFairy = () => {
  return (
    <FairyContainer>
      <CircleWrapper>
        <BlueCircle>
          <FaceContainer>
            <Face>
              <Mouth />
              <LeftEye />
              <RightEye />
            </Face>
            <Hat />
          </FaceContainer>
        </BlueCircle>
      </CircleWrapper>
    </FairyContainer>
  );
};

export default PraiseFairy;
