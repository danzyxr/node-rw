import assert from 'assert';
import EventEmitter from 'events';
import { beforeEach, describe, it } from 'mocha';
import LDJClient from '../lib/ldj_client.mjs';

describe('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });

  it('should emit a message event from a single data event', (done) => {
    client.on('message', (message) => {
      assert.deepEqual(message, { foo: 'bar' });
      done();
    });
    stream.emit('data', '{"foo":"bar"}\n');
  });

  it('should emit a message event from two split data events', (done) => {
    client.on('message', (message) => {
      assert.deepEqual(message, { foo: 'bar' });
      done();
    });
    stream.emit('data', '{"foo":');
    process.nextTick(() => stream.emit('data', '"bar"}\n'));
  });

  it('should emit a message event from two or more split data events', (done) => {
    client.on('message', (message) => {
      assert.deepEqual(message, { foo: 'bar' });
      done();
    });
    for (let char of '{"foo":"bar"}\n') {
      process.nextTick(() => stream.emit('data', char));
    }
  });

  it('should throw an error when a null value is passed into ldj', (done) => {
    client.on('error', (err) => {
      assert.deepEqual(err, 'null value passed into LDJClient');
      done();
    });
    stream.emit('data', null);
  });

  it('should throw an error when non-json data is passed into ldj', (done) => {
    client.on('error', (err) => {
      assert.deepEqual(err, 'non-json data passed into LDJClient');
      done();
    });
    stream.emit('data', '"foo":"bar"\n');
  });

  // it('should handle json containing no newline message boundary', (done) => {});

  it('should finish within 20 ms', (done) => {
    setTimeout(done, 0);
  }).timeout(20);
});

// Write a case where the stream object sends a data event containing JSON
// but no newline, followed by a close event. A real Stream instance will emit
// a close event when going offline—update LDJClient to listen for close and
// process the remainder of the buffer.

// Should LDJClient emit a close event for its listeners? Under what
// circumstances?
