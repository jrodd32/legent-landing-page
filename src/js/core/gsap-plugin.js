import { TweenMax, TimelineMax, Bounce, Power0, Linear } from 'gsap/TweenMax';
import ScrollMagic from 'scrollmagic';
import MorphSVGPlugin from './gsap/MorphSVGPlugin';

require('animation.gsap');

const GsapPlugin = {
  install(Vue) {
    Vue.prototype.$gsapTimelineMax = TimelineMax;
    Vue.prototype.$gsapTweenMax = TweenMax;
    Vue.prototype.$scrollMagic = ScrollMagic;
    Vue.prototype.$gsapEases = {
      Bounce,
      Power0,
      Linear
    };
    Vue.prototype.$scrollActions = new Vue({
      data() {
        return {
          controller: null,
          scenes: {}
        };
      },
      created() {
        const vm = this;

        vm.$on('addScene', (name, scene) => {
          Vue.nextTick(() => {
            if (vm.controller === null) {
              vm.controller = new vm.$scrollMagic.Controller({
                loglevel: 0,
                refreshInterval: 0
              });
            }

            // set loglevel to no logging
            scene.loglevel = 0;

            if (!vm.scenes[name]) {
              vm.scenes[name] = scene;
              vm.scenes[name].addTo(vm.controller);
            }
          });
        });

        vm.$on('destroyScene', (name) => {
          if (vm.scenes[name]) {
            vm.scenes[name].destroy(true);
            delete vm.scenes[name];
          }
        });

        vm.$on('destroy', () => {
          vm.controller.destroy(true);
          vm.controller = null;
          vm.scenes = {};
        });
      }
    });
  }
};

export default GsapPlugin;
