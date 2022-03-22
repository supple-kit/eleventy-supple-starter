<script>
  export let url = '';
  export let label = 'Share this page';

  function tweet_(url) {
    open(
      'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url),
      '_blank',
    );
  }

  function share() {
    if (navigator.share) {
      navigator.share({
        url: url,
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    } else {
      tweet_(url);
    }
  }
</script>

<style lang="scss">
  @use 'src/assets/styles/settings/vars';
  @use '@supple-kit/supple-css/tools/space';

  .c-share-widget {
    position: fixed;
    inset-inline-end: space.get('base');
    inset-block-end: space.get('base');
    inline-size: space.get('base');
    block-size: space.get('base');
    background-image: url('./share.svg');
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.9;

    :global(.is-apple ) & {
      background-image: url('./share-apple.svg');
    }
  }
</style>

<button class="c-share-widget" on:click={share}><span class="u-visually-hidden">{label}</span></button>
