const {format} = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const { log } = require('console')

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const logMessage = `${dateTime} - ${message}\n`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

try {

    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
} catch (error) {
    console.log(err)
}

}

const logger = (req, res, next) => {
    logEvents(`Request Method: ${req.method}, Request URL: ${req.url}`, 'requests.log')
}