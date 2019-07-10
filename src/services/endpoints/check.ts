import * as request from 'request';
import { Endpoint } from '../mysql/endpoints';
import { Db } from '../mysql/interfaces';

export class EndpointChecker {
  public db: Db;
  public timeoutId: NodeJS.Timeout;
  public endpoint: Endpoint;

  constructor (db: Db, endpoint: Endpoint) {
    this.db = db;
    this.endpoint = endpoint;
    this.startMonitor = this.startMonitor.bind(this);
  }

  public check () {
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

  public startMonitor () {
    this.check()
      .then(() => {
        this.timeoutId = setInterval(this.startMonitor, this.endpoint.interval);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.timeoutId = setInterval(this.startMonitor, this.endpoint.interval);
      });
  }

  public stopMonitor () {
    clearTimeout(this.timeoutId);
  }
}
