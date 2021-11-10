/**
 * Add Eleventy plugins here
 */
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = {
	eleventyNavigation: (eleventyConfig) => {
		eleventyConfig.addPlugin(eleventyNavigationPlugin);
	},
};
