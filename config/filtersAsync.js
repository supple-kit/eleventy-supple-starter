const fs = require('fs');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const stat = promisify(fs.stat);

const lastModifiedDateCache = new Map();

async function lastModifiedDate(filename) {
  try {
    const { stdout } = await execFile('git', [
      'log',
      '-1',
      '--format=%cd',
      filename,
    ]);
    return new Date(stdout);
  } catch (e) {
    console.error(e.message);
    // Fallback to stat if git isn't working.
    const stats = await stat(filename);
    return stats.mtime; // Date
  }
}

module.exports = {
  lastModifiedDate: (filename, callback) => {
    const call = (result) => {
      result.then((date) => callback(null, date));
      result.catch((error) => callback(error));
    };
    const cached = lastModifiedDateCache.get(filename);
    if (cached) {
      return call(cached);
    }
    const promise = lastModifiedDate(filename);
    lastModifiedDateCache.set(filename, promise);
    call(promise);
  },
};
