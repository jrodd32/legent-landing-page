<template>
  <a
    :href="href"
    :rel="rel"
    :target="target"
    :title="title"
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
  </a>
</template>

<script>
  export default {
    props: {
      href: {
        type: String,
        default() {
          return '#';
        }
      },
      icon: {
        type: String,
        default() {
          return '';
        }
      },
      newWindow: {
        type: Boolean,
        default() {
          return false;
        }
      },
      text: {
        type: String,
        default() {
          return '';
        }
      },
      title: {
        type: String,
        default() {
          return null;
        }
      }
    },
    computed: {
      rel() {
        return this.newWindow ? 'noopener' : null;
      },
      target() {
        return this.newWindow ? '_blank' : null;
      }
    }
  };
</script>
