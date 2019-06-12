const { connection, errorHandler } = require('./setup')
const results = require('../results')({ connection, errorHandler })

const create = () => results.save({ 'id': '1' }, { 'statusCode': '200' })

// beforeEach(t => connection.query('TRUNCATE TABLE results'))

test('All', done => {
  expect(results.all).toBeDefined()
  done()
})

test('Create result', async done => {
  const insert = await create()
  expect(insert.result.endpointId).toBe('1')
  done()
})

