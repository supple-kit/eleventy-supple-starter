const collections = require('./config/collections');
const plugins = require('./config/plugins');
const passthroughs = require('./config/passthroughs');
const filters = require('./config/filters');
const filtersAsync = require('./config/filtersAsync');
const shortcodes = require('./config/shortcodes');
const watchtargets = require('./config/watch-targets');
const transforms = require('./config/transforms');

module.exports = function (eleventyConfig) {
  // Create collections from /config/collections.js
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  // Add Eleventy plugins from /config/plugins.js
  Object.keys(plugins).forEach((pluginName) => {
    plugins[pluginName](eleventyConfig);
  });

  // Add shortcodes from /config/shortcodes.js
  Object.keys(shortcodes).forEach((shortcodeName, index) => {
    shortcodes[shortcodeName](eleventyConfig);
  });

  // Create filters from /config/filters.js
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Create async filters from /config/filtersAsync.js
  Object.keys(filtersAsync).forEach((filterName) => {
    eleventyConfig.addNunjucksAsyncFilter(filterName, filtersAsync[filterName]);
  });

  // Create transforms from /config/transforms.js
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  // Get passthroughs from /config/passthroughs.js
  Object.keys(passthroughs).forEach((passthroughName) => {
    eleventyConfig.addPassthroughCopy(passthroughs[passthroughName]());
  });

  // Watch these files for changes from /config/watchTargets.js
  Object.keys(watchtargets).forEach((watchtargetName) => {
    eleventyConfig.addWatchTarget(watchtargets[watchtargetName]());
  });

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    dir: {
      input: 'src',
      includes: 'assets/views',
      layouts: 'assets/views/layouts',
    },
  };
};
