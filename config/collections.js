/**
 * Add Eleventy collections here
 */
module.exports = {
  pages: (collection) => collection.getFilteredByGlob('src/pages/*.md'),
  posts: (collection) => collection.getFilteredByGlob('src/posts/*.md'),
};
