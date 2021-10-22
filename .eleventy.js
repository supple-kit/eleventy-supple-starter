const passthroughs = require('./config/passthroughs');
const collections = require('./config/collections');

module.exports = function (eleventyConfig) {
	// Create collections from /src/config/collections.js
	Object.keys(collections).forEach((collectionName) => {
		eleventyConfig.addCollection(collectionName, collections[collectionName]);
	});

	// Get passthroughs from /config/passthroughs.js
	Object.keys(passthroughs).forEach((passthroughName) => {
		eleventyConfig.addPassthroughCopy(passthroughs[passthroughName]());
	});

	return {
		templateFormats: ['md', 'njk', 'html', 'liquid'],

		markdownTemplateEngine: 'liquid',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',

		dir: {
			input: 'src',
			output: 'dist',
		},
	};
};
