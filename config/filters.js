/**
 * Add Eleventy filters here
 */
const util = require('util');
const markdown = require('markdown-it')({
  html: true,
});

// helpers
// Stolen from https://stackoverflow.com/a/31615643
const appendSuffix = (n) => {
  var s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

module.exports = {
  markdown: (value) => markdown.render(value),

  console: (value) => {
    return util.inspect(value);
  },

  htmlDateString: (value) => {
    const dateObject = new Date(value);
    return dateObject.toISOString();
  },

  readableDate: (value) => {
    const dateObject = new Date(value);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dayWithSuffix = appendSuffix(dateObject.getDate());

    return `${dayWithSuffix} ${
      months[dateObject.getMonth()]
    } ${dateObject.getFullYear()}`;
  },

  min: (...numbers) => Math.min.apply(null, numbers),

  head: (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  },

  filterTagList: (tags) =>
    (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1,
    ),
};
