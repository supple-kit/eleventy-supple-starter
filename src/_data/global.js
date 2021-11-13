module.exports = {
  now: Date.now(),
  isDevelopment: /serve/.test(process.argv.join()),
};
