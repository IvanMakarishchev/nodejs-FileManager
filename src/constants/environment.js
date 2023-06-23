import os from 'os';

export const userDir = os.homedir();

export const colors = {
  bg: {
    0: '20;20;20',
    1: '40;40;40'
  },
  "block device": {
    0: '255;0;255',
    1: '255;0;255'
  },
  "char device": {
    0: '255;0;255',
    1: '255;0;255'
  },
  directory: {
    0: '200;200;0;1',
    1: '175;175;0;1'
  },
  file: {
    0: '0;210;0',
    1: '0;185;0'
  },
  "symbolic link": {
    0: '0;125;225',
    1: '0;75;175'
  },
  fifo: {
    0: '255;0;255',
    1: '255;0;255'
  },
  socket: {
    0: '255;0;255',
    1: '255;0;255'
  }
}