import styled from 'styled-components';
import Home from './pages/Home';
import { GlobalStyle } from './global-style';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Onboarding from './pages/Login/Onboarding.tsx';
import LoginCallback from './pages/Login/LoginCallback.tsx';
import SetNickName from './pages/Login/SetNickName.tsx';

const AppWrap = styled.div`
  //height: 100vh;
  width: 480px;
  margin: 0 auto;
`;
const App = () => {
  return (
    <BrowserRouter>
      <AppWrap>
        <GlobalStyle />
        <Routes>
          <Route path="*" element={<Navigate replace to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Onboarding />} />

          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/login/nickname" element={<SetNickName />} />
        </Routes>
      </AppWrap>
    </BrowserRouter>
  );
};

export default App;
