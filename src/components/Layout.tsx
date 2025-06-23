import React, { ReactNode } from 'react';
import { AppContainer } from '../style/Common.ts';
import HeartGuideModal from '../components/modal/HeartGuideModal.tsx';
import ReportModal from '../components/modal/ReportModal.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppContainer>
      {children}
      {/* <HelpModal /> */}
      <HeartGuideModal />
      <ReportModal />
    </AppContainer>
  );
};

export default Layout;
