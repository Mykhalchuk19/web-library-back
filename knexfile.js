module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'mypassword',
      database: 'library',
    },
    migrations: {
      directory: './src/database/migrations/',
    },
    seeds: {
      directory: './src/database/',
    },
    test: {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'mypassword',
        database: 'library',
      },
    },
  },
};
