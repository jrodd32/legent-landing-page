<template>
  <div class="buttons">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      isCenter: {
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
      }
    },
    computed: {
      buttonsModifiers() {
        return {
          buttons: true,
          'is-center': this.isCenter,
          'is-right': this.isRight
        };
      }
    }
  };
</script>
