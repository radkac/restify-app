const { connection, errorHandler } = require('./setup')

// beforeEach(t => connection.query('INSERT'))

test('Create user', async done => {
  const fakeConnection = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { user: { email: 'test@test.cz', username: 'test' } })
  }) }

  const fakeUsers = require('../users')({ connection: fakeConnection, errorHandler })
  const insert = await fakeUsers.save('test@test.cz', 'test', 'abcs')

  expect(insert.user.email).toBe('test@test.cz')
  done()
})

test('Update user', async done => {
  const fakeConnection = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { user: { id: 1, email: 'test@test.cz', username: 'Test' }, affectedRows: 1 })
  }) }

  const fakeUsers = require('../users')({ connection: fakeConnection, errorHandler })
  const updated = await fakeUsers.update(1, 'Test', 'test@test.cz')
  expect(updated.user.user.username).toBe('Test')
  expect(updated.affectedRows).toBe(1)
  done()
})

test('Delete user', async () => {
  const fakeConnection = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { user: { id: 1 }, affectedRows: 1 })
  }) }
  const fakeConnection1 = { query: jest.fn().mockImplementation((query, params, callback) => {
    callback(null, { result: { id: 1 }, affectedRows: 1 })
  }) }

  const fakeUsers = require('../users')({ connection: fakeConnection, errorHandler })
  const fakeResults = require('../results')({ connection: fakeConnection1, errorHandler })

  const resultResult = await fakeResults.deleteByEndpoint('1')
  const userResult = await fakeUsers.delete('1')
  expect(resultResult.affectedRows).not.toBe(0)
  expect(userResult.affectedRows).toBe(1)
})
