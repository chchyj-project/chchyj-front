import React, { ReactNode } from 'react';
import { AppContainer } from '../style/Common.ts';
import ReportModal from './ReportModal';

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
