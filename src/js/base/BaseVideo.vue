<template>
  <video
    ref="video"
    :autoplay="autoplay"
    :data-loaded="isLoaded"
    :data-poster="posterUrl"
    :loop="loop"
    :muted="muted"
    :playsinline="playsinline"
    :poster="placeholderPoster"
    data-object-fit="cover"
  >
    <template v-if="hasUrl">
      <source
        :data-src="url"
        media="(min-width: 641px)"
        type="video/mp4"
      />
      <source
        :data-src="urlMobile"
        type="video/mp4"
      />
    </template>
    <template v-else>
      <source
        :data-src="webmUrl"
        type="video/webm"
      />
      <source
        :data-src="mp4Url"
        type="video/mp4"
      />
    </template>
  </video>
</template>

<script>
  export default {
    props: {
      autoplay: {
        type: Boolean,
        default() {
          return false;
        }
      },
      file: {
        type: String,
        default() {
          return '';
        }
      },
      video: {
        type: Object,
        default() {
          return {};
        }
      },
      loadImmediately: {
        type: Boolean,
        default() {
          return false;
        }
      },
      loop: {
        type: Boolean,
        default() {
          return false;
        }
      },
      muted: {
        type: Boolean,
        default() {
          return false;
        }
      },
      playsinline: {
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
    data() {
      return {
        loading: true
      };
    },
    computed: {
      autoDetect() {
        return this.baseFile.length > 0;
      },
      baseFile() {
        return this.file.replace(/\.[^/.]+$/, '');
      },
      hasUrl() {
        return this.url && this.url.length > 0;
      },
      isLoaded() {
        return !this.loading;
      },
      mp4Url() {
        if (this.hasUrl) {
          return '';
        }

        return this.autoDetect ? `${this.baseFile}.mp4` : this.video.mp4;
      },
      placeholderPoster() {
        return 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0wIDBoMXYxaC0xeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==';
      },
      webmUrl() {
        if (this.hasUrl) {
          return '';
        }

        return this.autoDetect ? `${this.baseFile}.webm` : this.video.webm;
      }
    },
    activated() {
      if (window.prerender) {
        return;
      }

      if (this.loadImmediately) {
        this.loadVideo();
        return;
      }

      this.addScene();
    },
    deactivated() {
      if (!this.loading) {
        this.$refs.video.pause();
        this.$refs.video.currentTime = 0;
        return;
      }

      this.destroyScene();
    },
    mounted() {
      if (window.prerender) {
        return;
      }

      if (this.loadImmediately) {
        this.loadVideo();
        return;
      }

      this.addScene();
    },
    beforeDestroy() {
      this.destroyScene();
    },
    methods: {
      addScene() {
        if (this.loading) {
          const loadScene = new this.$scrollMagic.Scene({
            offset: -(window.innerHeight),
            reverse: false,
            triggerElement: this.$el.parentNode,
            triggerHook: 'onEnter'
          })
          .on('enter', () => {
            this.loadVideo();
            this.$scrollActions.$emit('destroyScene', `video-${this._uid}`);
          });

          this.$scrollActions.$emit('addScene', `video-${this._uid}`, loadScene);
          return;
        }

        this.$refs.video.play();
      },
      destroyScene() {
        this.$scrollActions.$emit('destroyScene', `video-${this._uid}`);
      },
      loadVideo() {
        if (this.loading) {
          this.$refs.video.poster = this.$refs.video.dataset.poster;
          const sources = this.$refs.video.getElementsByTagName('source');
          Array.from(sources).forEach((source) => {
            source.src = source.dataset.src;
          });
          setTimeout(() => {
            this.$refs.video.load();
            window.objectFitPolyfill();
          }, 50);
          this.loading = false;
          return;
        }

        this.$refs.video.play();
      }
    }
  };
</script>
