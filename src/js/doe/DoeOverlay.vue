<template>
  <div
    class="overlay"
    @click="handleClick"
  />
</template>

<script>
  export default {
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  };
</script>
