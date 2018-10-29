<template>
  <base-blockquote
    :cite="cite"
    :class="[blockquoteModifiers, styleModifiers]"
    :content="content"
  />
</template>

<script>
  import { styleProps } from '../core/mixins';
  import BaseBlockquote from '../base/BaseBlockquote.vue';

  export default {
    components: {
      BaseBlockquote
    },
    mixins: [styleProps],
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
      blockquoteModifiers() {
        return {
          blockquote: true
        };
      }
    }
  };
</script>
