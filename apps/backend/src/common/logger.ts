import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import colors from 'colors/safe';

const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:MM:SS',
  }),
  winston.format.errors({ stack: true }),
  winston.format((info) => {
    info.level = info.level.toUpperCase();
    info.timestamp = colors.blue(info.timestamp);
    info.context = colors.yellow(info.context);

    return info;
  })(),
  winston.format.colorize(),
  winston.format.printf((info) => {
    const { level, message, timestamp, context, ...stringifiedRest } = info;
    const padding = (info.padding && info.padding[info.level]) || '';

    const restStr =
      Object.keys(stringifiedRest).length === 0
        ? ''
        : ' ' + JSON.stringify(stringifiedRest);

    return (
      `[${timestamp}] ${level} <${context}>:${padding} ${message}` + restStr
    );
  })
);

const simpleFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:MM:SS',
  })
);

export const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format,
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    }),
    new winston.transports.File({
      filename: `info-${new Date().toISOString()}.log`,
      dirname: 'logs',
      handleExceptions: true,
      level: 'info',
      format: simpleFormat,
    }),
    new winston.transports.File({
      filename: `error-${new Date().toISOString()}.log`,
      dirname: 'logs',
      handleExceptions: true,
      level: 'error',
      format: simpleFormat,
    }),
  ],
});
