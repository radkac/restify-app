"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const results_1 = require("../results");
const users_1 = require("../users");
const setup_1 = require("./setup");
test('Create user', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const fakeConnection = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { user: { email: 'test@test.cz', username: 'test' } });
        }),
    };
    const fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const userInsert = yield fakeUsers.save('test@test.cz', 'test', 'abcs');
    expect(userInsert.email)
        .toBe('test@test.cz');
}));
test('Update user', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const fakeConnection = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { user: { id: 1, email: 'test@test.cz', username: 'Test' }, affectedRows: 1 });
        }),
    };
    const fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const userUpdate = yield fakeUsers.update({ id: 1, username: 'Test', email: 'test@test.cz' });
    expect(userUpdate.user.username)
        .toBe('Test');
    expect(userUpdate.affectedRows)
        .toBe(1);
}));
test('Delete user', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const fakeConnection = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { user: { id: 1 }, affectedRows: 1 });
        }),
    };
    const fakeConnection1 = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { result: { id: 1 }, affectedRows: 1 });
        }),
    };
    const fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const fakeResults = results_1.results({ connection: fakeConnection1, errorHandler: setup_1.errorHandler });
    const deleteResult = yield fakeResults.deleteByEndpoint(1, { id: 1, username: 'Test', email: 'test@test.cz' });
    const deleteUser = yield fakeUsers.delete(1);
    expect(deleteResult.affectedRows).not
        .toBe(0);
    expect(deleteUser.affectedRows)
        .toBe(1);
}));
//# sourceMappingURL=users.test.js.map