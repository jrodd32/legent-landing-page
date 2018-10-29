<template>
  <input
    v-if="type === 'text'"
    v-bind="$attrs"
    :value="value"
    :type="type"

    class="input"

    v-on="inputListeners"
  />

  <input
    v-else
    v-bind="$attrs"
    :checked="checked"
    :value="value"
    :type="type"

    class="input"

    v-on="inputListeners"
  />
</template>

<script>
  import { baseInputProps } from '../core/inputs';

  export default {
    mixins: [baseInputProps],
    inheritAttrs: false
  };
</script>
