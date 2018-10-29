<template>
  <legent-link
    :href="resultUrl"
    class="search-result"
    is-anchor
  >
    <div class="result-image">
      <base-picture :picture="result.searchImage" />
    </div>

    <div class="result-info">
      <h2
        class="result-name"
        v-html="result.title"
      />

      <p
        class="result-description"
        v-html="result.metaDescription"
      />
    </div>
  </legent-link>
</template>

<script>
  export default {
    props: {
      result: {
        type: Object,
        required: true
      }
    },
    computed: {
      resultUrl() {
        let path = this.result.url.replace(/^.*\/\/[^/]+/, '');

        if (this.$site !== 'en') {
          path = `/${this.$site.replace(/_/g, '-')}${path}`;
        }

        return path;
      }
    }
  };
</script>

