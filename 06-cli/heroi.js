class Heroi {
    constructor({nome, poder, id}){
        this.nome = nome,
        this.poder = poder,
        id ? this.id = id : false
    }
}

module.exports = Heroi