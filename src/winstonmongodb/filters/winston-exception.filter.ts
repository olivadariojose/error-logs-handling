import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { WinstonmongodbService } from '../winstonmongodb.service';

@Catch()
export class WinstonExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: WinstonmongodbService) { }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Winston: Error interno del servidor';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            // const responseMessage = exception.getResponse();
            const responseContent = exception.getResponse();
            // message = typeof responseMessage === 'string' ? responseMessage : JSON.stringify(responseMessage);
            message = typeof responseContent === 'string' ? responseContent : responseContent['message'];
        }

        // Loggear el error en Winston
        this.logger.error({
            serviceName: 'WinstonExceptionFilter',
            serviceMethod: 'WinstonExceptionFilter',
            message: message
        })

        response.status(status).json({
            statusCode: status,
            message: message,
        });
    }
}
