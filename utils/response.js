const getResponse = ({code = 200, message = '', data}) => {
    
    return {
        code,
        message,
        data,
    }
}