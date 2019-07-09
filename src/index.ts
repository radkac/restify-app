
import * as db from "./services/mysql"; 
import EndpointChecker from "./services/endpoints/check"
import { server } from "./app";
import { Endpoint } from './services/mysql/endpoints';
import { PORT } from './config';

async function checker(): Promise<any> { // EndpointChecker or false
  try {
    const endpoints = await db.endpointModule.allWithoutUser()
    const checkMonitors = endpoints.map((endpoint: Endpoint) => {
      return new EndpointChecker(db, endpoint)
    })
    checkMonitors.forEach((item: EndpointChecker) => {
      item.startMonitor()
    })
  } catch (error) {
    return false;
  }
}

setTimeout(checker);
server.listen(PORT);
