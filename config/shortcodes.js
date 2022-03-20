/**
 * Add Eleventy shortcodes here
 */
const path = require('path');
const Image = require('@11ty/eleventy-img');

const siteMetaData = require('../src/_data/metadata.json');
const { screenShotService } = require('../src/_data/global');
const cachebuster = Math.round(new Date().getTime() / 1000);

module.exports = {
  /**
   * image: uses `eleventy-img`, for full configuration please check
   * https://www.11ty.dev/docs/plugins/image/
   */
  image: function (eleventyConfig) {
    async function imageShortcode(src, alt, widths = [300, 500], sizes) {
      let formats = ['avif', 'webp', 'jpg'];
      if (src.endsWith('.png')) formats = ['avif', 'webp', 'png'];
      if (src.endsWith('.gif')) formats = ['gif'];
      if (src.endsWith('.svg')) formats = ['svg'];

      const parsedWidths =
        typeof widths === 'object' ? widths : JSON.parse(widths);

      let metadata = await Image(src, {
        widths: parsedWidths,
        formats,
        outputDir: path.join(process.env.ELEVENTY_BUILD_OUTPUT_DIR, 'img'),
        sharpOptions: {
          animated: src.endsWith('.gif'),
        },
      });

      let imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
      };

      let htmlAttributes = {
        whitespaceMode: 'inline',
      };

      // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
      return Image.generateHTML(metadata, imageAttributes, htmlAttributes);
    }

    eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
    eleventyConfig.addLiquidShortcode('image', imageShortcode);
    eleventyConfig.addJavaScriptFunction('image', imageShortcode);
  },

  ogImageSource: function (eleventyConfig) {
    eleventyConfig.addNunjucksShortcode(
      'ogImageSource',
      function ({ url, inputPath }) {
        // special title og images, only for _posts
        if (inputPath.startsWith('./src/posts/')) {
          return `${screenShotService}/${encodeURIComponent(
            `${siteMetaData.url}/opengraph${url}`,
          )}/opengraph/_${cachebuster}`;
        }

        // raw screenshot
        return `${screenShotService}/${encodeURIComponent(
          `${siteMetaData.url}${url}`,
        )}/opengraph/_${cachebuster}`;
      },
    );
  },
};
