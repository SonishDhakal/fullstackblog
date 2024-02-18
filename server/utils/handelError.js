

export function handelError(code,message){
    const error = new Error();

    error.statusCode = code
    error.message= message

    return error

}