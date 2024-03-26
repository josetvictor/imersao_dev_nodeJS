const { get } = require('axios')
const URI = `https://swapi.com/api/people`

async function obterPessoas(name) {
  const url = `${URI}/?search=${name}&format=json`
  const response = await get(url)
  return response.data
}

module.exports = { obterPessoas }