<template>
  <div
    class="error error-503"
    data-theme="dark"
  >
    <div class="error-content">
      <doe-content>
        <h1>Offline</h1>
        <p>Your device has no connection.</p>
      </doe-content>
    </div>
  </div>
</template>

<script>
  import DoeContent from '../doe/DoeContent.vue';

  export default {
    components: {
      DoeContent
    },
    mounted() {
      document.title = 'Offline | Legent';
      this.$eventBus.$emit('page-loaded');
    }
  };
</script>
