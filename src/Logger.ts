import { defaultConfig } from './config';
import { appendFile } from 'fs';

export class Logger {
    private name: string;
    private configuration: LoggerConfiguration;
    private loggingMethods: ((level: LogLevel, message: string) => void)[] = [];

    constructor(name: string, configuration: LoggerConfiguration = defaultConfig) {
        this.name = name;
        this.configuration = configuration;

        if (this.configuration.console) this.loggingMethods.push(this.logToConsole);
        if (this.configuration.file) this.loggingMethods.push(this.logToFile);
    }

    log(level: LogLevel, ...strings: string[]) {
        const message = this.assembleMessage(level, ...strings);
        this.loggingMethods.forEach( f => f.call(this, level, message) );
    }

    info(...strings: string[]) {
        this.log(LogLevel.Info, ...strings);
    }

    debug(...strings: string[]) {
        this.log(LogLevel.Debug, ...strings);
    }

    warning(...strings: string[]) {
        this.log(LogLevel.Warning, ...strings);
    }

    error(...strings: string[]) {
        this.log(LogLevel.Error, ...strings);
    }

    private logToConsole(level: LogLevel, message: string) {
        if (this.configuration.colors) {
            console.log(this.assembleColorString(level), message);
        } else {
            console.log(message);
        }
    }

    private logToFile(level: LogLevel, message: string) {
        appendFile('log.txt', message + '\n', error => {
            if (error) throw error;
        });
    }

    private assembleMessage(level: LogLevel, ...strings: string[]): string {
        let message = this.name;
        if (this.configuration.logLevel) message += `[${LogLevel[level]}]`;
        message += ': ' + strings.join(' ');

        return message;
    }

    private assembleColorString(level: LogLevel, ...strings: string[]): string {
        const colorMap = new Map<LogLevel, number>([
            [LogLevel.Info, 32], // Green
            [LogLevel.Debug, 34], // Blue
            [LogLevel.Warning, 33], // Yellow
            [LogLevel.Error, 31], // Red
        ]);
        const colorString = `\x1b[${colorMap.get(level)}m%s\x1b[0m`;

        return colorString;
    }
}

export enum LogLevel {
    Info,
    Debug,
    Warning,
    Error
};

export interface LoggerConfiguration {
    console: boolean;
    file: boolean;
    colors: boolean;
    logLevel: boolean;
}