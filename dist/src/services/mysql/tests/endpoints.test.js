"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var endpoints_1 = require("../endpoints");
var results_1 = require('../results');
var setup_1 = require('./setup');
// beforeEach(t => connection.query('TRUNCATE TABLE endpoints'))
test('Create endpoint', function () __awaiter(this, void 0, void 0, function* () {
    var fakeConnection = {
        query: jest.fn().mockImplementation(function (callback) {
            callback(null, { endpoint: { name: 'Testovaci endpoint', url: 'http://www.google.com', interval: 1000, user: { 'id': '1' } } });
        })
    };
    var fakeEndpoints = endpoints_1.endpoints({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    var insertEndpoint = yield fakeEndpoints.save('Testovaci endpoint', 'http://www.google.com', 1000, { id: 1 });
    expect(insertEndpoint.id).toBe('Testovaci endpoint');
}));
test('Update endpoint', function () __awaiter(this, void 0, void 0, function* () {
    var fakeConnection = {
        query: jest.fn().mockImplementation(function (callback) {
            callback(null, { endpoint: { id: 1, name: 'Zmeneny endpoint' }, affectedRows: 1 });
        })
    };
    var fakeEndpoints = endpoints_1.endpoints({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    var updateEndpoint = yield fakeEndpoints.update({ id: 1, name: 'Zmeneny endpoint' });
    expect(updateEndpoint.endpointId).toBe(1);
    expect(updateEndpoint.affectedRows).toBe(1);
}));
test('Delete endpoint', function () __awaiter(this, void 0, void 0, function* () {
    var fakeConnection = {
        query: jest.fn().mockImplementation(function (callback) {
            callback(null, { endpoint: { id: 1, name: 'Zmeneny endpoint' }, affectedRows: 1 });
        })
    };
    var fakeConnection1 = {
        query: jest.fn().mockImplementation(function (callback) {
            callback(null, { endpoint: { id: 1 }, affectedRows: 1 });
        })
    };
    var fakeEndpoints = endpoints_1.endpoints({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    var fakeResults = results_1.results({ connection: fakeConnection1, errorHandler: setup_1.errorHandler });
    var resultResult = yield fakeResults.deleteByEndpoint(1);
    var endpointResult = yield fakeEndpoints.delete(1);
    expect(resultResult.affectedRows).not.toBe(0);
    expect(endpointResult.affectedRows).toBe(1);
}));
