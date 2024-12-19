const logLevels = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

const formatMessage = (level, message, meta = {}) => {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta
  };
};

export const logger = {
  error: (message, meta) => {
    console.error(JSON.stringify(formatMessage(logLevels.ERROR, message, meta)));
  },
  warn: (message, meta) => {
    console.warn(JSON.stringify(formatMessage(logLevels.WARN, message, meta)));
  },
  info: (message, meta) => {
    console.info(JSON.stringify(formatMessage(logLevels.INFO, message, meta)));
  },
  debug: (message, meta) => {
    console.debug(JSON.stringify(formatMessage(logLevels.DEBUG, message, meta)));
  }
};