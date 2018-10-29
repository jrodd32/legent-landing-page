<template>
  <ol>
    <li
      v-for="(item, index) in items"
      :key="index"
      v-html="item"
    />
  </ol>
</template>

<script>
  export default {
    props: {
      items: {
        type: [Array, Object],
        default() {
          return [];
        }
      }
    }
  };
</script>
