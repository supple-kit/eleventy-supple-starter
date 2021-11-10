/**
 * Add Eleventy collections here
 */
module.exports = {
  pages: (collection) => collection.getFilteredByGlob('src/pages/*.md'),
  blog: (collection) => collection.getFilteredByGlob('src/blog/*.md'),
};
