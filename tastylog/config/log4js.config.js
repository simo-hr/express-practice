module.exports = {
  appenders: {
    ConsoleLogAppnder: {
      type: 'console',
    },
  },
  categories: {
    default: {
      appenders: ['ConsoleLogAppnder'],
      level: 'ALL',
    },
  },
}
