class ResponseClass {
    constructor(ok, message, error, data){
        this.ok = ok
        this.message = message
        this.error = error
        this.data = data
    }

    get getOk() {
        return this.ok
    }

    get getMessage() {
        return this.message
    }

    get getError() {
        return this.error
    }

    get getData() {
        return this.data
    }
}

module.exports = ResponseClass