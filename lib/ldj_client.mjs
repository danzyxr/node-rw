import EventEmitter from 'events';

// Line-delimited JSON streaming
export default class LDJClient extends EventEmitter {
  constructor(data_stream) {
    super();

    let running_buffer = '';
    data_stream.on('data', (data_chunk) => {
      if (!data_chunk) {
        this.emit('error', 'null value passed into LDJClient');
      }

      running_buffer += data_chunk; // Append incoming data
      // Look for message boundary
      let message_boundary = running_buffer.indexOf('\n');

      // Successfully found '\n'
      while (message_boundary !== -1) {
        let msg;
        const buffered_message = running_buffer.substring(0, message_boundary);
        running_buffer = running_buffer.substring(message_boundary + 1);

        try {
          msg = JSON.parse(buffered_message);
        } catch (e) {
          this.emit('error', 'non-json formatted data passed into LDJClient');
        }

        this.emit('message', msg);
        message_boundary = running_buffer.indexOf('\n');
      }
    });
  }

  static connect(data_stream) {
    return new LDJClient(data_stream);
  }
}
