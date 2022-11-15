import React from 'react';
import { paths } from './config';
import { useRoutes } from 'react-router-dom';

export const App = () => {
  const element = useRoutes(paths);

  return <>{element}</>;
};
