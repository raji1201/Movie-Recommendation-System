import {Inject, Injectable} from '@angular/core';

import { Client } from 'elasticsearch';

@Injectable()
export class ElasticsearchService {

  private client: Client;

  constructor() {
    if (!this.client) {
      this.connect();
    }
  }

  private connect() {
    this.client = new Client({
      host: 'localhost:9200',
      log: 'trace',
      maxRetries: 10
    });
  }

  createIndex(name): any {
    return this.client.indices.putMapping({
      index: 'testmovies',
      type: 'test1',
      body: {
        properties: {
          'testname': {
            'type': 'string',
            'index': 'not_analyzed'
          }
        }
      }
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello world!'
    });
  }
}
