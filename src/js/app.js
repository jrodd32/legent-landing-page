import '@babel/polyfill';
import axios from 'axios';
import PortalVue from 'portal-vue';
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router';
import { detect } from 'detect-browser';
import objectFitPolyfill from 'objectFitPolyfill';
import api from './core/api';
import eventBus from './core/event-bus';
import GsapPlugin from './core/gsap-plugin';
import GtmPlugin from './core/gtm-plugin';
import routes from './core/routes';
import App from './App.vue';

Vue.use(GsapPlugin);
Vue.use(GtmPlugin);
Vue.use(PortalVue);
Vue.use(VueCookies);
Vue.use(VueRouter);

// Detect and set browser
// {
//   name,
//   version,
//   os
// }
const browser = detect();
Vue.prototype.$browser = browser;

// Set axios default headers
// Axios is the HTTP request library
Vue.prototype.$axios = axios.create();
Vue.prototype.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Set api endpoints for later use
Vue.prototype.$api = api;

// Set event bus
Vue.prototype.$eventBus = eventBus;

// Register Base Components
// https://webpack.js.org/guides/dependency-management/#require-context
const requireBaseComponent = require.context(
  // Look for files in the base directory
  './base/',
  // Do not look in subdirectories
  false,
  // Only include "Base" prefixed .vue files
  /Base[\w]+\.vue/
);

requireBaseComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireBaseComponent(fileName);
  // Remove the . and leading back slash
  // Remove the .vue file extension
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});

// Register Element Components
// https://webpack.js.org/guides/dependency-management/#require-context
const requireElementComponent = require.context(
  // Look for files in the base directory
  './elements/',
  // Do not look in subdirectories
  false,
  // Only include "Base" prefixed .vue files
  /Legent[\w]+\.vue/
);

requireElementComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireElementComponent(fileName);
  // Remove the . and leading back slash
  // Remove the .vue file extension
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});

const scrollBehavior = (to, from, savedPosition) => new Promise((resolve) => {
  setTimeout(() => {
    if (savedPosition) {
        resolve(savedPosition);
      } else {
        resolve({ x: 0, y: 0 });
      }
  }, 500);
});

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior
});

const app = new Vue({
  router,
  components: { App },
  template: '<App />'
});

document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app');

  router.beforeEach((to, from, next) => {
    // TODO: if story is handled the same, remove the path condition
    if (from.meta && from.meta.skipLoading) {
      setTimeout(() => {
        next();
      }, 400);

      return;
    }

    Vue.prototype.$eventBus.$emit('page-loading');

    setTimeout(() => {
      next();
    }, 400);
  });

  // Add service worker if on production and browser supports it
  // NOTE: if you want to test in dev or staging, change the hostname condition
  // TODO: set hostname
  if ('serviceWorker' in navigator && window.location.hostname === 'https://www.legent.com') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
});
