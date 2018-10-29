<template>
  <main class="page bourbon">
    <doe-scroll-progress
      ref="scrollProgress"
      class="fade-in"
      is-right
      title="The bourbon"
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
        h1: 'Here is a big headline for the product.'
      }"
      :picture="{
        url: '/images/The-Slow-Dock.jpg',
        videoUrl: '/images/The-Slow-Dock.mp4',
        videoUrlMobile: '/images/The-Slow-Dock.mp4'
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
      const overlayEl = document.querySelector('.hero-carousel.is-overlay');

      if (overlayEl) {
        const oldVideo = overlayEl.querySelector('video');

        if (oldVideo) {
          const newVideo = this.$refs.hero.$el.querySelector('video');

          newVideo.currentTime = oldVideo.currentTime;

          this.prepareLoadingVideo(newVideo, oldVideo);

          return;
        }
      }

      this.$emit('page-activated', true);
    },
    methods: {
      animateHero() {
        const hero = this.$refs.hero.$el;
        hero.classList.toggle('is-inset');

        const scrollProgress = this.$refs.scrollProgress.$el;
        scrollProgress.classList.toggle('is-visible');
      },
      prepareLoadingVideo(newVideo, oldVideo) {
        if (newVideo.readyState === 4) {
          this.$emit('page-activated', true, 250);
          return;
        }

        // recursively call method until the above condition is true
        setTimeout(() => {
          this.prepareLoadingVideo(newVideo, oldVideo);
        }, 100);
      }
    }
  };
</script>

<style scoped>
  .page {
    /* TODO: remove, just a test for scroll depth */
    height: 10000px;
  }
</style>
