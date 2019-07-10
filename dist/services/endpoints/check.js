"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class EndpointChecker {
    constructor(db, endpoint) {
        this.db = db;
        this.endpoint = endpoint;
        this.startMonitor = this.startMonitor.bind(this);
    }
    check() {
        return new Promise((resolve, reject) => {
            request(this.endpoint.url, (error, response) => {
                if (error) {
                    return reject(error);
                }
                else {
                    const date = new Date();
                    this.db.endpointModule.update({ id: this.endpoint.id, last_check: date });
                    this.db.resultModule.save(this.endpoint, response);
                    return resolve('ok');
                }
            });
        });
    }
    startMonitor() {
        this.check()
            .then(() => {
            this.timeoutId = setInterval(this.startMonitor, this.endpoint.interval);
        })
            .catch((error) => {
            console.error('Error:', error);
            this.timeoutId = setInterval(this.startMonitor, this.endpoint.interval);
        });
    }
    stopMonitor() {
        clearTimeout(this.timeoutId);
    }
}
exports.EndpointChecker = EndpointChecker;
//# sourceMappingURL=check.js.map