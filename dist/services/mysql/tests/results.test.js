"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const results_1 = require("../results");
const setup_1 = require("./setup");
test('Create result', (done) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const fakeConnection = {
        query: jest.fn()
            .mockImplementation((callback) => {
            callback(undefined, { user: { name: 'Testovaci endpoint', url: 'http://www.google.com', interval: 1000, user: { id: '1' } } });
        }),
    };
    const fakeResults = results_1.results({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    const saveResult = yield fakeResults.save({ id: 1 }, { statusCode: '200' });
    expect(saveResult)
        .toBe('1');
    done();
}));
//# sourceMappingURL=results.test.js.map