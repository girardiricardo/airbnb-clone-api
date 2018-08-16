'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

const Url = require('url-parse')
const DATABASE_URL = new Url(Env.get('DATABASE_URL'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'pg'),

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'DATABASE_URL.host'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'DATABASE_URL.username'),
      password: Env.get('DB_PASSWORD', 'DATABASE_URL.password'),
      database: Env.get('DB_DATABASE', 'DATABASE_URL.pathname.substr(1)')
    },
    debug: Env.get('DB_DEBUG', false)
  }
}
