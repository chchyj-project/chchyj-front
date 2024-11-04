import { Outlet } from 'react-router-dom';
import Page from './layout/Page.tsx';
import { Layout } from 'lucide-react';

export default function RouterLayout() {
  return (
    <Page>
      <Layout>
        <Outlet />
      </Layout>
    </Page>
  );
}
