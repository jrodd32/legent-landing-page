<template>
  <footer
    class="footer"
    role="contentinfo"
  >
  </footer>
</template>

<script>
  import DoeContent from '../doe/DoeContent.vue';

  export default {
    components: {
      DoeContent
    },
    computed: {
      copyrightYear() {
        return new Date().getFullYear();
      }
    }
  };
</script>
