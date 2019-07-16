"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const results_1 = require("../results");
const users_1 = require("../users");
const setup_1 = require("./setup");
test('Create user', async () => {
    // const fakeConnection: any = {
    //   query: jest.fn()
    //     .mockImplementation((callback) => {
    //       callback(undefined, { user: { email: 'test@test.cz', username: 'test' } });
    //     }),
    // };
    const fakeUsers = users_1.users(setup_1.errorHandler);
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
    const fakeUsers = users_1.users(setup_1.errorHandler);
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
    const fakeUsers = users_1.users(setup_1.errorHandler);
    const fakeResults = results_1.results(setup_1.errorHandler);
    const deleteResult = await fakeResults.deleteByEndpoint(1, { id: 1, username: 'Test', email: 'test@test.cz' });
    const deleteUser = await fakeUsers.delete(1);
    expect(deleteResult.affectedRows).not
        .toBe(0);
    expect(deleteUser.affectedRows)
        .toBe(1);
});
//# sourceMappingURL=users.test.js.map