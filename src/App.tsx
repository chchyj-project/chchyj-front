import routes from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Page from './components/layout/Page.tsx';

const router = createBrowserRouter(routes);

function App() {
  return (
    <Page>
      <RouterProvider router={router} />
      {/*<Global styles={globalStyle} />*/}
    </Page>
  );
}

export default App;
