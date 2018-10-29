<template>
  <div class="error error-404">
    <doe-content>
      <h1>Nothing here.</h1>
      <p>Something seems to have consumed the page you requested. We’ll do our best to get to the bottom of this.</p>
      <legent-link
        text="Take me back."
        to="/"
      />
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
      document.title = '404';
      this.$eventBus.$emit('page-rendered');
    },
    methods: {
      handleSearchClick() {
        this.$eventBus.$emit('show-search');
      }
    }
  };
</script>
