import clsx from 'clsx';
import { Folder, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return <div className='fixed shadow w-full h-16 flex justify-end items-center pr-6'>Header</div>;
};

type SideNavigationItem = {
  name: string;
  to: string;
  icon: any;
};

const SideNavigation = () => {
  //   const { checkAccess } = useAuthorization();
  const navigation = [
    { name: 'Profile', to: './profile', icon: Home },
    { name: 'My-plan', to: './my-plan', icon: Folder },
    // checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
    //   name: 'Users',
    //   to: './users',
    //   icon: UsersIcon,
    // },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={clsx(
            'text-gray-900 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
          )}
          //   activeClassName="bg-gray-900 text-white"
        >
          <item.icon
            className={clsx(
              'text-gray-900 group-hover:text-gray-900',
              'mr-4 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden='true'
          />
          {item.name}
        </NavLink>
      ))}
    </>
  );
};

const Sidebar = () => {
  return (
    <div className='hidden md:flex md:flex-shrink-0 border-r'>
      <div className='flex flex-col w-64'>
        <div className='flex flex-col h-0 flex-1'>
          <div className='flex items-center h-16 flex-shrink-0 px-4 bg-slate-200'></div>
          <div className='flex-1 flex flex-col overflow-y-auto'>
            <nav className='flex-1 px-2 py-4 bg-slate-200 space-y-1'>
              <SideNavigation />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

type SettingsLayoutProps = {
  children: React.ReactNode;
};

const SettingsCard = ({ children }: SettingsLayoutProps) => {
  return (
    <div className='h-[500px] w-[900px] flex overflow-hidden rounded-lg bg-gray-100'>
      <Sidebar />
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        {/* <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <div className="flex-1 px-4 flex justify-end">
          <div className="ml-4 flex items-center md:ml-6">
            <UserNavigation />
          </div>
        </div>
      </div> */}
        <main className='flex-1 relative overflow-y-auto focus:outline-none'>{children}</main>
      </div>
    </div>
  );
};

export const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <>
      <Header />
      <div className='flex justify-center items-center h-screen pt-16'>
        <SettingsCard>{children}</SettingsCard>
      </div>
    </>
  );
};
