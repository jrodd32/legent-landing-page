<template>
  <div
    :style="style"
    class="video-background"
  >
    <div
      v-if="!video.disableFilter"
      class="filter"
    />
    <base-video
      :file="file"
      :load-immediately="loadImmediately"
      :poster-url="computedPosterUrl"
      :url="url"
      :url-mobile="urlMobile"
      :video="video"
      autoplay
      loop
      muted
      playsinline
    />
  </div>
</template>

<script>
  export default {
    props: {
      dimensions: {
        type: Object,
        default() {
          return {};
        }
      },
      file: {
        type: String,
        default() {
          return '';
        }
      },
      loadImmediately: {
        type: Boolean,
        default() {
          return false;
        }
      },
      posterUrl: {
        type: String,
        default() {
          return 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0wIDBoMXYxaC0xeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==';
        }
      },
      shouldHavePadding: {
        type: Boolean,
        default() {
          return false;
        }
      },
      video: {
        type: Object,
        default() {
          return {};
        }
      },
      url: {
        type: String,
        default() {
          return '';
        }
      },
      urlMobile: {
        type: String,
        default() {
          return '';
        }
      }
    },
    computed: {
      autoDetect() {
        return this.baseFile.length > 0;
      },
      baseFile() {
        return this.file.replace(/\.[^/.]+$/, '');
      },
      computedPosterUrl() {
        if (this.hasUrl) {
          return this.posterUrl;
        }

        return this.autoDetect ? `${this.baseFile}.jpg` : this.video.poster;
      },
      hasUrl() {
        return this.url && this.url.length > 0;
      },
      paddingTop() {
        if (!this.shouldHavePadding || Object.keys(this.dimensions).length === 0) {
          return null;
        }

        return `${(this.dimensions.height / this.dimensions.width) * 100}%`;
      },
      style() {
        return {
          paddingTop: this.paddingTop
        };
      }
    }
  };
</script>
