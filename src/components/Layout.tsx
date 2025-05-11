import React, { ReactNode } from 'react';
import { AppContainer } from '../style/Common.ts';
import ReportModal from './modal/ReportModal.tsx';
import HelpModal from '../components/modal/HelpModal.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppContainer>
      {children}
      <ReportModal />
      <HelpModal />
    </AppContainer>
  );
};

export default Layout;
