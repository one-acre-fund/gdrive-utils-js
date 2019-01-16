import * as assert from 'assert';
import {describe, it} from 'mocha';
import {from, Observable, pipe} from 'rxjs';

import {jsonSheetRange} from '../src/index';

function testCredentials() {
  return require('../testCredentials.json');
}

const SERVICE_ACCOUNT_EMAIL =
    process.env.SERVICE_ACCOUNT_EMAIL || testCredentials().client_email;
const SERVICE_ACCOUNT_KEY =
    process.env.SERVICE_ACCOUNT_KEY || testCredentials().private_key;
const HELLO_WORLD_FQRANGE = process.env.HELLO_WORLD_FQRANGE ||
    '1hS4DIBn_C6hQ1H9FNaXTG-o67vl00mcP7ICbzz5P4IY!!Sheet1!A1:B2';

describe('JSONSheet Tests', function() {
  this.timeout(10 * 1000);

  it('Should do something', () => {
    return jsonSheetRange(
               SERVICE_ACCOUNT_EMAIL, SERVICE_ACCOUNT_KEY, HELLO_WORLD_FQRANGE)
        .toPromise()
        .then(value => {
          assert(!!value);
          assert.equal('Hello', value![0][0]);
          assert.equal('World', value![0][1]);
          assert.equal('Goodbye', value![1][0]);
          assert.equal('World', value![1][1]);
        });
  });
});