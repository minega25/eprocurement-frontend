import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
  const model = [
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
        // {
        //   label: 'Tenders',
        //   icon: 'pi pi-fw pi-chart-pie',
        //   items: [
        //     {
        //       label: 'All Tenders',
        //       to: '/rentals',
        //     },
        //     {
        //       label: 'bids',
        //       to: '/bids',
        //     },
        //     {
        //       label: 'New Tender',
        //       to: '/rentals/new',
        //     },
        //     {
        //       label: 'Lookup Tender',
        //       to: '/rentals/rental-lookup',
        //     },
        //   ],
        // },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
};

export default AppMenu;

