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
        entry: ['/customers'],
        module: 'customers',
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
        entry: ['/reports'],
        module: 'reports',
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
        entry: ["/", "/about-us", "/contact-us"],
        module: "home",
      },
    ]
  }
]);