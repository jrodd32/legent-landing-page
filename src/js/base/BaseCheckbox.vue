<template>
  <input
    type="checkbox"
    v-bind="{ id, name, disabled, required, value, checked }"
  >
</template>

<script>
  import { baseInputProps } from '../core/inputs';

  export default {
    inheritAttrs: false,
    mixins: [baseInputProps],
    props: {
      text: {
        type: String
      },
      value: {
        type: [String, Number, Boolean]
      },
      id: {
        type: String
      },
      name: {
        type: String
      },
      required: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      checked: {
        type: Boolean
      }
    }
  }
</script>
