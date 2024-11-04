import styled from 'styled-components';

import Login from './Login';
import './slick.css';

const OnboardingWrap = styled.div`
  height: 100vh;
`;
const Onboarding = () => {
  return (
    <OnboardingWrap>
      <Login />
    </OnboardingWrap>
  );
};

export default Onboarding;
