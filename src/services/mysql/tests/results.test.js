const { connection, errorHandler } = require('./setup')

test('Create result', async done => {
  const fakeConnection = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { user: { name: 'Testovaci endpoint', url: 'http://www.google.com', interval: 1000, user: { 'id': '1' } } })
  }) }
  const fakeResults = require('../results')({ connection: fakeConnection, errorHandler })

  const insert = await fakeResults.save({ 'id': '1' }, { 'statusCode': '200' })

  expect(insert.result.endpointId).toBe('1')
  done()
})
