import styled from 'styled-components';
import Home from './pages/Home';
import { GlobalStyle } from './global-style';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Onboarding from './pages/Login/Onboarding.tsx';
import LoginCallback from './pages/Login/LoginCallback.tsx';
import SetNickName from './pages/Login/SetNickName.tsx';
import PraiseDetail from './pages/PraiseDetail.tsx';
import Profile from './pages/Profile.tsx';
import ReportModal from './components/ReportModal.tsx';

const AppWrap = styled.div`
  width: 100%;
  max-width: 768px; /* 최대 너비 제한 */
  margin: 0 auto;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  box-sizing: border-box;
`;
const App = () => {
  return (
    <BrowserRouter>
      <AppWrap>
        <GlobalStyle />
        <ReportModal />

        <Routes>
          <Route path="*" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Onboarding />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/login/nickname" element={<SetNickName />} />
          <Route path="/post/:postId" element={<PraiseDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AppWrap>
    </BrowserRouter>
  );
};

export default App;
