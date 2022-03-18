const { JSDOM } = require('jsdom');

module.exports = {
  /**
   * We may want to slightly alternate the HTML outputted by markdown.
   */
  htmlParseTransform: (value, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      // cache the DOM & get domnodes
      const DOM = new JSDOM(value, {
        resources: 'usable',
      });
      const document = DOM.window.document;
      const main = document.querySelector('main');

      if (main) {
        /**
         * Markdown wraps certain elements in a `p` element, here we’re gonna remove
         * those wrappers.
         */
        const elementsToRemovePElement = [
          ...main.querySelectorAll('picture, img'),
        ];
        elementsToRemovePElement.forEach((element) => {
          const parent = element.closest('p');
          if (parent && parent.nodeName === 'P') {
            parent.replaceWith(element);
          }
        });

        // return parsed HTML
      }
      return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
    }
    return value;
  },
};
