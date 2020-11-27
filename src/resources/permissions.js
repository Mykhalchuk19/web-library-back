module.exports = [
  {
    name: 'User',
    permissions: [
      {
        module: 'users',
        read: 1,
        create: 0,
        update: 0,
        delete: 0,
      },
      {
        module: 'categories',
        read: 1,
        create: 0,
        update: 0,
        delete: 0,
      },
      {
        module: 'books',
        read: 1,
        create: 0,
        update: 0,
        delete: 0,
      },
      {
        module: 'authors',
        read: 1,
        create: 0,
        update: 0,
        delete: 0,
      },
    ],
  },
  {
    name: 'Manager',
    permissions: [
      {
        module: 'users',
        read: 1,
        create: 0,
        update: 0,
        delete: 0,
      },
      {
        module: 'categories',
        read: 1,
        create: 1,
        update: 1,
        delete: 1,
      },
      {
        module: 'books',
        read: 1,
        create: 1,
        update: 1,
        delete: 1,
      },
      {
        module: 'authors',
        read: 1,
        create: 1,
        update: 1,
        delete: 1,
      },
    ],
  },
  {
    name: 'Admin',
    permissions: [
      {
        module: 'users',
        read: 1,
        create: 1,
        update: 1,
        delete: 1,
      },
      {
        module: 'categories',
        read: 1,
        create: 1,
        update: 1,
        delete: 1,
      },
      {
        module: 'books',
        read: 1,
        create: 1,
        update: 1,
        delete: 1,
      },
      {
        module: 'authors',
        read: 1,
        create: 1,
        update: 1,
        delete: 1,
      },
    ],
  },
];
