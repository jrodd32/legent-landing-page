<template>
  <figure>
    <base-picture :picture="picture" />
    <figcaption v-if="hasCaption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script>
  export default {
    props: {
      picture: {
        type: Object,
        required: true
      },
      caption: {
        type: String,
        default() {
          return '';
        }
      }
    },
    computed: {
      hasCaption() {
        return this.caption && this.caption.length > 0;
      }
    }
  };
</script>
