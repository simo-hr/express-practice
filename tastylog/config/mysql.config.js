module.exports = {
  HOST: process.env.MYSQL_HOST || '127.0.0.1',
  POST: process.env.MYSQL_POST || '3306',
  USERNAME: process.env.MYSQL_USERNAME || 'admin',
  PASSWORD: process.env.MYSQL_PASSWORD || 'Passw0rd',
  DATABASE: process.env.MYSQL_DATABASE || 'tastylog',
}
