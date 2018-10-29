<template>
  <div id="app">
    <a
      href="#main"
      class="skip-link visually-hidden"
    >
      Skip to content
    </a>

    <transition
      v-if="!isOldEnough"
      name="fadeDown"
      appear
      mode="out-in"
    >
      <the-age-gate @passed-age-gate="handlePassedAgeGate" />
    </transition>

    <the-header />

    <the-500-page v-if="show500Page" />
    <the-503-page v-else-if="show503Page" />
    <the-offline-page v-else-if="showOfflinePage" />

    <keep-alive v-else>
      <router-view
        id="main"
        :key="$route.fullPath"
        @page-activated="handlePageActivated"
      />
    </keep-alive>

    <the-footer />

    <portal-target
      name="modals"
      slim
    />

    <transition :name="pageLoadingTransition">
      <div
        v-if="pageLoading"
        class="page-loading"
      />
    </transition>

    <div id="outdated" />
  </div>
</template>

<script>
  import ifEmoji from 'if-emoji';
  import outdatedBrowserRework from 'outdated-browser-rework';
  import The500Page from './pages/The500Page.vue';
  import The503Page from './pages/The503Page.vue';
  import TheAgeGate from './layout/TheAgeGate.vue';
  import TheHeader from './layout/TheHeader.vue';
  import TheFooter from './layout/TheFooter.vue';
  import TheOfflinePage from './pages/TheOfflinePage.vue';

  export default {
    components: {
      The500Page,
      The503Page,
      TheAgeGate,
      TheHeader,
      TheFooter,
      TheOfflinePage
    },
    data() {
      return {
        baseGtmDataLayer: [],
        data: {},
        isOldEnough: true, // TODO: set to false to reenable age gate
        metaTitle: '',
        metaTitleAway: "Don't forget your tab.",
        metaTitleChanged: false,
        metaTitleInterval: null,
        pageLoading: false,
        pageLoadingTransition: 'slideRight',
        resetIsOldEnough: false,
        show500Page: false,
        show503Page: false,
        showOfflinePage: false
      };
    },
    computed: {
      apiUrl() {
        return window.prerender ? `https://legent-frontend.test${this.$api.app}` : this.$api.app;
      }
    },
    watch: {
      isOldEnough(value) {
        if (value) {
          document.body.classList.remove('has-modal-active');
        }
      },
      $route() {
        this.show500Page = false;
        this.showOfflinePage = false;

        if (this.resetIsOldEnough) {
          this.isOldEnough = false;
        }

        this.$nextTick(() => {
          this.updateDataLayer();
        });
      }
    },
    created() {
      if (this.$cookies.isKey('over21') || window.location.href.indexOf('tos=ok') !== -1 || window.prerender) {
        this.setIsOldEnough();
      }

      if (window.location.href.indexOf('tos=ok') !== -1) {
        this.resetIsOldEnough = true;
      }

      if (window.errorCode && window.errorCode === 500) {
        this.show500Page = true;
      }

      if (window.errorCode && window.errorCode === 503) {
        this.show503Page = true;
      }

      this.checkBrowserSupport();

      // this.loadData();

      this.$eventBus.$on('page-loading', () => {
        this.pageLoadingTransition = 'slideLeft';

        this.$nextTick(() => {
          this.pageLoading = true;
        });
      });

      window.addEventListener('blur', this.handleWindowBlur);
      window.addEventListener('focus', this.handleWindowFocus);

      this.$eventBus.$on('error', (error) => {
        if ('onLine' in navigator && !navigator.onLine) {
          this.showOfflinePage = true;
          return;
        }

        if (window.location.hostname !== 'www.makersmark.com') {
          console.error(error);
        }

        this.show500Page = true;
      });

      if (window.prerender) {
        this.$eventBus.$on('page-loaded', () => {
          document.dispatchEvent(new Event('page-rendered'));
        });
      }

      window.dataLayer = [];

      const dataLayerUser = {};

      this.baseGtmDataLayer = {
        user: dataLayerUser,
        global: {
          siteType: 'standard',
          brand: 'legent',
          spiritType: 'bourbon'
        }
      };

      // TODO:set hostnames
      const addScript = (window.location.hostname === 'www.legent.com' || window.location.hostname === 'legent-frontend.doe1915.com');

      this.updateDataLayer(addScript);

      // Only add bugherd when on staging
      if (window.location.hostname === 'legent-frontend.doe1915.com') {
        this.addBugherd();
      }
    },
    mounted() {
      if (!this.isOldEnough) {
        document.body.classList.add('has-modal-active');
      }

      // check this after mount because it doesn't need to be
      // available right away
      if (ifEmoji('🥃')) {
        // ifEmoji detects if the computer has the passed emoji
        // or not. This is a relatively new emoji, so a lot of computers
        // don't have it. Add it to the away title if it is there.
        this.metaTitleAway = `🥃 ${this.metaTitleAway}`;
      }

      // Show outdated browser banner
      outdatedBrowserRework();
    },
    beforeDestroy() {
      window.removeEventListener('blur', this.handleWindowBlur);
      window.removeEventListener('focus', this.handleWindowFocus);
    },
    methods: {
      addBugherd() {
        // const script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.src = 'https://www.bugherd.com/sidebarv2.js?apikey=oewza4qsz5b3vyue06bemg';
        // document.head.appendChild(script);
      },
      checkBrowserSupport() {
        const maskClass = (document.body.style['-webkit-mask-repeat'] !== undefined || document.body.style['mask-repeat'] !== undefined) ? 'cssmask' : 'no-cssmask';
        document.documentElement.classList.add(maskClass);
      },
      handlePageActivated(overlay = false, delay = 0) {
        if (overlay) {
          const overlayEl = document.querySelector('.hero-carousel.is-overlay');

          if (overlayEl) {
            setTimeout(() => {
              document.body.removeChild(document.querySelector('.hero-carousel.is-overlay'));
            }, delay);
          }

          this.$eventBus.$emit('animate-page');

          return;
        }

        this.pageLoadingTransition = 'slideRight';
        this.$nextTick(() => {
          this.pageLoading = false;
        });

        this.$eventBus.$emit('animate-page');
      },
      handlePassedAgeGate() {
        this.setIsOldEnough();
      },
      handleWindowBlur() {
        this.metaTitle = document.title;

        this.metaTitleInterval = setInterval(() => {
          document.title = this.metaTitleChanged ? this.metaTitleAway : this.metaTitle;
          this.metaTitleChanged = !this.metaTitleChanged;
        }, 5000);
      },
      handleWindowFocus() {
        document.title = this.metaTitle;
        clearInterval(this.metaTitleInterval);
      },
      loadData() {
        let updateFromApi = true;

        if (window.data) {
          this.data = window.data.app;
          delete window.data.app;

          updateFromApi = false;
        }

        this.$axios.get(`${this.apiUrl}?site=${this.$site}`)
          .then((response) => {
            if (updateFromApi) {
              this.data = response.data;
            }
          })
          .catch((error) => {
            this.$eventBus.$emit('error', error);
          });
      },
      setIsOldEnough(state = true) {
        this.isOldEnough = state;
      },
      updateDataLayer(addScript = false) {
        window.dataLayer.push(this.baseGtmDataLayer);

        if (addScript) {
          const script = document.createElement('script');
          script.async = true;
          script.src = '';

          window.dataLayer.push({
            event: 'gtm.js',
            'gtm.start': new Date().getTime()
          });

          document.head.appendChild(script);
        }
      }
    }
  };
</script>
