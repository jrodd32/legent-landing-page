<template>
  <div :class="imageClassNames">
    <div
      v-if="hasLoadingUrl"
      :style="loadingStyle"
      class="image-placeholder"
    >
      <canvas ref="canvas" />
    </div>

    <picture
      v-if="hasSources"
    >
      <source
        v-for="(source, index) in picture.sources"
        :key="index"
        :media="source.mediaQuery"
        :data-srcset="source.url"
      />
      <img
        ref="image"
        :alt="picture.alt"
        :data-src="picture.url"
        :src="svgImage"
        :title="picture.title"
        class="image-content"
      />
    </picture>

    <img
      v-else-if="hasSrcSet"
      ref="image"
      :alt="picture.alt"
      :data-src="picture.url"
      :data-srcset="picture.srcset"
      :src="svgImage"
      :title="picture.title"
      class="image-content"
      sizes="100vw"
    />

    <img
      v-else
      ref="image"
      :alt="picture.alt"
      :data-src="picture.url"
      :src="svgImage"
      :title="picture.title"
      class="image-content"
    />
  </div>
</template>

<script>
  import picturefill from 'picturefill';
  import stackblur from 'stackblur-canvas';

  export default {
    props: {
      objectFit: {
        type: String,
        default() {
          return null;
        }
      },
      padding: {
        type: String,
        default() {
          return '';
        }
      },
      picture: {
        type: Object,
        default() {
          return {
            alt: '',
            aspectRatio: 1,
            dimensions: {
              width: 1,
              height: 1
            },
            loadingUrl: null,
            title: '',
            sources: [],
            srcset: '',
            url: ''
          };
        }
      }
    },
    data() {
      return {
        blurLoaded: false,
        loading: true,
        svgImage: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0wIDBoMXYxaC0xeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg=='
      };
    },
    computed: {
      hasLoadingUrl() {
        return this.picture && this.picture.loadingUrl && this.picture.loadingUrl.length > 0;
      },
      hasSources() {
        return this.picture && 'sources' in this.picture && this.picture.sources.length > 0;
      },
      hasSrcSet() {
        return this.picture && 'srcset' in this.picture && this.picture.srcset.length > 0;
      },
      imageClassNames() {
        return {
          image: true,
          'has-blur': this.blurLoaded,
          'is-lazy': this.hasLoadingUrl,
          'is-loading': this.loading
        };
      },
      loadingStyle() {
        return {
          paddingTop: this.paddingTop
        };
      },
      paddingTop() {
        if (!this.shouldHavePadding) {
          return null;
        }

        return this.padding.length > 0 ? this.padding : `${(this.picture.dimensions.height / this.picture.dimensions.width) * 100}%`;
      },
      shouldHavePadding() {
        return this.padding.length > 0 || (this.picture.dimensions && Object.keys(this.picture.dimensions).length > 0);
      }
    },
    beforeDestroy() {
      this.destroyScene();
    },
    mounted() {
      if (window.prerender) {
        return;
      }

      this.setupImage();
    },
    activated() {
      if (window.prerender) {
        return;
      }

      this.setupImage();
    },
    deactivated() {
      this.destroyScene();
    },
    methods: {
      addScene() {
        const loadScene = new this.$scrollMagic.Scene({
          offset: -(window.innerHeight * 3),
          reverse: false,
          triggerElement: this.$el.parentNode,
          triggerHook: 'onEnter'
        })
        .on('enter', () => {
          let loadingImage = new Image();
          loadingImage.crossOrigin = 'anonymous';
          loadingImage.src = this.picture.loadingUrl;
          loadingImage.onload = () => {
            this.blurCanvas(loadingImage);
            loadingImage = null;
            this.loadFullImage();
            this.$scrollActions.$emit('destroyScene', `picture-${this._uid}`);
          };
        });

        this.$scrollActions.$emit('addScene', `picture-${this._uid}`, loadScene);
      },
      blurCanvas(image) {
        const { canvas } = this.$refs;
        const canvasContext = canvas.getContext('2d');
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        canvasContext.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        stackblur.canvasRGBA(canvas, 0, 0, canvasWidth, canvasHeight, 20);
        this.blurLoaded = true;
      },
      destroyScene() {
        this.$scrollActions.$emit('destroyScene', `picture-${this._uid}`);
      },
      loadFullImage() {
        const { image } = this.$refs;

        if (this.hasSources) {
          const sources = image.parentNode.getElementsByTagName('source');
          Array.from(sources).forEach((source) => {
            source.srcset = source.dataset.srcset;
          });
        }

        if (this.hasSrcSet) {
          image.srcset = image.dataset.srcset;
        }

        image.src = image.dataset.src;

        image.onload = () => {
          this.loading = false;

          if (typeof picturefill === 'function') {
            picturefill();
          }
        };
      },
      setupImage() {
        if (!this.loading) {
          return;
        }

        if (this.hasLoadingUrl) {
          this.$nextTick(() => {
            this.addScene();
          });
          return;
        }

        const { image } = this.$refs;

        if (this.hasSources) {
          const sources = image.parentNode.getElementsByTagName('source');
          Array.from(sources).forEach((source) => {
            source.srcset = source.dataset.srcset;
          });
        }

        if (this.hasSrcSet) {
          image.srcset = image.dataset.srcset;
        }

        image.src = image.dataset.src;

        this.loading = false;
      }
    }
  };
</script>
