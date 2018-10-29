<template>
  <cite
    :title="title"
    v-html="content"
  />
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default() {
          return '';
        }
      },
      content: {
        type: String,
        default() {
          return '';
        }
      }
    }
  };
</script>
