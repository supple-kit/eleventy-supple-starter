const filters = require('./filters');

/**
 * Add Eleventy collections here
 */
module.exports = {
  pages: (collection) => collection.getFilteredByGlob('src/pages/*.md'),
  posts: (collection) => collection.getFilteredByGlob('src/posts/*.md'),
  tagList: (collection) => {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return filters.tagList([...tagSet]);
  },
};
