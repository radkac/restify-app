const { connection, errorHandler } = require('./setup')

// beforeEach(t => connection.query('TRUNCATE TABLE endpoints'))

test('Create endpoint', async done => {
  const fakeConnection = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { endpoint: { name: 'Testovaci endpoint', url: 'http://www.google.com', interval: 1000, user: { 'id': '1' } } })
  }) }
  const fakeEndpoints = require('../endpoints')({ connection: fakeConnection, errorHandler })

  const insert = await fakeEndpoints.save('Testovaci endpoint', 'http://www.google.com', '1000', { 'id': '1' })

  expect(insert.endpoint.name).toBe('Testovaci endpoint')
  done()
})

test('Update endpoint', async done => {
  const fakeConnection = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { endpoint: { id: 1, name: 'Zmeneny endpoint' }, affectedRows: 1 })
  }) }
  const fakeEndpoints = require('../endpoints')({ connection: fakeConnection, errorHandler })
  const updated = await fakeEndpoints.update(1, 'Zmeneny endpoint')
  expect(updated.endpoint.endpoint.name).toBe('Zmeneny endpoint')
  expect(updated.affectedRows).toBe(1)
  done()
})

test('Delete endpoint', async () => {
  const fakeConnection = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { endpoint: { id: 1, name: 'Zmeneny endpoint' }, affectedRows: 1 })
  }) }
  const fakeConnection1 = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { endpoint: { id: 1 }, affectedRows: 1 })
  }) }

  const fakeEndpoints = require('../endpoints')({ connection: fakeConnection, errorHandler })
  const fakeResults = require('../results')({ connection: fakeConnection1, errorHandler })

  const resultResult = await fakeResults.deleteByEndpoint(1)
  const endpointResult = await fakeEndpoints.delete(1)

  expect(resultResult.affectedRows).not.toBe(0)
  expect(endpointResult.affectedRows).toBe(1)
})
