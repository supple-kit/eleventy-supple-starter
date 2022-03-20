module.exports = {
  now: Date.now(),
  isDevelopment: /serve/.test(process.argv.join()),
  screenShotService: 'https://v1.screenshot.11ty.dev',
};
