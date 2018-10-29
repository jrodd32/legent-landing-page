<template>
  <base-button
    v-if="isButton"
    :disabled="disabled"
    :text="text"
    :icon="icon"
    :is-submit="isSubmit"
    :class="[linkModifiers, styleModifiers]"
  >
    <slot></slot>
  </base-button>

  <router-link
    v-else-if="shouldUseRouterLink"
    :class="[linkModifiers, styleModifiers]"
    :disabled="disabled"
    :to="href"
  >
    <base-icon
      v-if="icon"
      :icon="icon"
    />
    <span>
      <slot>
        {{ text }}
      </slot>
    </span>
    <!-- NOTE: May need to be reworked. If it stays, this implementation will need to be used on base-button and base-anchor. -->
    <svg v-if="isAbstract">
      <circle
        cx="31"
        cy="29"
        r="20"
      />
    </svg>
  </router-link>

  <base-anchor
    v-else
    :disabled="disabled"
    :href="href"
    :text="text"
    :icon="icon"
    :class="[linkModifiers, styleModifiers]"
    :new-window="newWindow"
  >
    <slot></slot>
  </base-anchor>
</template>

<script>
  import { styleProps } from '../core/mixins';

  export default {
    mixins: [
      styleProps
    ],
    props: {
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      },
      href: {
        type: String,
        required: false,
        default() {
          return '#';
        }
      },
      text: {
        type: String,
        default() {
          return '';
        }
      },
      icon: {
        type: String,
        default() {
          return '';
        }
      },
      isAbstract: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isAnchor: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isBlended: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isButton: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isIconOnly: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isIconRight: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isSubmit: {
        type: Boolean,
        default() {
          return true;
        }
      },
      isTransparent: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isExtraSmall: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isFullWidth: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isSmall: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isMedium: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isLarge: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isExtraLarge: {
        type: Boolean,
        default() {
          return false;
        }
      },
      newWindow: {
        type: Boolean,
        default() {
          return false;
        }
      },
      skipRouter: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        timeline: null
      };
    },
    computed: {
      linkModifiers() {
        return {
          button: !this.isAnchor,
          'is-abstract': this.isAbstract,
          'is-blended': this.isBlended,
          'is-full-width': this.isFullWidth,
          'is-icon-only': this.isIconOnly,
          'is-icon-right': this.isIconRight,
          'is-transparent': this.isTransparent,
          'is-xsmall': this.isExtraSmall,
          'is-small': this.isSmall,
          'is-medium': this.isMedium,
          'is-large': this.isLarge,
          'is-xlarge': this.isExtraLarge
        };
      },
      containerClassname() {
        return `button-${this._uid}`;
      },
      shouldUseRouterLink() {
        if (this.skipRouter) {
          return false;
        }

        // only use router-link for relative URLs
        return this.href.startsWith('/');
      }
    },
    mounted() {
      // this.timeline = new this.$gsapTimelineMax({ paused: true });
      // this.timeline.add(this.$gsapTweenMax.to(`.${this.containerClassname} .wax-button-background`, 0.01, { opacity: 1 }), 0);
      // this.timeline.add(this.$gsapTweenMax.from(`.${this.containerClassname} .wax-button-background`, 0.7, { y: -60 }), 0);
      // this.timeline.add(this.$gsapTweenMax.to(`.${this.containerClassname} .wax-button-path-in`, 0.7, { morphSVG: { shape: `.${this.containerClassname} .wax-button-full` }, shapeIndex: 1, ease: this.$gsapEases.Linear.easeNone }), 0);
    },
    methods: {
      handleMouseenter() {
        // this.timeline.isActive() ? this.timeline.restart() : this.timeline.play();
      },
      handleMouseout() {
        // this.timeline.reverse();
      }
    }
  };
</script>
