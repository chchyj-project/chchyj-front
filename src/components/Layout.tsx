import React, { ReactNode } from 'react';
import { AppContainer } from '../style/Common.ts';
import ReportModal from './modal/ReportModal.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppContainer>
      {children}
      <ReportModal />
    </AppContainer>
  );
};

export default Layout;
