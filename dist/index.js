"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("./services/mysql");
const check_1 = require("./services/endpoints/check");
const app_1 = require("./app");
const config_1 = require("./config");
async function checker() {
    try {
        const endpoints = await db.endpointModule.allWithoutUser();
        const checkMonitors = endpoints.map((endpoint) => {
            return new check_1.default(db, endpoint);
        });
        checkMonitors.forEach((item) => {
            item.startMonitor();
        });
    }
    catch (error) {
        return false;
    }
}
setTimeout(checker);
app_1.server.listen(config_1.PORT);
//# sourceMappingURL=index.js.map