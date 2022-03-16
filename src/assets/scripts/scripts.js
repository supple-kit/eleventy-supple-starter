// Javascript goes here

/**
 * Collect exposed handlers
 */
const exposed = {};

/**
 * Twitter
 */
function tweet_(url) {
  open(
    'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url),
    '_blank',
  );
}
function tweet(anchor) {
  tweet_(anchor.getAttribute('href'));
}
expose('tweet', tweet);

/**
 * share-widget
 */
function share(anchor) {
  var url = anchor.getAttribute('href');
  // event.preventDefault();
  if (navigator.share) {
    navigator.share({
      url: url,
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    message('Article URL copied to clipboard.');
  } else {
    tweet_(url);
  }
}
expose('share', share);

/**
 * Add handlers to exposed
 */
function expose(name, fn) {
  exposed[name] = fn;
}

addEventListener('click', (e) => {
  const handler = e.target.closest('[on-click]');

  if (!handler) return;
  e.preventDefault();
  const name = handler.getAttribute('on-click');
  const fn = exposed[name];
  if (!fn) {
    throw new Error('Unknown handler' + name);
  }
  fn(handler);
});
