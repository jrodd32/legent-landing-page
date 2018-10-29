<template>
  <main class="page bourbon">
    <doe-section
      ref="hero"
      :button="{
        href: '/',
        isGold: true,
        isBlended: true,
        text: 'Go home'
      }"
      :content="{
        h1: 'Here is a big headline for the find page.'
      }"
      :picture="{
        url: '/images/temp-find.jpg'
      }"
      class="is-white-text is-left-aligned fade-in"
      is-hero
    />
  </main>
</template>

<script>
  // TODO: refactor loading animation parts into mixin/ajaxPageProps
  import DoeSection from '../doe/DoeSection.vue';

  export default {
    components: {
      DoeSection
    },
    created() {
      this.$eventBus.$on('animate-page', () => {
        setTimeout(() => {
          this.animateHero();
        }, 250);

        this.$eventBus.$emit('page-loaded');
      });
    },
    activated() {
      this.$emit('page-activated', true);
    },
    methods: {
      animateHero() {
        const hero = this.$refs.hero.$el;
        hero.classList.toggle('is-inset');
      }
    }
  };
</script>
