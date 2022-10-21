import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { Home, LoginPage } from '../views';

export const baseUrl = {
  home: '/home',
  loginPage: '/login',
};

export const paths: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to={baseUrl.home} replace />,
  },
  {
    path: baseUrl.home,
    element: <Home />,
  },
  {
    path: baseUrl.loginPage,
    element: <LoginPage />,
  },
];
