const carouselSwipeProps = {
  data() {
    return {
      swipeAllowedTime: 300,
      swipeDirection: 'none',
      swipeElapsedTime: 0,
      swipeRestraint: 100,
      swipeStartTime: 0,
      swipeThreshold: 100,
      touchDistX: 0,
      touchDistY: 0,
      touchStartX: 0,
      touchStartY: 0
    };
  },
  mounted() {
    if ('ontouchstart' in window) {
      this.$refs.carousel.addEventListener('touchstart', this.handleTouchStart);
      this.$refs.carousel.addEventListener('touchend', this.handleTouchEnd);
    }
  },
  beforeDestroy() {
    if ('ontouchstart' in window) {
      this.$refs.carousel.removeEventListener('touchstart', this.handleTouchStart);
      this.$refs.carousel.removeEventListener('touchend', this.handleTouchEnd);
    }
  },
  methods: {
    handleTouchStart(e) {
      this.swipeDirection = 'none';
      this.touchStartX = e.changedTouches[0].pageX;
      this.touchStartY = e.changedTouches[0].pageY;
      this.swipeStartTime = new Date().getTime();
    },
    handleTouchEnd(e) {
      this.touchDistX = e.changedTouches[0].pageX - this.touchStartX;
      this.touchDistY = e.changedTouches[0].pageY - this.touchStartY;
      this.swipeElapsedTime = new Date().getTime() - this.swipeStartTime;

      if (this.swipeElapsedTime <= this.swipeAllowedTime && Math.abs(this.touchDistX) >= this.swipeThreshold && Math.abs(this.touchDistY) <= this.swipeRestraint) {
        this.swipeDirection = (this.touchDistX < 0) ? 'left' : 'right';

        /* eslint no-unused-expressions: 0 */
        (this.swipeDirection === 'right') ? this.prevSlide() : this.nextSlide();
      }
    }
  }
};

const escKeyProps = {
  methods: {
    handleEscKey(event) {
      if (event.keyCode === 27) {
        this.close();
      }
    },
    toggleEscKey() {
      if (this.isOpen) {
        document.addEventListener('keydown', this.handleEscKey);
        return;
      }

      document.removeEventListener('keydown', this.handleEscKey);
    }
  }
};

const ajaxPageProps = {
  props: {
    forceAjax: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      data: {},
      loadedViaJson: false,
      loading: true,
      slug: '',
      status: {
        hasError: false,
        code: 0
      }
    };
  },
  computed: {
    apiUrl() {
      // TODO: update with prod URL
      return window.prerender ? `https://legent-frontend.test${this.jsonUrl}` : this.jsonUrl;
    }
  },
  created() {
    this.slug = this.$route.params.slug !== undefined ? this.$route.params.slug : '';
    this.loadData();
  },
  beforeMount() {
    if (this.loadedViaJson) {
      this.loading = false;
    }
  },
  activated() {
    this.updateHead();
  },
  methods: {
    loadData(url = null, updateHead = true) {
      let updateFromApi = true;

      if (!this.forceAjax) {
        if (window.data && window.data.page && window.data.page.uri && window.data.page.uri === this.$route.path) {
          this.data = window.data.page;
          this.loadedViaJson = true;

          if (updateHead) {
            this.updateHead();
          }

          updateFromApi = false;
        }
      }

      const apiUrl = url || this.apiUrl;

      this.$axios.get(apiUrl)
        .then((response) => {
          if (updateFromApi) {
            this.data = response.data;

            if (this.data.status) {
              this.throw404();
              return false;
            }

            if (updateHead) {
              this.updateHead();
            }

            this.loading = false;

            this.status = {
              code: 200,
              hasError: false
            };

            this.$eventBus.$emit('page-loaded');
          }

          return true;
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.throw404();
            return;
          }

          this.$eventBus.$emit('error', error);
        });
    },
    throw404() {
      this.data = {};
      this.status = {
        code: 404,
        hasError: true
      };

      return false;
    },
    updateHead() {
      let title = 'Legent';
      let description = '';
      let image = `${this.$cdnUrl}/images/og-image.jpg`;

      if (this.data && this.data.metaTitle) {
        title = `${this.data.metaTitle}`;
      }

      if (this.data && this.data.metaDescription) {
        description = this.data.metaDescription;
      }

      if (this.data && this.data.socialImage && this.data.socialImage.url) {
        image = this.data.socialImage.url;
      }

      document.title = title;
      document.head.querySelector('meta[property="og:title"]').content = title;
      document.head.querySelector('meta[name="twitter:title"]').content = title;
      document.head.querySelector('meta[itemprop="name"]').content = title;

      document.head.querySelector('meta[name="description"]').content = description;
      document.head.querySelector('meta[property="og:description"]').content = description;
      document.head.querySelector('meta[name="twitter:description"]').content = description;
      document.head.querySelector('meta[itemprop="description"]').content = description;

      document.head.querySelector('meta[property="og:url"]').content = window.location.href;
      document.head.querySelector('meta[name="twitter:url"]').content = window.location.href;

      document.head.querySelector('meta[property="og:image"]').content = image;
      document.head.querySelector('meta[name="twitter:image:src"]').content = image;
      document.head.querySelector('meta[itemprop="image"]').content = image;

      if (this.data && this.data.canonicalUrl) {
        // Has a canonical URL, update if the tag is there,
        // or create one if not
        if (document.head.querySelector("[rel='canonical']")) {
          document.head.querySelector("[rel='canonical']").href = this.data.canonicalUrl;
        } else {
          const canonicalLink = document.createElement('link');
          canonicalLink.rel = 'canonical';
          canonicalLink.href = this.data.canonicalUrl;
          document.head.appendChild(canonicalLink);
        }
      } else if (document.head.querySelector("[rel='canonical']")) {
        // Doesn't have a canconical Url, so remove the tag
        // if it exists
        const canonicalLink = document.head.querySelector("[rel='canonical']");
        canonicalLink.parentNode.removeChild(canonicalLink);
      }
    }
  }
};

