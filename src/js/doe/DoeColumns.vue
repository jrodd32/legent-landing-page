<template>
  <div :class="styleModifiers">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      animateIn: {
        type: Boolean,
        default() {
          return true;
        }
      },
      isCentered: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isReversed: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isGapless: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    computed: {
      styleModifiers() {
        return {
          columns: true,
          'is-reverse': this.isReversed,
          'is-gapless': this.isGapless,
          'is-centered': this.isCentered
        };
      }
    },
    mounted() {
      if (this.animateIn) {
        this.addScene();
      }
    },
    activated() {
      if (this.animateIn) {
        this.addScene();
      }
    },
    deactivated() {
      this.destroyScene();
    },
    beforeDestroy() {
      this.destroyScene();
    },
    methods: {
      addScene() {
        const timeline = new this.$gsapTimelineMax();

        // NOTE: IE11 can't handle forEach over a nodeList, so convert to an array first
        Array.from(this.$el.querySelectorAll('.column')).forEach((column) => {
          const elements = column.children;
          timeline.staggerFromTo(elements, 1.25, { y: '15%', opacity: 0 }, { y: '0%', opacity: 1 }, 0.25, 0);
        });

        const scene = new this.$scrollMagic.Scene({
          reverse: false,
          triggerElement: this.$el,
          triggerHook: 'onEnter'
        })
        .setTween(timeline);

        this.$scrollActions.$emit('addScene', `columns-${this._uid}`, scene);
      },
      destroyScene() {
        this.$scrollActions.$emit('destroyScene', `columns-${this._uid}`);
      }
    }
  };
</script>
