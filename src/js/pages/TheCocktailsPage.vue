<template>
  <main class="page bourbon">
    <doe-scroll-progress
      ref="scrollProgress"
      class="fade-in"
      is-right
      title="The cocktails"
    />

    <doe-section
      ref="hero"
      :button="{
        href: '/',
        isGold: true,
        isBlended: true,
        text: 'Go home'
      }"
      :content="{
        h1: 'Here is a big headline for the cocktails.'
      }"
      :picture="{
        url: '/images/temp-cocktails.jpg'
      }"
      class="is-white-text is-left-aligned fade-in"
      is-hero
    />
  </main>
</template>

<script>
  // TODO: refactor loading animation parts into mixin/ajaxPageProps
  import DoeScrollProgress from '../doe/DoeScrollProgress.vue';
  import DoeSection from '../doe/DoeSection.vue';

  export default {
    components: {
      DoeScrollProgress,
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

        const scrollProgress = this.$refs.scrollProgress.$el;
        scrollProgress.classList.toggle('is-visible');
      }
    }
  };
</script>
