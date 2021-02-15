import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();
        const exResponse = exception.getResponse();
        const message = (typeof exResponse === 'object') ? exResponse : {statusCode: status, message: exResponse};
        response.status(status)
                .json({
                    ...message,
                    time: new Date().toISOString()
                });
    }
    
}