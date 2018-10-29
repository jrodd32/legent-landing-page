<template>
  <div :class="options.wrapperClasses">
    <label
      :for="options.name"
      class="label"
    >
      {{ options.label }}
    </label>

    <div class="control">
      <span
        v-if="options.hasIcon"
        class="icon"
      >
        <span :class="options.iconClass" />
      </span>

      <!-- Form input field -->
      <slot></slot>
    </div>

    <p
      v-if="options.showHelper"
      class="helper"
      v-html="options.helperText"
    />
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      options: {
        type: Object,
        default() {
          return {
            wrapperClasses: '',
            name: '',
            label: '',

            hasIcon: false,
            iconClass: '',

            hasHelper: false,
            helperText: '',

            disabled: false,
            required: false,
            validated: false
          };
        }
      }
    }
  };
</script>
