import { setModules } from "reactor/router/modules-list";

setModules([
  {
    path: '/admin',
    name: 'admin',
    modules: [
      {
        entry: ['/users', '/login'],
        module: 'users',
      },
      {
        entry: ['/categories'],
        module: 'categories',
      },
      {
        entry: ['/meals'],
        module: 'meals',
      },
      {
        entry: ['/customers'],
        module: 'customers',
      },
      {
        entry: ['/deliveryMen'],
        module: 'deliveryMen',
      },
      {
        entry: ['/districts'],
        module: 'districts',
      },
      {
        entry: ['/coupons'],
        module: 'coupons',
      },
      {
        entry: ['/orders'],
        module: 'orders',
      },
      {
        entry: ['/reports'],
        module: 'reports',
      },
      {
        entry: ['/sizes'],
        module: 'sizes',
      },
      {
        entry: ['/campaigns'],
        module: 'campaigns',
      },
      {
        entry: ['/pages'],
        module: 'pages',
      },
      {
        entry: ['/settings'],
        module: 'settings',
      },
      {
        entry: ['/contact-us'],
        module: 'contactUs',
      },
      {
        entry: ['/newsletter'],
        module: 'newsletter',
      },
      {
        entry: ['/side-dishes'],
        module: 'sideDishes',
      },
      {
        entry: ['/', '/access-denied'],
        module: 'home',
      },
    ]
  },
  {
    path: '/',
    name: 'front-office',
    modules: [
      {
        entry: ['/menu'],
        module: 'menu',
      },
      {
        entry: [
          "/login",
          "/register",
          "/forget-password",
          "/reset-password",
          "/account",
          "/checkout",
          "/payment",
          "/orders",
        ],
        module: "customers",
      },
      {
        entry: ["/", "/about-us", "/contact-us", "/test", "/offers"],
        module: "home",
      },
      {
        entry: ["/meals"],
        module: "meal",
      },
    ]
  }
]);