const ICrud = require("../interfaces/ICrud")

class Context extends ICrud {
    constructor(database){
        super()
        this._database = database
    }

    // Connections
    isConnected(){
        return this._database.isConnected()
    }

    static connect(){
        return this._database.connect()
    }

    // CRUD
    create(item){
        return this._database.create(item)
    }

    read(item, skip, limit) {
        return this._database.read(item, skip, limit)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id){
        return this._database.delete(id)
    }
}

module.exports = Context