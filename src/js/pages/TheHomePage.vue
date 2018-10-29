<template>
  <main class="page home">
    <legent-carousel-hero :slides="slides" />
  </main>
</template>

<script>
  import LegentCarouselHero from '../components/LegentCarouselHero.vue';

  export default {
    components: {
      LegentCarouselHero
    },
    data() {
      return {
        slides: [
          {
            button: {
              isGold: true,
              text: 'The Bourbon',
              href: '/bourbon'
            },
            content: {
              h1: 'Here is a really big headline.'
            },
            picture: {
              url: '/images/The-Slow-Dock.jpg',
              videoUrl: '/images/The-Slow-Dock.mp4',
              videoUrlMobile: '/images/The-Slow-Dock.mp4'
            }
          },
          {
            button: {
              isGold: true,
              text: 'The Story',
              href: '/story'
            },
            content: {
              h1: 'Here is a really big headline (#2)'
            },
            picture: {
              url: '/images/Boats-and-Waves.jpg',
              videoUrl: '/images/Boats-and-Waves.mp4',
              videoUrlMobile: '/images/Boats-and-Waves.mp4'
            }
          },
          {
            button: {
              isGold: true,
              text: 'The Cocktails',
              href: '/cocktails'
            },
            content: {
              h1: 'Here is a really big headline (#3)'
            },
            picture: {
              url: '/images/temp-cocktails.jpg'
            }
          },
          {
            button: {
              isGold: true,
              text: 'Find Legent',
              href: '/find'
            },
            content: {
              h1: 'Here is a really big headline (#4)'
            },
            picture: {
              url: '/images/temp-find.jpg'
            }
          }
        ]
      };
    },
    activated() {
      this.$emit('page-activated');
      this.$eventBus.$emit('page-loaded');
    }
  };
</script>
