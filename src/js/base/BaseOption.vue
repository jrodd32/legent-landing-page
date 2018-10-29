<template>
  <option
    :selected="isSelected"
    :value="value"
    v-bind="$attrs"
    class="option"
    v-on="inputListeners"
  >
    {{ field }}
    <slot></slot>
  </option>
</template>

<script>
  import { baseInputProps } from '../core/inputs';

  export default {
    mixins: [
      baseInputProps
    ],
    inheritAttrs: false,
    computed: {
      isSelected() {
        return this.selected || this.value === this.$parent.value;
      }
    }
  };
</script>
