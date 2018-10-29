<template>
  <base-ordered-list
    v-if="isOrdered"
    :class="[listModifiers, styleModifiers]"
    :items="items"
  />
  <base-unordered-list
    v-else
    :class="[listModifiers, styleModifiers]"
    :items="items"
  />
</template>

<script>
  import { styleProps } from '../core/mixins';
  import BaseOrderedList from '../base/BaseOrderedList.vue';
  import BaseUnorderedList from '../base/BaseUnorderedList.vue';

  export default {
    components: {
      BaseOrderedList,
      BaseUnorderedList
    },
    mixins: [styleProps],
    props: {
      items: {
        type: [Array, Object],
        default() {
          return [];
        }
      },
      isOrdered: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isInline: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    computed: {
      listModifiers() {
        return {
          list: true,
          'is-inline': this.isInline
        };
      }
    }
  };
</script>
