import {Logger, LogLevel} from './Logger';

const logger = new Logger('Yarin', {
    console: true,
    file: true,
    colors: true,
    logLevel: true,
});

logger.error('Yoo!', "Man");
logger.info('Yoo!', "Man");
logger.debug('Yoo!', "Man");
logger.warning('Yoo!', "Man");