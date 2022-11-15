import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { Home, LoginPage, RegisterPage } from '../views';
import { ProtectRoute } from '../components';

export const baseUrl = {
  home: '/home',
  loginPage: '/login',
  registerPage: '/register',
};

export const paths: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to={baseUrl.home} replace />,
  },
  {
    path: baseUrl.home,
    element: (
      <ProtectRoute>
        <Home />
      </ProtectRoute>
    ),
  },
  {
    path: baseUrl.loginPage,
    element: <LoginPage />,
  },
  {
    path: baseUrl.registerPage,
    element: <RegisterPage />,
  },
];
