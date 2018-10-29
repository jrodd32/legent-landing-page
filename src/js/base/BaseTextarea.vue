<template>
  <div class="textarea">
    <pre><span v-html="value"></span><br/></pre>
    <textarea
      ref="textarea"
      v-bind="$attrs"

      :cols="columns"
      :rows="rows"
      :value="value"

      class="textarea"

      v-on="inputListeners"
    />
  </div>
</template>

<script>
  import { baseInputProps } from '../core/inputs';

  export default {
    mixins: [baseInputProps],
    inheritAttrs: false,
    props: {
      columns: {
        type: [String, Number, Boolean],
        default() {
          return false;
        }
      },
      rows: {
        type: [String, Number, Boolean],
        default() {
          return false;
        }
      }
    }
  };
</script>
