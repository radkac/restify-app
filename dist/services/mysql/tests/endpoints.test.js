"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const endpoints_1 = require("../endpoints");
const results_1 = require("../results");
const setup_1 = require("./setup");
test('Create endpoint', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const fakeConnection = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { endpoint: { name: 'Testovaci endpoint', url: 'http://www.google.com', interval: 1000, user: { id: '1' } } });
        }),
    };
    const fakeEndpoints = endpoints_1.endpoints({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const insertEndpoint = yield fakeEndpoints.save('Testovaci endpoint', 'http://www.google.com', 1000, { id: 1 });
    expect(insertEndpoint.id)
        .toBe('Testovaci endpoint');
}));
test('Update endpoint', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const fakeConnection = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { endpoint: { id: 1, name: 'Zmeneny endpoint' }, affectedRows: 1 });
        }),
    };
    const fakeEndpoints = endpoints_1.endpoints({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const updateEndpoint = yield fakeEndpoints.update({ id: 1, name: 'Zmeneny endpoint' });
    expect(updateEndpoint.endpointId)
        .toBe(1);
    expect(updateEndpoint.affectedRows)
        .toBe(1);
}));
test('Delete endpoint', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const fakeConnection = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { endpoint: { id: 1, name: 'Zmeneny endpoint' }, affectedRows: 1 });
        }),
    };
    const fakeConnection1 = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { endpoint: { id: 1 }, affectedRows: 1 });
        }),
    };
    const fakeEndpoints = endpoints_1.endpoints({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const fakeResults = results_1.results({ connection: fakeConnection1, errorHandler: setup_1.errorHandler });
    const resultResult = yield fakeResults.deleteByEndpoint(1, { id: 1, username: 'Test', email: 'test@test.cz' });
    const endpointResult = yield fakeEndpoints.delete(1, { id: 1, username: 'Test', email: 'test@test.cz' });
    expect(resultResult.affectedRows).not
        .toBe(0);
    expect(endpointResult.affectedRows)
        .toBe(1);
}));
//# sourceMappingURL=endpoints.test.js.map