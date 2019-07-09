import * as request from "request";
import { Endpoint } from '../mysql/endpoints';


export default class EndpointChecker {
  endpoint: Endpoint;
  db: any;
  timeoutId: NodeJS.Timeout;

  constructor (db: any, endpoint: Endpoint) {
    this.db = db;
    this.endpoint = endpoint;
    this.startMonitor = this.startMonitor.bind(this);
  }

  check () {
    return new Promise((resolve, reject) => {
      request(this.endpoint.url, (error, response) => {
        if (error) {
          reject(error)
          return
        }
        const date = new Date();
        this.db.endpointModule.update({ id: this.endpoint.id, last_check: date }); // import endpoints
        this.db.resultModule.save(this.endpoint, response);
        resolve('ok');
      })
    })
  }

  startMonitor () {
    this.check().then(() => {
      this.timeoutId = setTimeout(this.startMonitor, this.endpoint.interval);
    }).catch((error) => {
      console.error('Error:', error);
      this.timeoutId = setTimeout(this.startMonitor, this.endpoint.interval);
    })
  }

  stopMonitor () {
    clearTimeout(this.timeoutId);
  }
}
