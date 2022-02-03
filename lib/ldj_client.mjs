import EventEmitter from 'events';

// Line-delimited JSON streaming
export default class LDJClient extends EventEmitter {
  constructor(data_stream) {
    super();

    let running_buffer = '';
    data_stream.on('data', (data_chunk) => {
      running_buffer += data_chunk; // Append incoming data
      // Look for message boundary
      let message_boundary = running_buffer.indexOf('\n');

      while (message_boundary !== -1) {
        const buffered_message = running_buffer.substring(0, message_boundary);
        running_buffer = running_buffer.substring(message_boundary + 1);
        this.emit('message', JSON.parse(buffered_message));
        message_boundary = running_buffer.indexOf('\n');
      }
    });
  }

  static connect(data_stream) {
    return new LDJClient(data_stream);
  }
}
