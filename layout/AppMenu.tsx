import { useEffect, useState } from 'react';
import AppSubMenu from './AppSubMenu';
import useAuth from './hooks/useAuth';

const AppMenu = () => {
  const { user } = useAuth();
  const [availableMenus, setAvailableMenus] = useState<any>([]);

  useEffect(() => {
    if (user.role === 'admin') {
      setAvailableMenus([
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          items: [
            {
              label: 'Home',
              icon: 'pi pi-fw pi-home',
              to: '/',
            },
            {
              label: 'Requests',
              icon: 'pi pi-fw pi-box',
              items: [
                {
                  label: 'All Requests',
                  to: '/procurement_requests',
                },
                {
                  label: 'Pending Requests',
                  to: '/procurement_requests/pending',
                },
                {
                  label: 'New Request',
                  to: '/procurement_requests/new',
                },
              ],
            },
            {
              label: 'Tenders',
              icon: 'pi pi-fw pi-chart-pie',
              items: [
                {
                  label: 'All Tenders',
                  to: '/tenders',
                },
                {
                  label: 'Unpublished Tenders',
                  to: '/tenders/unpublished',
                },
                {
                  label: 'New Tender',
                  to: '/tenders/new',
                },
              ],
            },
            {
              label: 'User management',
              icon: 'pi pi-fw pi-chart-pie',
              items: [
                {
                  label: 'All Users',
                  to: '/profile/list',
                },
                {
                  label: 'Add User',
                  to: '/profile/create',
                },
                {
                  label: 'Authorize Users',
                  to: '/profile/authorized',
                },
                {
                  label: 'Edit User',
                  to: '/profile/edit',
                },
              ],
            },
          ],
        },
      ]);
    }
    if (user.role === 'proc_officer') {
      setAvailableMenus([
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          items: [
            {
              label: 'Home',
              icon: 'pi pi-fw pi-home',
              to: '/',
            },
            {
              label: 'Requests',
              icon: 'pi pi-fw pi-box',
              items: [
                {
                  label: 'All Requests',
                  to: '/procurement_requests',
                },
                {
                  label: 'New Request',
                  to: '/procurement_requests/new',
                },
              ],
            },
            {
              label: 'Tenders',
              icon: 'pi pi-fw pi-chart-pie',
              items: [
                {
                  label: 'All Tenders',
                  to: '/tenders',
                },
                {
                  label: 'Unpublished Tenders',
                  to: '/tenders/pending',
                },
                {
                  label: 'New Tender',
                  to: '/tenders/new',
                },
              ],
            },
          ],
        },
      ]);
    }

    if (user.role === 'staff') {
      setAvailableMenus([
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          items: [
            {
              label: 'Home',
              icon: 'pi pi-fw pi-home',
              to: '/',
            },
            {
              label: 'Tenders',
              icon: 'pi pi-fw pi-chart-pie',
              items: [
                {
                  label: 'All Tenders',
                  to: '/tenders',
                },
                {
                  label: 'New Tender',
                  to: '/tenders/new',
                },
              ],
            },
          ],
        },
      ]);
    }
  }, [user]);

  //@ts-ignore
  return <AppSubMenu model={availableMenus} />;
};

export default AppMenu;

