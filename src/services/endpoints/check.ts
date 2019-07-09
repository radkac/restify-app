import * as request from "request";
import { Endpoint } from '../mysql/endpoints';
import { Connection } from 'mysql';
import * as connection from '../mysql'


export default class EndpointChecker {
  endpoint: Endpoint;
  connection: Connection;
  timeoutId: NodeJS.Timeout;

  constructor (connection: Connection, endpoint: Endpoint) {
    this.connection = connection
    this.endpoint = endpoint
    this.startMonitor = this.startMonitor.bind(this)
  }

  check () {
    return new Promise((resolve, reject) => {
      request(this.endpoint.url, (error, response) => {
        if (error) {
          reject(error)
          return
        }
        const date = new Date();
        console.log(this.connection);
        this.connection.endpoints().update({ id: this.endpoint.id, last_check: date }); // import endpoints
        this.connection.results().save(this.endpoint, response);
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
