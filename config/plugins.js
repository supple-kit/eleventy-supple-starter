/**
 * Add Eleventy plugins here
 */
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const slinkity = require('slinkity');
const rendererSvelte = require('@slinkity/renderer-svelte');

module.exports = {
  eleventyNavigation: (eleventyConfig) => {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
  },
  eleventyRss: (eleventyConfig) => {
    eleventyConfig.addPlugin(pluginRss);
  },
  slinkity: (eleventyConfig) => {
    eleventyConfig.addPlugin(
      slinkity.plugin,
      slinkity.defineConfig({
        renderers: [rendererSvelte],
      }),
    );
  },
};
