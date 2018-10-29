<template>
  <div class="hero-carousel">
    <div
      ref="slidesContainer"
      class="hero-carousel-content"
    >
      <doe-section
        v-for="(slide, index) in slides"
        :key="index"
        :picture="slide.picture"
        has-full-image
        is-hero
      >
        <h1 v-html="slide.content.h1" />
        <legent-link
          :text="slide.button.text"
          :href="slide.button.href"
          is-gold
          is-blended
          skip-router
          @click.prevent.native="handleCtaClick(slide.button.href)"
        />
      </doe-section>
    </div>

    <div
      ref="progress"
      class="scroll-progress"
    >
      <div class="scroll-progress-text">{{ currentSlideText }}</div>
      <div class="scroll-progress-bar">
        <i :style="progressStyles" />
      </div>
    </div>

    <div
      ref="nav"
      class="hero-carousel-nav"
    >
      <legent-link
        :disabled="currentSlide === 0"
        :is-submit="false"
        class="hero-carousel-nav-prev"
        icon="caret-left"
        is-button
        is-icon-only
        is-transparent
        @click.prevent.native="prevSlide"
      />
      <legent-link
        :is-submit="false"
        class="circle"
        is-button
        is-icon-only
        is-transparent
        @click.prevent.native="setSlide(0)"
      >
        <i />
      </legent-link>
      <legent-link
        :disabled="currentSlide === slidesCount - 1"
        :is-submit="false"
        class="hero-carousel-nav-next"
        icon="caret-right"
        is-button
        is-icon-only
        is-transparent
        @click.prevent.native="nextSlide"
      />
    </div>
  </div>
</template>

<script>
  import { smoothScroll } from '../core/mixins';
  import DoeSection from '../doe/DoeSection.vue';

  export default {
    components: {
      DoeSection
    },
    mixins: [
      smoothScroll
    ],
    props: {
      slides: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        currentSlide: 0
      };
    },
    computed: {
      currentSlideText() {
        return `${this.currentSlide + 1} of ${this.slidesCount}`;
      },
      progressOffset() {
        return this.progressWidth * this.currentSlide;
      },
      progressStyles() {
        return {
          marginLeft: `${this.progressOffset}%`,
          width: `${this.progressWidth}%`
        };
      },
      progressWidth() {
        return (100 / this.slidesCount);
      },
      slidesCount() {
        return this.slides.length;
      }
    },
    activated() {
      setTimeout(() => {
        this.$el.classList.add('is-ready');
      }, 250);
    },
    methods: {
      handleCtaClick(path) {
        const { slidesContainer, progress, nav } = this.$refs;
        const currentSlide = slidesContainer.querySelectorAll('.section')[this.currentSlide];
        const currentSlideVideo = currentSlide.querySelector('video');

        const loadingScreen = document.createElement('div');
        const heroCarouselContent = document.createElement('div');

        const newSlide = currentSlide.cloneNode(true);
        const newSlideVideo = newSlide.querySelector('video');
        const newProgress = progress.cloneNode(true);
        const newNav = nav.cloneNode(true);

        heroCarouselContent.classList.add('hero-carousel-content');
        heroCarouselContent.appendChild(newSlide);

        loadingScreen.appendChild(heroCarouselContent);
        loadingScreen.appendChild(newProgress);
        loadingScreen.appendChild(newNav);
        loadingScreen.classList.add('hero-carousel', 'is-overlay');

        document.body.appendChild(loadingScreen);

        if (newSlideVideo) {
          // can't show loading until new video is ready
          newSlideVideo.currentTime = currentSlideVideo.currentTime;
          this.prepareLoadingVideo(loadingScreen, path, newSlideVideo, currentSlideVideo);
          return;
        }

        loadingScreen.classList.add('is-showing');

        this.redirect(loadingScreen, path);
      },
      nextSlide() {
        /* eslint prefer-destructuring: 0 */
        (this.currentSlide === this.slidesCount - 1) ? false : this.setSlide(this.currentSlide + 1);
      },
      prepareLoadingVideo(container, path, newVideo, oldVideo) {
        if (newVideo.readyState === 4) {
          container.classList.add('is-showing');
          oldVideo.pause();
          this.redirect(container, path);
          return;
        }

        // recursively call method until the above condition is true
        setTimeout(() => {
          this.prepareLoadingVideo(container, path, newVideo, oldVideo);
        }, 100);
      },
      prevSlide() {
        /* eslint no-unused-expressions: 0 */
        (this.currentSlide === 0) ? false : this.setSlide(this.currentSlide - 1);
      },
      redirect(container, path) {
        setTimeout(() => {
          container.classList.add('is-loading');
          this.$router.push({ path });
        }, 250);
      },
      setSlide(targetSlide) {
        if (targetSlide === this.currentSlide) {
          return;
        }

        this.smoothScroll(this.$el.querySelectorAll('.section')[targetSlide]);

        const { slidesContainer } = this.$refs;
        const slides = slidesContainer.querySelectorAll('.section');

        const currentSlide = slides[this.currentSlide];
        const nextSlide = slides[targetSlide];

        const nextSlideVideo = nextSlide.querySelector('video');
        if (nextSlideVideo) {
          nextSlideVideo.play();
        }

        currentSlide.style.zIndex = 2;
        nextSlide.style.zIndex = 1;

        currentSlide.classList.add('is-hiding');

        setTimeout(() => {
          currentSlide.style.zIndex = 0;
          currentSlide.classList.remove('is-hiding');
          nextSlide.style.zIndex = 2;

          const currentSlideVideo = currentSlide.querySelector('video');
          if (currentSlideVideo) {
            currentSlideVideo.pause();
            currentSlideVideo.currentTime = 0;
          }
        }, 1000);

        this.currentSlide = targetSlide;
      }
    }
  };
</script>
