import React, { ReactNode } from 'react';
import { AppContainer } from '../style/Common.ts';
import HeartGuideModal from '../components/modal/HeartGuideModal.tsx';
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppContainer>
      {children}
      {/* <HelpModal /> */}
      <HeartGuideModal />
    </AppContainer>
  );
};

export default Layout;
