<template>
  <blockquote>
    <p v-html="content" />
    <base-cite
      v-if="hasCite"
      :title="cite.title"
      :content="cite.content"
    />
  </blockquote>
</template>

<script>
  export default {
    props: {
      content: {
        type: String,
        default() {
          return '';
        }
      },
      cite: {
        type: Object,
        default() {
          return {
            content: '',
            title: ''
          };
        }
      }
    },
    computed: {
      hasCite() {
        return ((this.cite.title && this.cite.title.length > 0) || (this.cite.content && this.cite.content.length > 0));
      }
    }
  };
</script>
