import styled from 'styled-components';
import Home from './pages/HomePage.tsx';
import { GlobalStyle } from './global-style';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Onboarding from './pages/Login/Onboarding.tsx';
import LoginCallback from './pages/Login/LoginCallback.tsx';
import SetNickName from './pages/Login/SetNickName.tsx';
import PraiseDetail from './pages/PraiseDetailPage.tsx';
import Profile from './pages/MyProfilePage.tsx';
import { ToastContainer, toast } from 'react-toastify';
import MyPraiseCollectionPage from './pages/MyPraiseCollectionPage.tsx';
import { PopupProvider } from './context/PopupContext.tsx';
import { AppContainer } from './style/Common.ts';
import Layout from './components/Layout.tsx';

const App = () => {
  return (
    <PopupProvider>
      <BrowserRouter>
        <Layout>
          <GlobalStyle />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{
              width: '90%',
              maxWidth: '400px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            toastStyle={{
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '14px',
            }}
          />

          <Routes>
            <Route path="*" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Onboarding />} />
            <Route path="/login/callback" element={<LoginCallback />} />
            <Route path="/login/nickname" element={<SetNickName />} />
            <Route path="/post/:postId" element={<PraiseDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-collection" element={<MyPraiseCollectionPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </PopupProvider>
  );
};

export default App;
