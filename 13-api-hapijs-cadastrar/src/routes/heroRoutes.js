const BaseRoute = require("./base/baseRoutes")
const Joi = require('@hapi/joi')

const failAction = (request, headers, erro) => {
    throw erro
}

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
                    failAction,
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    })
                }
            },
            handler: (request, headers)=> {
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

    cadastrar() {
        return {
            path: '/herois',
            method: 'POST',
            options: {
                validate: {
                    failAction,
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    })
                }
            },
            handler: async (request) => {
                try {
                    const {nome, poder} = request.payload
                    const result = await this.db.create({nome, poder})

                    return {
                        message: 'Heroi cadastrado com sucesso',
                        result
                    }
                } catch (error) {
                    console.log("Deu ruim!!", error)
                    return 'Internal Error!'
                }
            }
        }
    }
}

module.exports = HeroRoutes