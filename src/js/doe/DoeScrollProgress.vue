<template>
  <div :class="classNames">
    <span
      v-if="hasTitle"
      class="scroll-progress-text"
      v-html="title"
    />
    <div class="scroll-progress-bar">
      <i :style="progressStyle" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isDarkText: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isRight: {
        type: Boolean,
        default() {
          return false;
        }
      },
      title: {
        type: String,
        default() {
          return '';
        }
      }
    },
    data() {
      return {
        progress: 0
      };
    },
    computed: {
      classNames() {
        return {
          'scroll-progress': true,
          'is-dark-text': this.isDarkText,
          'is-right': this.isRight
        };
      },
      hasTitle() {
        return this.title && this.title.length > 0;
      },
      progressStyle() {
        return {
          width: `${this.progress}%`
        };
      }
    },
    activated() {
      document.addEventListener('scroll', this.handleScroll, { passive: true });
    },
    deactivated() {
      document.addEventListener('scroll', this.handleScroll, { passive: true });
    },
    methods: {
      handleScroll() {
        const docHeight = document.body.clientHeight;
        const winHeight = window.innerHeight;
        const max = docHeight - winHeight;
        const value = window.scrollY;

        this.progress = (value / max) * 100;
      }
    }
  };
</script>
