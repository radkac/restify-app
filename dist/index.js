"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
const check_1 = require("./services/endpoints/check");
const mysql_1 = require("./services/mysql");
async function checker() {
    try {
        const endpoints = await mysql_1.db.endpointModule.allWithoutUser();
        const checkMonitors = endpoints.map((endpoint) => new check_1.EndpointChecker(mysql_1.db, endpoint));
        checkMonitors.forEach((item) => item.startMonitor());
    }
    catch (error) {
        // return error; // handle error, ne false
    }
}
void checker();
app_1.server.listen(config_1.PORT);
//# sourceMappingURL=index.js.map