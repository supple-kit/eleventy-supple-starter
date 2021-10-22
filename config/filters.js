/**
 * Add Eleventy filters here
 */
const markdown = require('markdown-it')({
	html: true,
});

module.exports = {
	markdown: (value) => markdown.render(value),
};
