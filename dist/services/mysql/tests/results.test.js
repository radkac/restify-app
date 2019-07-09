"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const results_1 = require("../results");
const setup_1 = require("./setup");
test('Create result', async (done) => {
    const fakeConnection = { query: jest.fn().mockImplementation((callback) => {
            callback(null, { user: { name: 'Testovaci endpoint', url: 'http://www.google.com', interval: 1000, user: { 'id': '1' } } });
        }) };
    const fakeResults = results_1.results({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const saveResult = await fakeResults.save({ id: 1 }, { 'statusCode': '200' });
    expect(saveResult).toBe('1');
    done();
});
//# sourceMappingURL=results.test.js.map