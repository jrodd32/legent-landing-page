<template>
  <div class="error error-500">
    <doe-content>
      <h1>Error</h1>
      <p>This internal server error is clearly on us. Apologies for the inconvenience. We expect to be back to normal shortly.</p>
      <div class="buttons is-center">
        <legent-link
          text="Take me back."
          to="/"
        />
      </div>
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
      document.title = 'Error';
      this.$eventBus.$emit('page-loaded');
    }
  };
</script>
