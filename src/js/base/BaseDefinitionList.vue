<template>
  <dl>
    <template v-for="(item, itemIndex) in list">
      <dt
        :key="'t' + itemIndex"
        v-html="item.term"
      />
      <dd
        v-for="(description, descriptionIndex) in item.descriptions"
        :key="'d' + itemIndex + descriptionIndex"
        v-html="description"
      />
    </template>
  </dl>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  };
</script>
