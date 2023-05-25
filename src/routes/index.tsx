import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

const Pricing = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>Pricing page</h1>
    </div>
  );
};

export const AppRoutes = () => {
  // const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/pricing', element: <Pricing /> },
  ];

  // const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...protectedRoutes, ...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
