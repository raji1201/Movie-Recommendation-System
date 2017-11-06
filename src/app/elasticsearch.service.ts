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

  fullTextSearch(_index, _type, _queryText): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: {
        'query': {
          'match': {
            _all: _queryText
          }
        }
      },
      '_source': ['name', 'year']
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello world!'
    });
  }
}
