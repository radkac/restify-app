"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var users_1 = require('../users');
var results_1 = require('../results');
var setup_1 = require('./setup');
// beforeEach(t => connection.query('INSERT'))
test('Create user', function () __awaiter(this, void 0, void 0, function* () {
    var fakeConnection = { query: jest.fn().mockImplementation(function (callback) {
            callback(null, { user: { email: 'test@test.cz', username: 'test' } });
        }) };
    var fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    var userInsert = yield fakeUsers.save('test@test.cz', 'test', 'abcs');
    expect(userInsert.email).toBe('test@test.cz');
}));
test('Update user', function () __awaiter(this, void 0, void 0, function* () {
    var fakeConnection = { query: jest.fn().mockImplementation(function (callback) {
            callback(null, { user: { id: 1, email: 'test@test.cz', username: 'Test' }, affectedRows: 1 });
        }) };
    var fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    var userUpdate = yield fakeUsers.update({ id: 1, username: 'Test', email: 'test@test.cz' });
    expect(userUpdate.user.username).toBe('Test');
    expect(userUpdate.affectedRows).toBe(1);
}));
test('Delete user', function () __awaiter(this, void 0, void 0, function* () {
    var fakeConnection = { query: jest.fn().mockImplementation(function (callback) {
            callback(null, { user: { id: 1 }, affectedRows: 1 });
        }) };
    var fakeConnection1 = { query: jest.fn().mockImplementation(function (callback) {
            callback(null, { result: { id: 1 }, affectedRows: 1 });
        }) };
    var fakeUsers = users_1.users({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    var fakeResults = results_1.results({ connection: fakeConnection1, errorHandler: setup_1.errorHandler });
    var deleteResult = yield fakeResults.deleteByEndpoint(1);
    var deleteUser = yield fakeUsers.delete(1);
    expect(deleteResult.affectedRows).not.toBe(0);
    expect(deleteUser.affectedRows).toBe(1);
}));
