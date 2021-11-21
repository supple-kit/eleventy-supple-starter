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
  // dump log in output
  console: (value) => {
    return util.inspect(value);
  },

  // Return lowest-valued number
  min: (...numbers) => Math.min.apply(null, numbers),

  // return the head of an array
  head: (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  },

  // Object helpers
  keys: Object.keys,
  values: Object.values,
  entries: Object.entries,

  // ISO format date string
  htmlDateString: (value) => {
    const dateObject = new Date(value);
    return dateObject.toISOString();
  },

  // Pretty print date
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

  // render markdown snippets
  markdown: (value) => markdown.render(value),

  // Filter the default tags out of the taglists
  tagList: (tags) =>
    (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1,
    ),
};
