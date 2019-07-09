"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var results_1 = require("../results");
var setup_1 = require('./setup');
test('Create result', function (done) __awaiter(this, void 0, void 0, function* () {
    var fakeConnection = { query: jest.fn().mockImplementation(function (callback) {
            callback(null, { user: { name: 'Testovaci endpoint', url: 'http://www.google.com', interval: 1000, user: { 'id': '1' } } });
        }) };
    var fakeResults = results_1.results({ connection: fakeConnection, errorHandler: setup_1.errorHandler });
    var saveResult = yield fakeResults.save({ id: 1 }, { 'statusCode': '200' });
    expect(saveResult).toBe('1');
    done();
}));
