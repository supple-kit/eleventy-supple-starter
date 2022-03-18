/**
 * Add Eleventy plugins here
 */
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = {
  eleventyNavigation: (eleventyConfig) => {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
  },
  eleventyRss: (eleventyConfig) => {
    eleventyConfig.addPlugin(pluginRss);
  },
};