const nonAjaxPageProps = {
  data() {
    return {
      metaTitle: null,
      metaDescription: null,
      socialImage: null
    };
  },
  mounted() {
    this.updateHead();
    this.$eventBus.$emit('page-loaded');
  },
  activated() {
    this.updateHead();
  },
  methods: {
    updateHead() {
      let title = 'Legent';
      let description = '';
      let image = `${this.$cdnUrl}/images/og-image.jpg`;

      if (this.metaTitle) {
        title = `${this.metaTitle}`;
      }

      if (this.metaDescription) {
        description = this.metaDescription;
      }

      if (this.socialImage) {
        image = this.data.socialImage;
      }

      document.title = title;
      document.head.querySelector('meta[property="og:title"]').content = title;
      document.head.querySelector('meta[name="twitter:title"]').content = title;
      document.head.querySelector('meta[itemprop="name"]').content = title;

      document.head.querySelector('meta[name="description"]').content = description;
      document.head.querySelector('meta[property="og:description"]').content = description;
      document.head.querySelector('meta[name="twitter:description"]').content = description;
      document.head.querySelector('meta[itemprop="description"]').content = description;

      document.head.querySelector('meta[property="og:url"]').content = window.location.href;
      document.head.querySelector('meta[name="twitter:url"]').content = window.location.href;

      document.head.querySelector('meta[property="og:image"]').content = image;
      document.head.querySelector('meta[name="twitter:image:src"]').content = image;
      document.head.querySelector('meta[itemprop="image"]').content = image;
    }
  }
};

const styleProps = {
  props: {
    isBlack: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isDanger: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isGold: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isGrey: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isSuccess: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isWave: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isWhite: {
      type: Boolean,
      default() {
        return false;
      }
    },
    type: {
      type: String,
      default() {
        return '';
      }
    }
  },
  computed: {
    styleModifiers() {
      return {
        'is-black': this.isBlack,
        'is-danger': this.isDanger,
        'is-gold': this.isGold,
        'is-grey': this.isGrey,
        'is-silver': this.isSilver,
        'is-success': this.isSuccess,
        'is-wave': this.isWave,
        'is-white': this.isWhite
      };
    }
  }
};

const tableProps = {
  props: {
    headerRows: {
      type: Array
    },
    bodyRows: {
      type: Array
    }
  }
};

const windowProps = {
  data() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  },
  computed: {
    isTablet() {
      return this.windowWidth > 768;
    },
    isTabletOnly() {
      return this.isTablet && !this.isDesktop;
    },
    isDesktop() {
      return this.windowWidth > 1008;
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth);
  },
  methods: {
    updateWidth() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    }
  }
};

const smoothScroll = {
  methods: {
    smoothScroll(el, offset = 0) {
      const startLocation = window.pageYOffset;
      const endLocation = el.offsetTop - offset;
      const distance = endLocation - startLocation;
      const increments = distance / (500 / 20);

      const scrollPage = () => {
        window.scrollBy(0, increments);

        const distanceTraveled = window.pageYOffset;

        if ((distanceTraveled >= (endLocation - increments)) || ((window.innerHeight + distanceTraveled) >= document.body.offsetHeight)) {
          clearInterval(scrollPageInterval);
        }
      };

      const scrollPageInterval = setInterval(scrollPage, 20);
    }
  }
};

export {
  carouselSwipeProps,
  escKeyProps,
  ajaxPageProps,
  nonAjaxPageProps,
  styleProps,
  tableProps,
  windowProps,
  smoothScroll
};
