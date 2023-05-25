// import { lazyImport } from "@/utils/lazyImport";

// const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const AuthRoutes = () => {
  return <div>auth route</div>;
};

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];
