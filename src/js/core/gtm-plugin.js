const GtmPlugin = {
  install(Vue) {
    Vue.prototype.$gtm = new Vue({
      created() {
        const vm = this;

        vm.$on('trackView', (path) => {
          const dataLayer = (window.dataLayer = window.dataLayer || []);

          dataLayer.push({
            event: 'content-view',
            'content-name': path
          });
        });


        vm.$on('trackEvent', (eventData) => {
          const dataLayer = (window.dataLayer = window.dataLayer || []);
          dataLayer.push(eventData);
        });
      }
    });
  }
};

export default GtmPlugin;
