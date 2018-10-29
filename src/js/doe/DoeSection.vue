<template>
  <div
    ref="section"
    :class="modifiers"
  >
    <div class="section-media">
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
          :is-icon-only="mediaButtonHasIconOnly"
          :text="mediaButton.text"
          class="media-button"
          is-large
        />
      </slot>
    </div>

    <div class="section-content">
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
  import DoeContent from './DoeContent.vue';

  export default {
    components: {
      DoeContent
    },
    props: {
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
      hasCenteredContent: {
        type: Boolean,
        default() {
          return false;
        }
      },
      hasFullImage: {
        type: Boolean,
        default() {
          return false;
        }
      },
      hasLargeImage: {
        type: Boolean,
        default() {
          return false;
        }
      },
      hasRotatedText: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isHero: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isLargeHeadline: {
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
      isSplit: {
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
      picture: {
        type: Object,
        default() {
          return {};
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
      hasCopy() {
        return this.content.html || this.content.p;
      },
      hasMedia() {
        return this.$slots.media || this.hasPicture || this.hasVideo;
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
      mediaButtonHasIconOnly() {
        return this.hasMediaButton && !this.mediaButton.text;
      },
      modifiers() {
        return {
          section: true,
          'has-centered-content': this.hasCenteredContent,
          'has-copy': this.hasCopy,
          'has-full-image': this.hasFullImage,
          'has-large-image': this.hasLargeImage,
          'has-rotated-text': this.hasRotatedText,
          'is-hero': this.isHero,
          'is-large-headline': this.isLargeHeadline,
          'is-split': this.isSplit,
          'is-reverse': this.isReverse
        };
      }
    }
  };
</script>
