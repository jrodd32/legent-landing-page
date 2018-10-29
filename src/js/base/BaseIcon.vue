<template>
  <span
    v-if="hasIcon"
    class="icon"
  >
    <span :class="iconClass" />
  </span>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default() {
          return '';
        }
      }
    },
    computed: {
      hasIcon() {
        return this.icon.length > 0;
      },
      iconClass() {
        return `icon-${this.icon}`;
      }
    }
  };
</script>
