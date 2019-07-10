
import { server } from './app';
import { PORT } from './config';
import { EndpointChecker } from './services/endpoints/check';
import { db } from './services/mysql'; 
import { Endpoint } from './services/mysql/endpoints';

async function checker(): Promise<void> { // EndpointChecker or false
  try {
    const endpoints = await db.endpointModule.allWithoutUser();
    const checkMonitors = endpoints.map((endpoint: Endpoint) => new EndpointChecker(db, endpoint));
    checkMonitors.forEach((item) => item.startMonitor());
  } catch (error) {
    // return error; // handle error, ne false
  }
}

void checker();
server.listen(PORT);
