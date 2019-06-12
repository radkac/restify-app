const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })
const create = () => users.save('test@test.cz', 'Tester', 'ABCDEFGHIJKLMNoprstuv')

// beforeEach(t => connection.query('TRUNCATE TABLE users'))

test('Create user', async done => {
  const insert = await create()
  expect(insert.user.email).toBe('test@test.cz')
  done()
})

test('Update user', async done => {
  await create()
  const updated = await users.update(1, 'Test')
  expect(updated.user.name).toBe('Test')
  expect(updated.affectedRows).toBe(1)
  done()
})

// test('Delete user', async () => {
//   const resultResult = await results.deleteByUser('1')
//   const userResult = await users.delete('1')
//   expect(resultResult.affectedRows).not.toBe(0)
//   expect(userResult.affectedRows).toBe(1)
// })
