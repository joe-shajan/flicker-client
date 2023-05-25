import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { SettingsLayout } from '@/components/Layout/ProfileLayout';
import { lazyImport } from '@/utils/lazyImport';
const { Editor } = lazyImport(() => import('@/features/editor'), 'Editor');

const Settings = () => {
  return (
    <SettingsLayout>
      <Suspense
        fallback={
          <div className='h-full w-full flex items-center justify-center'>
            {/* <Spinner size="sm" /> */}
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </SettingsLayout>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>profile</h1>
      <button
        onClick={() => navigate('/docs')}
        className='bg-black text-white p-3 rounded-xl content-center'
      >
        go back to docs
      </button>
    </div>
  );
};

const MyPlan = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>Myplan</h1>
      <button
        onClick={() => navigate('/docs')}
        className='bg-black text-white p-3 rounded-xl content-center'
      >
        go back to docs
      </button>
    </div>
  );
};

const Docs = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 pt-8'>
      <h1 className='text-4xl'>docs</h1>
      <button
        onClick={() => navigate('/docs/12342332')}
        className='bg-black text-white p-3 rounded-xl content-center'
      >
        Go to editor
      </button>
    </div>
  );
};

export const protectedRoutes = [
  {
    path: '/docs',
    element: <Docs />,
  },
  {
    path: '/docs/:id',
    element: <Editor />,
  },
  {
    path: '/settings',
    element: <Settings />,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'my-plan', element: <MyPlan /> },
    ],
  },
];
