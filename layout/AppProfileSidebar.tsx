//@ts-nocheck
import { useRouter } from 'next/navigation';
import { Sidebar } from 'primereact/sidebar';
import { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import useAuth from './hooks/useAuth';

const AppProfileSidebar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { layoutState, setLayoutState } = useContext(LayoutContext);

  const onProfileSidebarHide = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      profileSidebarVisible: false,
    }));
  };

  return (
    <Sidebar
      visible={layoutState.profileSidebarVisible}
      onHide={onProfileSidebarHide}
      position="right"
      className="layout-profile-sidebar w-full sm:w-25rem"
    >
      <div className="flex flex-column mx-auto md:mx-0">
        <span className="mb-2 font-semibold">Welcome</span>
        <span className="text-color-secondary font-medium mb-5">
          {user?.firstName || ''} ({user?.role})
        </span>

        <ul className="list-none m-0 p-0">
          <li>
            <a className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
              <span>
                <i className="pi pi-power-off text-xl text-primary"></i>
              </span>
              <div className="ml-3">
                <span
                  className="mb-2 font-semibold"
                  onClick={() => {
                    logout();
                    router.push('/auth/login');
                  }}
                >
                  Sign Out
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default AppProfileSidebar;

