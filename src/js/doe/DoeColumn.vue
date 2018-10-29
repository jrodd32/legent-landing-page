<template>
  <div :class="classNames">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default() {
          return 'auto';
        }
      },
    },
    computed: {
      classNames() {
        return ['column', `column-${this.size}`];
      }
    }
  }
</script>
