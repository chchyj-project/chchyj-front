import React, { ReactNode } from 'react';
import { AppContainer } from '../style/Common.ts';
import ReportModal from './modal/ReportModal.tsx';
import HeartGuideModal from '../components/modal/HeartGuideModal.tsx';
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppContainer>
      {children}
      <ReportModal />
      {/* <HelpModal /> */}
      <HeartGuideModal />
    </AppContainer>
  );
};

export default Layout;
