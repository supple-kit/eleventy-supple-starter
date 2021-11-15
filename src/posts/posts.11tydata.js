const global = require('../_data/global');

// Set the url for your blogposts
const POSTSLUG = '/blog/';

function showDraft(data) {
  if (global.isDevelopment) return true;
  const isDraft = 'draft' in data && data.draft !== false;
  const isPostInFuture = 'date' in data ? data.date > global.now : false;
  return !isDraft && !isPostInFuture;
}

module.exports = () => {
  return {
    eleventyComputed: {
      eleventyExcludeFromCollections: (data) =>
        showDraft(data) ? data.eleventyExcludeFromCollections : true,
      permalink: (data) =>
        showDraft(data) ? `${POSTSLUG}${data.page.fileSlug}/` : false,
      layout: 'layouts/post.njk',
    },
  };
};
