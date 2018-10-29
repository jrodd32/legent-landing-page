<template>
  <div
    ref="split"
    :class="splitModifiers"
  >
    <legent-link
      v-if="isClickable"
      :href="href"
      class="overlay-link"
      is-anchor
    />

    <div
      v-if="hasMedia"
      ref="image"
      class="split-image"
    >
      <slot name="media">
        <base-picture
          v-if="hasPicture"
          :picture="picture"
        />

        <legent-video-background
          v-if="hasVideo"
          :dimensions="picture.dimensions"
          :file="videoFile"
          :poster-url="picture.url"
          :should-have-padding="true"
          :url="picture.videoUrl"
          :url-mobile="picture.videoUrlMobile"
          :video="video"
        />

        <legent-link
          v-if="hasMediaButton"
          :icon="mediaButton.icon"
          :text="mediaButton.text"
          class="media-button"
          is-large
        />
      </slot>
    </div>

    <div
      v-if="hasContent"
      ref="contentContainer"
      class="split-content"
    >
      <div
        v-if="hasBackground"
        ref="background"
        class="split-background"
      />
      <slot>
        <doe-content
          ref="content"
          :h1="content.h1"
          :h2="content.h2"
          :h3="content.h3"
          :html="content.html"
          :p="content.p"
          :ul="content.ul"
          :ol="content.ol"
          :button="button"
        />
      </slot>
    </div>
  </div>
</template>

<script>
  import { windowProps } from '../core/mixins';
  import DoeContent from '../doe/DoeContent.vue';

  export default {
    components: {
      DoeContent
    },
    mixins: [
      windowProps
    ],
    props: {
      animateIn: {
        type: Boolean,
        default() {
          return true;
        }
      },
      button: {
        type: Object,
        default() {
          return {};
        }
      },
      content: {
        type: Object,
        default() {
          return {};
        }
      },
      hasBackground: {
        type: Boolean,
        default() {
          return false;
        }
      },
      hasCarousel: {
        type: Boolean,
        default() {
          return false;
        }
      },
      hasMobileFirstContent: {
        type: Boolean,
        default() {
          return false;
        }
      },
      mediaButton: {
        type: Object,
        default() {
          return {};
        }
      },
      href: {
        type: String,
        default() {
          return '';
        }
      },
      isClickable: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isContentSplit: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isDivided: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isFull: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isReverse: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isTwoUp: {
        type: Boolean,
        default() {
          return false;
        }
      },
      picture: {
        type: Object,
        default() {
          return {};
        }
      },
      showMobileFirstContentDivider: {
        type: Boolean,
        default() {
          return true;
        }
      },
      video: {
        type: Object,
        default() {
          return {};
        }
      },
      videoFile: {
        type: String,
        default() {
          return '';
        }
      }
    },
    computed: {
      splitModifiers() {
        return {
          split: true,
          'has-background': this.hasBackground,
          'has-carousel': this.hasCarousel,
          'is-content-split': this.isContentSplit,
          'has-mobile-first-content': this.showmobileFirstContent,
          'has-squiggle': this.showMobileFirstContentDivider && this.showmobileFirstContent,
          'is-divided': this.isDivided,
          'is-full': this.isFull,
          'is-reverse': this.isReverse,
          'is-two-up': this.isTwoUp
        };
      },
      hasContent() {
        return Object.keys(this.content).length > 0 || this.$slots.default;
      },
      hasMedia() {
        return this.$slots.media || this.hasCarousel || this.hasPicture || this.hasVideo;
      },
      hasMediaButton() {
        return Object.keys(this.mediaButton).length > 0;
      },
      hasPicture() {
        return this.picture && Object.keys(this.picture).length > 0 && ('videoUrl' in this.picture === false || this.picture.videoUrl === null);
      },
      hasVideo() {
        return (this.picture && this.picture.videoUrl && this.picture.videoUrl.length > 0) || this.videoFile.length > 0 || (this.video && Object.keys(this.video).length > 0);
      },
      showmobileFirstContent() {
        return this.hasMobileFirstContent || (this.isDivided && this.hasCarousel);
      }
    },
    mounted() {
      if (this.animateIn) {
        this.addScene();
      }
    },
    beforeDestroy() {
      this.destroyScene();
    },
    activated() {
      if (this.animateIn) {
        this.addScene();
      }
    },
    deactivated() {
      this.destroyScene();
    },
    methods: {
      addScene() {
        if (this.hasBackground) {
          const timeline = new this.$gsapTimelineMax();
          const {
              background,
              content,
              image,
              split
            } = this.$refs;

          if (this.isDesktop) {
            timeline.fromTo(background, 1.5, { x: '-50%' }, { x: '0%' })
              .fromTo(image, 1, { opacity: 0, y: '0%' }, { opacity: 1, y: '-10%' })
              .fromTo(content.$el, 1, { opacity: 0, y: '15%' }, { opacity: 1, y: '0%' }, '-=1');
          }

          if (!this.isDesktop) {
            timeline.fromTo(background, 1, { x: '-50%' }, { x: '0%' })
              .fromTo(image, 1, { opacity: 0, y: '15%' }, { opacity: 1, y: '0%' })
              .fromTo(content.$el, 1, { opacity: 0, y: '15%' }, { opacity: 1, y: '0%' }, '-=1');
          }

          const scene = new this.$scrollMagic.Scene({
            offset: -200,
            reverse: false,
            triggerElement: split,
            triggerHook: 'onEnter'
          })
          .setTween(timeline)
          .on('enter', () => {
            setTimeout(() => {
              this.$emit('split-transition-finished');
            }, 1000);
          });

          this.$scrollActions.$emit('addScene', `split-container-${this._uid}`, scene);
          return;
        }

        const {
            split,
            contentContainer,
            image
        } = this.$refs;

        const timelineContainer = new this.$gsapTimelineMax();

        if (image) {
          timelineContainer.fromTo(image, 1.25, { y: '15%', opacity: 0 }, { y: '0%', opacity: 1 }, 0);
        }

        const containerScene = new this.$scrollMagic.Scene({
          reverse: false,
          triggerElement: split,
          triggerHook: 'onEnter'
        })
        .setTween(timelineContainer);

        this.$scrollActions.$emit('addScene', `split-container-${this._uid}`, containerScene);

        const timeline = new this.$gsapTimelineMax();
        timeline.fromTo(contentContainer, 1.25, { y: '15%', opacity: 0 }, { y: '0%', opacity: 1 });

        const scene = new this.$scrollMagic.Scene({
          reverse: false,
          triggerElement: contentContainer,
          triggerHook: 'onEnter'
        })
        .setTween(timeline);

        this.$scrollActions.$emit('addScene', `split-content-${this._uid}`, scene);
      },
      destroyScene() {
        this.$scrollActions.$emit('destroyScene', `split-container-${this._uid}`);
        this.$scrollActions.$emit('destroyScene', `split-content-${this._uid}`);
      }
    }
  };
</script>
