const { connection, errorHandler } = require('./setup')
const endpoints = require('../endpoints')({ connection, errorHandler })
const results = require('../results')({ connection, errorHandler })

const create = () => endpoints.save('Testovaci endpoint', 'http://www.google.com', '1000', { 'id': '1' })

// beforeEach(t => connection.query('TRUNCATE TABLE endpoints'))
// TODO: ako nastavim poradie testov?

test('All', done => {
  expect(endpoints.all).toBeDefined()
  done()
})
test('Create endpoint', async done => {
  const insert = await create()
  expect(insert.endpoint.name).toBe('Testovaci endpoint')
  done()
})

test('Update endpoint', async done => {
  await create()
  const updated = await endpoints.update(1, 'Zmeneny endpoint')
  expect(updated.endpoint.name).toBe('Testovaci endpoint')
  expect(updated.affectedRows).toBe(1)
  done()
})

// test('Delete endpoint', async () => {
//   const resultResult = await results.deleteByEndpoint('1')
//   const endpointResult = await endpoints.delete('1')
//   expect(resultResult.affectedRows).not.toBe(0)
//   expect(endpointResult.affectedRows).toBe(1)
// })
