import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import logo from '../public/e-proc-logo.png';
import { LayoutState } from '../types/layout';
import AppMenu from './AppMenu';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

const AppSidebar = () => {
  const { setLayoutState } = useContext(LayoutContext);
  const anchor = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      anchored: !prevLayoutState.anchored,
    }));
  };
  return (
    <>
      <div className="sidebar-header">
        <Link href="/" className="app-logo text-lg text-uppercase">
          <Image src={logo} alt="asdf" width={180} height={130} />
        </Link>
        <button
          className="layout-sidebar-anchor p-link z-2 mb-2"
          type="button"
          onClick={anchor}
        ></button>
      </div>

      <div className="layout-menu-container">
        <MenuProvider>
          <AppMenu />
        </MenuProvider>
      </div>
    </>
  );
};

export default AppSidebar;

