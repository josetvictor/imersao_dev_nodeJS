const BaseRoute = require("./base/baseRoutes")

class HeroRoutes extends BaseRoute {
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path:'/herois',
            method: 'GET',
            handler: (request, headers)=> {
                try {
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query

                    let query = {}
                    if(nome) {
                        query.nome = nome
                    }

                    if(isNaN(skip))
                        throw Error('O tipo do skip ~e incorreto')

                    if(isNaN(limit))
                        throw Error('O tipo do limit é incorreto')

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                } catch (error) {
                    console.log('Deu ruim!!', error)
                    return "Erro interno no servidor"
                }
            }
        }
    }
}

module.exports = HeroRoutes