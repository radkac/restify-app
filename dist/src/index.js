"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var db = require("./services/mysql");
var check_1 = require("./services/endpoints/check");
var app_1 = require("./app");
var config_1 = require('./config');
function checker() {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            var endpoints = yield db.endpointModule.allWithoutUser();
            var checkMonitors = endpoints.map(function (endpoint) {
                return new check_1["default"](db, endpoint);
            });
            checkMonitors.forEach(function (item) {
                item.startMonitor();
            });
        }
        catch (error) {
            return false;
        }
    });
}
setTimeout(checker);
app_1.server.listen(config_1.PORT);
