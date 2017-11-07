export class Logger {
    private name: string;
    private configuration: LoggerConfiguration;
    private colorMap = new Map<LogLevel, number>([
        [LogLevel.Info, 32], // Green
        [LogLevel.Debug, 34], // Blue
        [LogLevel.Warning, 33], // Yellow
        [LogLevel.Error, 31], // Red
    ]);

    constructor(name: string, configuration: LoggerConfiguration) {
        this.name = name;
        this.configuration = configuration;
    }

    log(level: LogLevel, ...strings: string[]) {
        if (this.configuration.console) {
            console.log(`\x1b[${this.colorMap.get(level)}m%s\x1b[0m`, strings.join(' '));
        }

        if (this.configuration.file) {

        }
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
    logLevel: boolean; //WTF?
}