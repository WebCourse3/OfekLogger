import {Logger, LogLevel} from './Logger';

const logger = new Logger('Yarin', {
    console: true,
    file: true,
    colors: true,
    logLevel: true,
});

logger.info('Yoo!', "Man");