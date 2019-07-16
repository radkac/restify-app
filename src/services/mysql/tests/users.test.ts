import { results } from '../results';
import { users } from '../users';
import { errorHandler } from './setup';

test('Create user', async () => {
  // const fakeConnection: any = {
  //   query: jest.fn()
  //     .mockImplementation((callback) => {
  //       callback(undefined, { user: { email: 'test@test.cz', username: 'test' } });
  //     }),
  // };

  const fakeUsers = users(errorHandler);
  const userInsert = await fakeUsers.save('test@test.cz', 'test', 'abcs');

  expect(userInsert.email)
    .toBe('test@test.cz');
});

test('Update user', async () => {
  // const fakeConnection: any = {
  //   query: jest.fn()
  //     .mockImplementation((callback) => {
  //       callback(undefined, { user: { id: 1, email: 'test@test.cz', username: 'Test' }, affectedRows: 1 });
  //     }),
  // };

  const fakeUsers = users(errorHandler);

  const userUpdate = await fakeUsers.update({ id: 1, username: 'Test', email: 'test@test.cz' });
  expect(userUpdate.user.username)
    .toBe('Test');
  expect(userUpdate.affectedRows)
    .toBe(1);
});

test('Delete user', async () => {
  // const fakeConnection: any = {
  //   query: jest.fn()
  //     .mockImplementation((callback) => {
  //       callback(undefined, { user: { id: 1 }, affectedRows: 1 });
  //     }),
  // };
  // const fakeConnection1: any = {
  //   query: jest.fn()
  //     .mockImplementation((callback) => {
  //       callback(undefined, { result: { id: 1 }, affectedRows: 1 });
  //     }),
  // };

  const fakeUsers = users(errorHandler);
  const fakeResults = results(errorHandler);

  const deleteResult = await fakeResults.deleteByEndpoint(1, { id: 1, username: 'Test', email: 'test@test.cz' });
  const deleteUser = await fakeUsers.delete(1);
  expect(deleteResult.affectedRows).not
    .toBe(0);
  expect(deleteUser.affectedRows)
    .toBe(1);
});
