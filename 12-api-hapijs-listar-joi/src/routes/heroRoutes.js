const BaseRoute = require("./base/baseRoutes")
const Joi = require('@hapi/joi')

class HeroRoutes extends BaseRoute {
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path:'/herois',
            method: 'GET',
            options: {
                validate: {
                    failAction: (request, headers, erro) => {
                        throw erro
                    },
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    })
                }
            },
            handler: async (request, headers)=> {
                try {
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query

                    const query = {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    }

                    return this.db.read(nome ? query : {}, skip, limit)
                } catch (error) {
                    console.log('Deu ruim!!', error)
                    return "Error interno no servidor"
                }
            }
        }
    }
}

module.exports = HeroRoutes