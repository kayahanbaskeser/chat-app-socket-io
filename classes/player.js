const uuidV4 = require('uuid/v4')

class Player {
    constructor() {
        this.uuid = uuidV4()
        this.name = "";
    }
}

module.exports = Player