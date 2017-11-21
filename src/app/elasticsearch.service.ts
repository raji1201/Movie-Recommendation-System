import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';

@Injectable()
export class ElasticsearchService {

  private client: Client;
  public movies = [];

  constructor() {
    if (!this.client) {
      this.connect();
    }
  }

  private connect() {
    this.client = new Client({
      host: 'localhost:9200',
      log: 'trace',
      maxRetries: 10,
      keepAlive: true,
      maxSockets: 10
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

  // importance for keywords or name can be increased by either keywords^{factor} or name^{factor}
  fullTextSearch(_index, _type, _queryText): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: {
        'query': {
          'multi_match': {
            'query': _queryText,
            'fields': ['name', 'keywords'],
            'fuzziness': 'AUTO'
          }
        },
        'size': 5
      },
      '_source': ['name']
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello world!'
    });
  }
}
