<template>
  <div
    v-if="hasSrc"
    class="iframe-container"
  >
    <iframe
      :src="src"
      frameborder="0"
      scrolling="auto"
    />
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default() {
          return '';
        }
      }
    },
    computed: {
      hasSrc() {
        return this.src.length > 0;
      }
    }
  };
</script>
