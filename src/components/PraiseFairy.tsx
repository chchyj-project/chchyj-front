import React from 'react';
import {
  FairyContainer,
  CircleWrapper,
  BlueCircle,
  FaceContainer,
  Face,
  Mouth,
  LeftEye,
  RightEye,
  Hat,
} from './PraiseFairy.styles.ts';

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
