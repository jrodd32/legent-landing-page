<template>
  <div class="error error-503">
    <doe-content>
      <h1>Site maintenance</h1>
      <p></p>
    </doe-content>
  </div>
</template>

<script>
  import DoeContent from '../doe/DoeContent.vue';

  export default {
    components: {
      DoeContent
    },
    mounted() {
      document.title = 'Site Maintenance';
      this.$eventBus.$emit('page-loaded');
    }
  };
</script>
