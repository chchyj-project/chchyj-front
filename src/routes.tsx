import RouterLayout from './ui/components/RouterLayout.tsx';
import PATH from './config/urls.ts';
import MainPage from './ui/pages/MainPage.tsx';

const routes = [
  {
    path: '/', // 기본 경로 설정

    element: <RouterLayout />,
    children: [
      { path: PATH.HOME, element: <MainPage /> },
      // { path: PATH.SIGN_IN, element: <SigninPage /> },
      // { path: PATH.SIGN_UP, element: <SignupPage /> },
      // { path: PATH.CALENDAR, element: <CalendarPage /> },
      // { path: PATH.TIMELINE, element: <TimelinePage /> },
      // { path: PATH.REPORT, element: <ReportPage /> },
      // { path: PATH.SETTING, element: <SettingPage /> },
    ],
  },
];

export default routes;
