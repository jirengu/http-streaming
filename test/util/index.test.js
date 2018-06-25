import QUnit from 'qunit';
import sinon from 'sinon';
import window from 'global/window';
import videojs from 'video.js';
import logger from '../../src/util/logger';
import { stringToArrayBuffer } from '../../src/util/string-to-array-buffer';
// we disable this because browserify needs to include these files
// but the exports are not important
/* eslint-disable no-unused-vars */
// import {MediaSource, URL} from '../../src/mse';
/* eslint-disable no-unused-vars */

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof window.MediaSource, 'function', 'plugin is a function');
});

QUnit.module('videojs-contrib-media-sources - General');

QUnit.test('Plugin is registered', function(assert) {
  assert.strictEqual(
    typeof videojs.URL,
    'object',
    'URL plugin is attached to player'
  );
});

QUnit.test('Logger includes source', function(assert) {
  const source = 'testsource';
  const originalLogDebug = videojs.log.debug;
  let msg;
  let logger_;

  videojs.log.debug = (...args) => {
    msg = args.join(' ');
  };

  logger_ = logger(source);
  logger_('test');

  assert.strictEqual(
    msg,
    `VHS: ${source} > test`,
    'log message includes the source');

  // Reset
  videojs.log.debug = originalLogDebug;
});

QUnit.test('array buffer created from string contains the correct codes',
function(assert) {
  const text = 'test';
  const arrayBuffer = stringToArrayBuffer(text);
  const view = new Uint8Array(arrayBuffer);

  assert.strictEqual(
    typeof arrayBuffer,
    typeof new ArrayBuffer(0),
    'creates a int8 array buffer');
  assert.strictEqual(String.fromCharCode(view[0]), 't');
  assert.strictEqual(String.fromCharCode(view[1]), 'e');
  assert.strictEqual(String.fromCharCode(view[2]), 's');
  assert.strictEqual(String.fromCharCode(view[3]), 't');
});