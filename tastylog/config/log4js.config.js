const path = require('path')
const LOG_ROOT_DIR = process.env.LOG_ROOT_DIR || path.join(__dirname, '../logs')
module.exports = {
  appenders: {
    ConsoleLogAppnder: {
      type: 'console',
    },
    ApplicationLogAppnder: {
      type: 'dateFile',
      filename: path.join(LOG_ROOT_DIR, './application.log'),
      pattern: 'yyyyMMdd',
      daysToKeep: 7,
    },
  },
  categories: {
    default: {
      appenders: ['ConsoleLogAppnder'],
      level: 'ALL',
    },
    application: {
      appenders: ['ConsoleLogAppnder', 'ApplicationLogAppnder'],
      level: 'INFO',
    },
  },
}
