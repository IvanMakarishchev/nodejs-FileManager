import os from 'os';

export const userDir = os.homedir();

export const colors = {
    0: '20;20;20',
    1: '40;40;40'
}

export const fileTypes = {
  directory: "directory",
  file: "file",
  "block device": "block device",
  "char device": "char device",
  fifo: "fifo",
  socket: "socket",
  "symbolic link": "symbolic link",
}