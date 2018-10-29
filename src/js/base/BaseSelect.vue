<template>
  <select
    v-bind="$attrs"
    :value="value"
    class="select"
    v-on="inputListeners"
  >
    <base-option
      v-if="!noDefault"
      disabled
    >
      Select an option
    </base-option>

    <slot></slot>
  </select>
</template>

<script>
  import { baseInputProps } from '../core/inputs';

  export default {
    mixins: [baseInputProps],
    inheritAttrs: false,
    props: {
      noDefault: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    mounted() {
      this.$children.forEach((option) => {
        if (option.selected) {
          // this -> legent-field-wrapper -> legent-input
          this.$parent.$parent.value = option.value;
          this.$parent.$parent.validateField();
        }
      });
    }
  };
</script>
