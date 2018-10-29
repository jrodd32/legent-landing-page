<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    created() {
      this.$on('rowOpened', (rowUid) => {
        this.$children.forEach(childComponent => childComponent.hide(rowUid));
        this.$parent.$emit('rowOpened');
      });
    }
  };
</script>
