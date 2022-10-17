const reqReceivedLogger = (req, res, next) => {
    if (req) {
        console.log(`Request received from client`)
    }
    next();
}

module.exports = reqReceivedLogger;