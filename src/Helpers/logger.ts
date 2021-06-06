import * as bunyan from 'bunyan'
export const getLogger = (name: string) => {
    return bunyan.createLogger({
        name,
        level: process.env.LOG_LEVEL as bunyan.LogLevel || 'info',
        src: true
    })
}