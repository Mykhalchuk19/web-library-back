module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
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
        host: 'us-cdbr-east-02.cleardb.com',
        user: 'bd4a07437e8af4',
        password: '30b76409',
        database: 'heroku_c2d402c8217e727',
      },
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: 'us-cdbr-east-02.cleardb.com',
      user: 'bd4a07437e8af4',
      password: '30b76409',
      database: 'heroku_c2d402c8217e727',
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
        host: 'us-cdbr-east-02.cleardb.com',
        user: 'bd4a07437e8af4',
        password: '30b76409',
        database: 'heroku_c2d402c8217e727',
      },
    },
  },
};
