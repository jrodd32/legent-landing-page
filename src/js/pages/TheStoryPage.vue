<template>
  <main class="page story">
    <div
      ref="hero"
      class="intro"
    >
      <div class="intro-signature fred">
        <fred-signature />
      </div>

      <div class="intro-background">
        <div class="intro-media">
          <legent-video-background
            :should-have-padding="true"
            poster-url="/images/Boats-and-Waves.jpg"
            url="/images/Boats-and-Waves.mp4"
            url-mobile="/images/Boats-and-Waves.mp4"
          />
        </div>
      </div>

      <div class="intro-signature sinji">
        <sinji-signature />
      </div>
    </div>

    <doe-section
      :content="{
        h2: 'Two True Legends'
      }"
      :picture="{ url: '/images/legent-stroke.svg' }"
      class="has-stroke-background"
      has-full-image
      is-hero
      is-large-headline
    />

    <div class="founders">
      <div class="founders-content">
        <div class="content">
          <h2>Meet Fred & Sinji.</h2>
          <p>Porttitor lobortis nullam suspendisse mattis conubia facilisis etiam arcu primis, blandit senectus natoque potenti euismod ante congue a accumsan cursus, ligula habitasse.</p>
        </div>
      </div>
      <div class="founders-item founders-item-left">
        <span class="founders-item-toggle">
          From Fred
          <span class="icon">
            <span class="icon-play"></span>
          </span>
        </span>
        <img
          class="founders-item-image"
          src="/images/story-fred-portrait.jpg"
          alt=""
        />
      </div>
      <div class="founders-item founders-item-right">
        <span class="founders-item-toggle">
          From Sinji
          <span class="icon">
            <span class="icon-play"></span>
          </span>
        </span>
        <img
          class="founders-item-image"
          src="/images/story-sinji-portrait.jpg"
          alt=""
        />
      </div>
    </div>

    <doe-section
      :content="{
        h2: 'Talk about bourbon through Fred',
        html: '<p>This is a paragraph using ITC Legacy Sans Book at 18px, with a 30px line-height in the color black. It contains a sentence with bold and itatlic styling. Phasellus pharetra urna sit amet tellus elementum aliquet in et quam. In condimentum dui.</p>'
      }"
      :media-button="{
        icon: 'play',
        href: '#'
      }"
      :picture="{ url: '/images/story-fred-distillery.jpg' }"
      has-full-image
      is-split
    />

    <doe-section
      :content="{
        h2: 'Talk about precision through Sinji',
        html: '<p>This is a paragraph using ITC Legacy Sans Book at 18px, with a 30px line-height in the color black. It contains a sentence with bold and itatlic styling. Phasellus pharetra urna sit amet tellus elementum aliquet in et quam. In condimentum dui.</p>'
      }"
      :media-button="{
        icon: 'play',
        href: '#'
      }"
      :picture="{ url: '/images/story-sinji-distillery.jpg' }"
      has-full-image
      is-reverse
      is-split
    />

    <!-- TODO: process carousel -->

    <doe-section
      :button="{
        href: '/bourbon',
        text: 'Button'
      }"
      :content="{
        h2: 'Here is a call to the product page.',
        html: '<p>Nunc ac porta turpis, et sagittis magna. Nunc id ultrices quam. Nulla nec libero lorem. Phasellus semper pharetra risus bibendum ornare. Cras tristique auctor dolor, bibendum pharetra elit condimentum sit amet. Vivamus ac sollicitudin metus. Maecenas ac neque nisi. Fusce eu enim at orci eleifend dapibus. In tincidunt tortor vitae massa vulputate porta. </p>'
      }"
      :picture="{ url: 'https://satyr.io/1350x1:1' }"
      has-centered-content
      has-large-image
      is-reverse
      is-split
    />

    <doe-scroll-progress
      ref="scrollProgress"
      class="fade-in"
      is-dark-text
      is-right
      title="The story"
    />
  </main>
</template>

<script>
  // TODO: refactor loading animation parts into mixin/ajaxPageProps
  import DoeScrollProgress from '../doe/DoeScrollProgress.vue';
  import DoeSection from '../doe/DoeSection.vue';
  import FredSignature from '../../images/fred-signature.svg';
  import SinjiSignature from '../../images/sinji-signature.svg';

  export default {
    components: {
      DoeScrollProgress,
      DoeSection,
      FredSignature,
      SinjiSignature
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
          const newVideo = this.$refs.hero.querySelector('video');

          newVideo.currentTime = oldVideo.currentTime;

          this.prepareLoadingVideo(newVideo, oldVideo);

          return;
        }
      }

      this.$emit('page-activated', true);
    },
    methods: {
      animateHero() {
        const { hero } = this.$refs;
        hero.classList.toggle('is-ready');

        setTimeout(() => {
          hero.classList.toggle('is-finished');

          setTimeout(() => {
            hero.classList.toggle('show-names');

            const scrollProgress = this.$refs.scrollProgress.$el;
            scrollProgress.classList.toggle('is-visible');
          }, 10);
        }, 1000);
      },
      prepareLoadingVideo(newVideo, oldVideo) {
        if (newVideo.readyState === 4) {
          this.$emit('page-activated', true, 2000);
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
