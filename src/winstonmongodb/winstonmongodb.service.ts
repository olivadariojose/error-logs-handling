import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import 'winston-mongodb'
import { envs } from 'src/config/envs';
import { LoggerPayload } from './interfaces/interfaces';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue',
    },
};

@Injectable()
export class WinstonmongodbService {


    // ? DECLARAMOS EL TIPO (logger es de tipo winston logger)
    private readonly logger: winston.Logger

    constructor() {



        const logsDir = 'logs'
        const rootPath = process.cwd()
        const logsDirPath = path.join(rootPath, logsDir,)


        const now = new Date()
        const year = now.getFullYear().toString()
        const month = (now.getMonth()+1).toString().padStart(2,'0')
        const day = now.getDate().toString().padStart(2,'0')
        const fullDirPath = path.join(logsDirPath, year, month, day);
        fs.mkdirSync(fullDirPath, { recursive: true });

        const transportRotatingFile = new DailyRotateFile({
            level: 'http',
            // filename: '%DATE%/application.log', // esto crea subcarpetas por fecha
            filename: 'application.log', // esto crea subcarpetas por fecha
            // datePattern: 'YYYY/MM/DD',          // subdirectorios por año, mes y día
            // dirname: logsDir,
            dirname: fullDirPath,
            zippedArchive: false,
            maxSize: '50m',
            // los archivos mas antiguos que 14 dias seran elimiandos
            maxFiles: '14d',
            format: winston.format.uncolorize(),
          });
          transportRotatingFile.on('error', (err) => {
            console.error('Error in DailyRotateFile transport:', err);
          });

        this.logger = winston.createLogger({
            level: 'debug',
            levels: customLevels.levels,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message, }) => {
                    return `${timestamp}-${level}:-${message}`
                })
            ),
            transports: [
                transportRotatingFile,
                // new winston.transports.File({
                //     level: 'http',
                //     filename: 'application.log',
                //     dirname: logsDirPath,
                //     format: winston.format.uncolorize()
                // }),
                new winston.transports.MongoDB({
                    level: 'http',
                    db: envs.mongodburi,
                    collection: 'logs',
                    format: winston.format.json()
                }),
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize({ all: true, colors: customLevels.colors }),
                        winston.format.printf(({ timestamp, level, message }) => {
                            return `${timestamp}-${level}:-${message}`
                        })
                    )
                })
            ]
        })

        this.logger.on('error', (error) => {
            // this.logger.error(this.serviceName, 'this.logger = winston.createLogger', `Error en Winston logger: `, error)
            // console.log(error)
            console.error('[Winston Error]', error);
        })

        
        //  ? EMITIMOS UN ERROR PARA PROBAR
        // this.logger.emit('error', new Error('Algo salio mal en Winston logger'));
    }


    error(payload: LoggerPayload) {
        const { serviceName, serviceMethod, message, trace } = payload
        const logMessage = `${serviceName}-${serviceMethod}-${message}-trace:${trace}`
        this.logger.error(logMessage);
    }

    warn(payload: LoggerPayload) {
        const { serviceName, serviceMethod, message, trace } = payload
        const logMessage = `${serviceName}-${serviceMethod}-${message}-trace:${trace}`
        // this.logger.info(message);
        this.logger.warn(logMessage);
    }

    // info(message: string) {
    info(payload: LoggerPayload) {
        const { serviceName, serviceMethod, message, trace } = payload
        const logMessage = `${serviceName}-${serviceMethod}-${message}-trace:${trace}`

        // this.logger.info(message);
        this.logger.info(logMessage);
    }

    debug(payload: LoggerPayload) {
        const { serviceName, serviceMethod, message, trace } = payload
        const logMessage = `${serviceName}-${serviceMethod}-${message}-trace:${trace}`
        // this.logger.info(message);
        this.logger.debug(logMessage);
    }

    http(payload: LoggerPayload) {
        const { serviceName, serviceMethod, message, trace } = payload
        const logMessage = `${serviceName}-${serviceMethod}-${message}-trace:${trace}`
        // this.logger.info(message);
        this.logger.http(logMessage);
    }


}
