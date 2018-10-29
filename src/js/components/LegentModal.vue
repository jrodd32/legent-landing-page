<template>
  <portal
    v-if="isOpen"
    to="modals"
  >
    <transition name="fade">
      <div :class="modalClassNames">
        <div class="modal-body">
          <legent-link
            class="modal-close"
            icon="cancel"
            is-button
            is-icon-only
            @click.native.prevent="close"
          />
          <div
            ref="modal"
            class="modal-content"
          >
            <slot></slot>
          </div>
        </div>

        <doe-overlay
          class="is-dark"
          @click.native.prevent="close"
        />
      </div>
    </transition>
  </portal>
</template>

<script>
  import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
  import { escKeyProps } from '../core/mixins';
  import DoeOverlay from '../doe/DoeOverlay.vue';

  const bodyElement = document.body;

  export default {
    components: {
      DoeOverlay
    },
    mixins: [
      escKeyProps
    ],
    props: {
      isAlert: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isOpen: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isPage: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isImage: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isVideo: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    computed: {
      modalClassNames() {
        return {
          modal: true,
          'is-alert': this.isAlert,
          'is-page': this.isPage,
          'is-image': this.isImage,
          'is-video': this.isVideo
        };
      }
    },
    watch: {
      isOpen(isOpen) {
        bodyElement.classList.toggle('has-modal-active', isOpen);
        this.toggleEscKey();

        if (isOpen) {
          // wait for modal to be rendered
          this.$nextTick(() => {
            disableBodyScroll(this.$refs.modal);
          });
        } else {
          enableBodyScroll(this.$refs.modal);
        }

        const loadedVideos = document.querySelectorAll('[data-loaded="true"]');

        if (isOpen && loadedVideos.length > 0) {
          // NOTE: IE11 can't handle forEach over a nodeList, so convert to an array first
          Array.from(loadedVideos).forEach((video) => {
            video.pause();
          });
        }

        if (!isOpen && loadedVideos.length > 0) {
          // NOTE: IE11 can't handle forEach over a nodeList, so convert to an array first
          Array.from(loadedVideos).forEach((video) => {
            video.play();
          });
        }
      }
    },
    beforeDestroy() {
      bodyElement.classList.remove('has-modal-active');
      clearAllBodyScrollLocks();
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
</script>
