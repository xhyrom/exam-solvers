class Error {
    constructor(prefix, error) {
        console.log(`%c${prefix} `+`%c${error}`,`color:red`,`color:white`)
    }
}

module.exports = Error;
