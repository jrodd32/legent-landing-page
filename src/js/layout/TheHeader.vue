<template>
  <header
    class="masthead"
    role="masthead"
  >
    <legent-link
      class="masthead-logo"
      href="/"
      is-anchor
    >
      <span class="visually-hidden">Legent</span>
      <legent-logo />
    </legent-link>
  </header>
</template>

<script>
  import LegentLogo from '../../images/legent-logo.svg';

  export default {
    components: {
      LegentLogo
    },
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      hasItems() {
        return this.items.length > 0;
      }
    }
  };
</script>
