/**
 * Add Eleventy passthrough directories here
 */
module.exports = {
  manifest: () => ({ 'src/assets/manifest': 'public/manifest' }),
  admin: () => ({ 'src/admin/config.yml': 'public/admin/config.yml' }),
};
