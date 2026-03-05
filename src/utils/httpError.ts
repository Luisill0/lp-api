export class HttpError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

    public static fromUnkown(error:unknown): HttpError {
        if(error instanceof HttpError) {
            return error;
        }
        else return new HttpError("An unexpected error occurred.", 500);
    }
}