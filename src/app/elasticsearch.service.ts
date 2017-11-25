import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';

@Injectable()

/**
 * ElasticsearchService provides the service of creating and connecting the 
 * elastic search client to get the search query results.
 */
export class ElasticsearchService {

  private client: Client;
  public movies = [];

  /**
   * On Instantiation, if client doesn't have an search client, then create and connect the client.
   */
  constructor() {
    if (!this.client) {
      this.connect();
    }
  }

  /** Function to create a new 'Client' instance of elasticsearch. */
  private connect() {
    this.client = new Client({
      host: 'localhost:9200',
      log: 'trace',
      maxRetries: 10,
      keepAlive: true,
      maxSockets: 10
    });
  }

  /**
   * creates indices for search for that particular client.
   * @param name 
   */
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
  /**
   * Implements the search with the multimatch feature with name and keywords fields.
   * @param _index 
   * @param _type 
   * @param _queryText 
   */
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

  /**
   * Send a request to HEAD and wait until reply is got.
   */
  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello world!'
    });
  }
}
