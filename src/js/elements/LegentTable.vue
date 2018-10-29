<template>
  <BaseTable
    :header-rows="headerRows"
    :body-rows="bodyRows"
    :class="classNames"
  />
</template>

<script>
  import { tableProps } from '../core/mixins';
  import BaseTable from '../base/BaseTable.vue';

  export default {
    components: {
      BaseTable
    },
    mixins: [tableProps],
    props: {
      isNarrow: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isFullWidth: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    computed: {
      classNames() {
        const classNames = ['table'];

        if (this.isNarrow) {
          classNames.push('is-narrow');
        } else if (this.isFullWidth) {
          classNames.push('is-fullwidth');
        }

        return classNames;
      }
    }
  }
</script>
