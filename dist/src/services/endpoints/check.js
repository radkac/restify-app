"use strict";
var request = require("request");
var EndpointChecker = (function () {
    function EndpointChecker(db, endpoint) {
        this.db = db;
        this.endpoint = endpoint;
        this.startMonitor = this.startMonitor.bind(this);
    }
    EndpointChecker.prototype.check = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request(_this.endpoint.url, function (error, response) {
                if (error) {
                    reject(error);
                    return;
                }
                var date = new Date();
                _this.db.endpointModule.update({ id: _this.endpoint.id, last_check: date }); // import endpoints
                _this.db.resultModule.save(_this.endpoint, response);
                resolve('ok');
            });
        });
    };
    EndpointChecker.prototype.startMonitor = function () {
        var _this = this;
        this.check().then(function () {
            _this.timeoutId = setTimeout(_this.startMonitor, _this.endpoint.interval);
        }).catch(function (error) {
            console.error('Error:', error);
            _this.timeoutId = setTimeout(_this.startMonitor, _this.endpoint.interval);
        });
    };
    EndpointChecker.prototype.stopMonitor = function () {
        clearTimeout(this.timeoutId);
    };
    return EndpointChecker;
}());
exports.__esModule = true;
exports["default"] = EndpointChecker;
