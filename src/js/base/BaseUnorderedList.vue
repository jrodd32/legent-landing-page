<template>
  <ul>
    <li
      v-for="(item, index) in items"
      :key="index"
      v-html="item"
    />
  </ul>
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
