"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const results_1 = require("../results");
const setup_1 = require("./setup");
// beforeEach(t => connection.query('INSERT'))
test('Create user', async () => {
    const fakeConnection = { query: jest.fn().mockImplementation((callback) => {
            callback(null, { user: { email: 'test@test.cz', username: 'test' } });
        }) };
    const fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const userInsert = await fakeUsers.save('test@test.cz', 'test', 'abcs');
    expect(userInsert.email).toBe('test@test.cz');
});
test('Update user', async () => {
    const fakeConnection = { query: jest.fn().mockImplementation((callback) => {
            callback(null, { user: { id: 1, email: 'test@test.cz', username: 'Test' }, affectedRows: 1 });
        }) };
    const fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const userUpdate = await fakeUsers.update({ id: 1, username: 'Test', email: 'test@test.cz' });
    expect(userUpdate.user.username).toBe('Test');
    expect(userUpdate.affectedRows).toBe(1);
});
test('Delete user', async () => {
    const fakeConnection = { query: jest.fn().mockImplementation((callback) => {
            callback(null, { user: { id: 1 }, affectedRows: 1 });
        }) };
    const fakeConnection1 = { query: jest.fn().mockImplementation((callback) => {
            callback(null, { result: { id: 1 }, affectedRows: 1 });
        }) };
    const fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const fakeResults = results_1.results({ connection: fakeConnection1, errorHandler: setup_1.errorHandler });
    const deleteResult = await fakeResults.deleteByEndpoint(1);
    const deleteUser = await fakeUsers.delete(1);
    expect(deleteResult.affectedRows).not.toBe(0);
    expect(deleteUser.affectedRows).toBe(1);
});
//# sourceMappingURL=users.test.js.map