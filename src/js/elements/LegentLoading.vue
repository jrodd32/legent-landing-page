<template>
  <the-404-page v-if="show404Page" />

  <div
    v-else
    class="loading"
  >
    Loading...
  </div>
</template>

<script>
  import The404Page from '../pages/The404Page.vue';

  export default {
    components: {
      The404Page
    },
    props: {
      status: {
        type: Object,
        required: true
      }
    },
    computed: {
      show404Page() {
        return this.status.hasError && this.status.code === 404;
      }
    }
  };
</script>
