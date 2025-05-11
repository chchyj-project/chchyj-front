import React, { ReactNode } from 'react';
import { AppContainer } from '../style/Common.ts';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <AppContainer>{children}</AppContainer>;
};

export default Layout;
