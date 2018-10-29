<template>
  <div
    v-show="isActive"
    class="form-section"
    @input="handleInput"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive: false
      };
    },
    methods: {
      handleInput() {
        this.$emit('input-changed', this);
      }
    }
  };
</script>
