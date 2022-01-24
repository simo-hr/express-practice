export default {
  HOST: process.env.MYSQL_HOST || '127.0.0.1',
  USERNAME: process.env.MYSQL_USERNAME || 'admin',
  PASSWORD: process.env.MYSQL_PASSWORD || 'Passw0rd',
  DATABASE: process.env.MYSQL_DATABASE || 'tastylog',
  CONNECTION_LIMIT: process.env.CONNECTION_LIMIT ? parseInt(process.env.CONNECTION_LIMIT) : 10,
  QUEUE_LIMIT: process.env.QUEUE_LIMIT ? parseInt(process.env.QUEUE_LIMIT) : 0,
}
