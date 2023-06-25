export interface ErrorObject {
    error: Error;
    functionName: string;
    data?: any;
}

const ErrorHandler = (error: ErrorObject) => {
    const message = error.error.message;
    const functionName = error.functionName;
    const data = error.data;

    console.log({
        message,
        functionName,
    })
}

export default ErrorHandler;