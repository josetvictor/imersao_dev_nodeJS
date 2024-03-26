const service = require('./service')

async function main() {
  try {
    const result = await service.obterPessoas('a')
    console.log(result)
    return;
    const namesFor = []
    const namesForin = []
    const namesForof = []

    console.time('for')
    for (let i = 0; i <= result.results.length - 1; i++) {
      const pessoa = result.results[i]
      namesFor.push(pessoa.name)
    }
    console.timeEnd('for')

    console.time('forin')
    for (let i in result.results) {
      const pessoa = result.results[i]
      namesForin.push(pessoa.name)
    }
    console.timeEnd('forin')

    console.time('forof')
    for (pessoa of result.results) {
      namesForof.push(pessoa.name)
    }
    console.timeEnd('forof')

    console.log(`names`, names)
  } catch (error) {
    console.error(`error interno`, error)
  }
}

main()