const connection = {
  user:     'root',
  password: 'example',
  database: 'reference-manager',
}

module.exports = {
  development: {
    client: 'mysql2',
    connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'mysql2',
    connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
