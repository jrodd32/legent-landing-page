webpackJsonp([0],Array(36).concat([
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeContent_vue__ = __webpack_require__(125);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56f143f1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeContent_vue__ = __webpack_require__(377);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeContent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56f143f1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeContent_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/doe/DoeContent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56f143f1", Component.options)
  } else {
    hotAPI.reload("data-v-56f143f1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export carouselSwipeProps */
/* unused harmony export escKeyProps */
/* unused harmony export ajaxPageProps */
/* unused harmony export nonAjaxPageProps */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return styleProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return tableProps; });
/* unused harmony export windowProps */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return smoothScroll; });
var carouselSwipeProps = {
  data: function data() {
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
  mounted: function mounted() {
    if ('ontouchstart' in window) {
      this.$refs.carousel.addEventListener('touchstart', this.handleTouchStart);
      this.$refs.carousel.addEventListener('touchend', this.handleTouchEnd);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if ('ontouchstart' in window) {
      this.$refs.carousel.removeEventListener('touchstart', this.handleTouchStart);
      this.$refs.carousel.removeEventListener('touchend', this.handleTouchEnd);
    }
  },
  methods: {
    handleTouchStart: function handleTouchStart(e) {
      this.swipeDirection = 'none';
      this.touchStartX = e.changedTouches[0].pageX;
      this.touchStartY = e.changedTouches[0].pageY;
      this.swipeStartTime = new Date().getTime();
    },
    handleTouchEnd: function handleTouchEnd(e) {
      this.touchDistX = e.changedTouches[0].pageX - this.touchStartX;
      this.touchDistY = e.changedTouches[0].pageY - this.touchStartY;
      this.swipeElapsedTime = new Date().getTime() - this.swipeStartTime;

      if (this.swipeElapsedTime <= this.swipeAllowedTime && Math.abs(this.touchDistX) >= this.swipeThreshold && Math.abs(this.touchDistY) <= this.swipeRestraint) {
        this.swipeDirection = this.touchDistX < 0 ? 'left' : 'right';
        /* eslint no-unused-expressions: 0 */

        this.swipeDirection === 'right' ? this.prevSlide() : this.nextSlide();
      }
    }
  }
};
var escKeyProps = {
  methods: {
    handleEscKey: function handleEscKey(event) {
      if (event.keyCode === 27) {
        this.close();
      }
    },
    toggleEscKey: function toggleEscKey() {
      if (this.isOpen) {
        document.addEventListener('keydown', this.handleEscKey);
        return;
      }

      document.removeEventListener('keydown', this.handleEscKey);
    }
  }
};
var ajaxPageProps = {
  props: {
    forceAjax: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
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
    apiUrl: function apiUrl() {
      // TODO: update with prod URL
      return window.prerender ? "https://legent-frontend.test".concat(this.jsonUrl) : this.jsonUrl;
    }
  },
  created: function created() {
    this.slug = this.$route.params.slug !== undefined ? this.$route.params.slug : '';
    this.loadData();
  },
  beforeMount: function beforeMount() {
    if (this.loadedViaJson) {
      this.loading = false;
    }
  },
  activated: function activated() {
    this.updateHead();
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var updateHead = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var updateFromApi = true;

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

      var apiUrl = url || this.apiUrl;
      this.$axios.get(apiUrl).then(function (response) {
        if (updateFromApi) {
          _this.data = response.data;

          if (_this.data.status) {
            _this.throw404();

            return false;
          }

          if (updateHead) {
            _this.updateHead();
          }

          _this.loading = false;
          _this.status = {
            code: 200,
            hasError: false
          };

          _this.$eventBus.$emit('page-loaded');
        }

        return true;
      }).catch(function (error) {
        if (error.response && error.response.status === 404) {
          _this.throw404();

          return;
        }

        _this.$eventBus.$emit('error', error);
      });
    },
    throw404: function throw404() {
      this.data = {};
      this.status = {
        code: 404,
        hasError: true
      };
      return false;
    },
    updateHead: function updateHead() {
      var title = 'Legent';
      var description = '';
      var image = "".concat(this.$cdnUrl, "/images/og-image.jpg");

      if (this.data && this.data.metaTitle) {
        title = "".concat(this.data.metaTitle);
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
          var canonicalLink = document.createElement('link');
          canonicalLink.rel = 'canonical';
          canonicalLink.href = this.data.canonicalUrl;
          document.head.appendChild(canonicalLink);
        }
      } else if (document.head.querySelector("[rel='canonical']")) {
        // Doesn't have a canconical Url, so remove the tag
        // if it exists
        var _canonicalLink = document.head.querySelector("[rel='canonical']");

        _canonicalLink.parentNode.removeChild(_canonicalLink);
      }
    }
  }
};
var nonAjaxPageProps = {
  data: function data() {
    return {
      metaTitle: null,
      metaDescription: null,
      socialImage: null
    };
  },
  mounted: function mounted() {
    this.updateHead();
    this.$eventBus.$emit('page-loaded');
  },
  activated: function activated() {
    this.updateHead();
  },
  methods: {
    updateHead: function updateHead() {
      var title = 'Legent';
      var description = '';
      var image = "".concat(this.$cdnUrl, "/images/og-image.jpg");

      if (this.metaTitle) {
        title = "".concat(this.metaTitle);
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
var styleProps = {
  props: {
    isBlack: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isDanger: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isGold: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isGrey: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isSuccess: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isWave: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isWhite: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    type: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  computed: {
    styleModifiers: function styleModifiers() {
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
var tableProps = {
  props: {
    headerRows: {
      type: Array
    },
    bodyRows: {
      type: Array
    }
  }
};
var windowProps = {
  data: function data() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  },
  computed: {
    isTablet: function isTablet() {
      return this.windowWidth > 768;
    },
    isTabletOnly: function isTabletOnly() {
      return this.isTablet && !this.isDesktop;
    },
    isDesktop: function isDesktop() {
      return this.windowWidth > 1008;
    }
  },
  mounted: function mounted() {
    window.addEventListener('resize', this.updateWidth);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth);
  },
  methods: {
    updateWidth: function updateWidth() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    }
  }
};
var smoothScroll = {
  methods: {
    smoothScroll: function smoothScroll(el) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var startLocation = window.pageYOffset;
      var endLocation = el.offsetTop - offset;
      var distance = endLocation - startLocation;
      var increments = distance / (500 / 20);

      var scrollPage = function scrollPage() {
        window.scrollBy(0, increments);
        var distanceTraveled = window.pageYOffset;

        if (distanceTraveled >= endLocation - increments || window.innerHeight + distanceTraveled >= document.body.offsetHeight) {
          clearInterval(scrollPageInterval);
        }
      };

      var scrollPageInterval = setInterval(scrollPage, 20);
    }
  }
};


/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return baseInputProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return inputProps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities__ = __webpack_require__(60);

var inputProps = {
  computed: {
    calculatedClass: function calculatedClass() {
      if (this.checkbox) {
        return 'checkbox';
      }

      if (this.radio) {
        return 'radio';
      }

      if (this.toggle) {
        return 'toggle';
      }

      return 'field';
    },
    calculatedLabel: function calculatedLabel() {
      // If passed a label return that.
      // Otherwise check to see if field is required to return
      // label with appended *
      return this.label.length > 0 ? this.label : this.setLabel(this.humanName, this.required);
    },
    calculatedType: function calculatedType() {
      if (this.checkbox || this.toggle) {
        return 'checkbox';
      }

      if (this.radio) {
        return 'radio';
      }

      if (this.password) {
        return 'password';
      }

      if (this.date) {
        return 'tel';
      }

      return 'text';
    },
    fieldModifiers: function fieldModifiers() {
      return {
        checked: this.isChecked,
        disabled: this.disabled,
        hasFlag: this.hasFlag,
        hasIcon: this.hasIcon,
        helperId: this.helperId,
        helperText: this.calculatedHelper,
        iconClass: this.iconClass,
        id: this.id,
        isCentered: this.isCentered,
        isSmall: this.isSmall,
        isMedium: this.isMedium,
        isLarge: this.isLarge,
        label: this.calculatedLabel,
        name: this.field,
        required: this.required,
        showHelper: this.showHelper,
        showIcon: this.showIcon,
        type: this.calculatedType,
        validated: this.validated,
        wrapperClasses: {
          field: true,
          checkbox: this.checkbox,
          radio: this.radio,
          toggle: this.toggle,
          'has-icon': this.hasIcon,
          'has-value': this.value && this.value.length > 0,
          'is-centered': this.isCentered,
          'is-disabled': this.disabled,
          'is-focus': this.isFocused,
          'has-select': this.isSelect,
          'has-placeholder': this.isSelect || this.showPlaceholder,
          'is-small': this.isSmall,
          'is-medium': this.isMedium,
          'is-large': this.isLarge,
          'is-success': !this.initialState && this.validated,
          'is-danger': this.isInvalid || this.hasError
        }
      };
    },
    hasIcon: function hasIcon() {
      return this.icon.length;
    },
    hasLink: function hasLink() {
      return this.link.url.length > 0 && this.link.name.length > 0;
    },
    helperId: function helperId() {
      return "field-".concat(this.field, "-helper");
    },
    humanName: function humanName() {
      return this.setHumanName(this.field);
    },
    iconClass: function iconClass() {
      return this.hasIcon ? "icon-".concat(this.icon) : '';
    },
    isInvalid: function isInvalid() {
      return !this.skipValidation && !this.validated && !this.initialState;
    },
    isPostalCode: function isPostalCode() {
      return this.postalCode && this.postalCode.length > 0;
    },
    isSelect: function isSelect() {
      return this.select;
    },
    isSwitch: function isSwitch() {
      return this.checkbox || this.radio || this.toggle;
    }
  },
  watch: {
    defaultValue: function defaultValue(newValue) {
      this.value = newValue;
      this.validateField();
    }
  },
  data: function data() {
    return {
      calculatedHelper: '',
      initialState: true,
      isChecked: false,
      isFocused: false,
      isSelected: false,
      hasError: false,
      showHelper: false,
      validated: false,
      value: ''
    };
  },
  methods: {
    handleBlur: function handleBlur() {
      this.setInitialState(false);
      this.toggleFocus();
      this.validateField();
    },
    handleChange: function handleChange(event) {
      this.setInitialState(false);
      this.setValue(event.target.value);
      this.validateField();

      if (this.isSwitch) {
        this.isChecked = event.target.checked;
        this.value = this.setDefaultValue();
      }
    },
    handleFocus: function handleFocus() {
      // method is called every time the base input
      // is focused / emits a "focus" event
      this.isFocused = true;
    },
    handleInput: function handleInput(event) {
      this.setInitialState(false);
      this.setValue(event.target.value);
      this.validateField();

      if (this.hasNoForm) {
        this.$emit('input', event);
      }
    },
    removeFocus: function removeFocus() {
      this.isFocused = false;
    },
    resetField: function resetField() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.value = value;
      this.setInitialState(true);
      this.calculatedHelper = this.helper;
      this.showHelper = this.helper.length > 0;
    },
    setDefaultValue: function setDefaultValue() {
      if (this.toggle) {
        return this.isChecked ? 'on' : 'off';
      }

      if (this.checkbox) {
        return this.field;
      }

      if (this.radio) {
        return this.label;
      }

      return this.value;
    },
    setError: function setError(text) {
      this.calculatedHelper = text;
      this.validated = false;
      this.hasError = true;
      this.showHelper = true;
    },
    setFocus: function setFocus() {
      var _this = this;

      // call focus after 251ms because the element
      // has its 'visibility' changed and that will change
      // by 250ms
      setTimeout(function () {
        _this.$el.querySelector('.input').focus();
      }, 251);
    },
    setHumanName: function setHumanName(value) {
      // return supplied custom name
      if (this.customHumanName.length > 0) {
        return this.customHumanName;
      } // return supplied label


      if (this.label.length > 0) {
        return this.label.replace(/\*/g, ' ');
      }

      if (value.includes('_')) {
        value = value.replace(/_/g, ' ');
      }

      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    setInitialState: function setInitialState(state) {
      this.initialState = state;
      this.hasError = false;
      this.validated = false;
    },
    setLabel: function setLabel(value, required) {
      // Append the * to required fields
      var label = required ? value += '*' : value;
      return label;
    },
    setValue: function setValue(value) {
      this.initialState = false;
      this.value = value;
    },
    toggleFocus: function toggleFocus() {
      this.isFocused = !this.isFocused;
    },
    validateField: function validateField() {
      if (this.skipValidation) {
        return;
      }

      var helperMessages = [];
      var validationFailures = []; // validation = required

      if (this.required && this.value.length === 0) {
        validationFailures.push('required');
        helperMessages.push("".concat(this.humanName, " is required."));
      } // validation = email format


      if (this.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.value)) {
        validationFailures.push('email');
        helperMessages.push("".concat(this.humanName, " must be a valid format."));
      } // password
      // at least 7 alphanumeric characters and 1+ number


      if (this.validatePasswordFormat && (!this.value.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/) || ['WHEAT123', 'password', 'changeme'].includes(this.value))) {
        validationFailures.push('password');
        helperMessages.push("".concat(this.humanName, " should be at least 7 characters and contain both letters and numbers."));
      } // validation = date format mm/dd/yyyy


      if (this.date && !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(this.value)) {
        validationFailures.push('date');
        helperMessages.push("".concat(this.humanName, " must be in a MM/DD/YYYY format."));
      } // validation = date format mm/dd/yyyy-mm/dd/yyyy


      if (this.multiDate && !/^\d{1,2}\/\d{1,2}\/\d{4}-\d{1,2}\/\d{1,2}\/\d{4}$/.test(this.value)) {
        validationFailures.push('multidate');
        helperMessages.push("".concat(this.humanName, " must be in a MM/DD/YYYY-MM/DD/YYYY format."));
      } // validation = is a number


      if (this.number && isNaN(this.value)) {
        validationFailures.push('number');
        helperMessages.push("".concat(this.humanName, " must be number."));
      } // validation = minimum value


      if (this.min && this.value < this.min) {
        validationFailures.push('min-value');
        helperMessages.push("".concat(this.humanName, " must be greater than the minimum value of ").concat(this.min, "."));
      } // validation = maximum value


      if (this.max && this.value > this.max) {
        validationFailures.push('max-value');
        helperMessages.push("".concat(this.humanName, " must be less than the maximum value of ").concat(this.max, "."));
      } // validation = within range of min and max values


      if (this.min && this.max && (this.value < this.min || this.value > this.max)) {
        validationFailures.push('out-of-range');
        helperMessages.push("".concat(this.humanName, " must be greater than the minimum value of ").concat(this.min, " and less than the maximum value of ").concat(this.max, "."));
      }

      if (this.minLength && this.value.length < this.minLength) {
        validationFailures.push('min-minLength');
        helperMessages.push("".concat(this.humanName, " must be longer than ").concat(this.minLength, " characters."));
      } // validation = phone number in:
      // XXX-XXX-XXXX OR
      // XXX.XXX.XXXX OR
      // XXX XXX XXXX Formats


      if (this.phone && !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(this.value)) {
        validationFailures.push('phone');
        helperMessages.push("".concat(this.humanName, " must be formatted XXX-XXX-XXXX OR XXX.XXX.XXXX OR XXX XXX XXXX."));
      } // validation = postal code


      if (this.isPostalCode) {
        var postalCodeValid = false; // Canada

        if (this.postalCode === '### ###') {
          postalCodeValid = /^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ] [0-9][ABCEFGHJKLMNPRSTVWXYZ][0-9]$/.test(this.value);
        } // US


        if (this.postalCode === '#####') {
          postalCodeValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(this.value);
        }

        if (!postalCodeValid) {
          validationFailures.push('postal-code');
          helperMessages.push("".concat(this.humanName, " must be a valid format"));
        }
      } // Stop special chars on non-email/password/date/address/username fields


      if (!(this.email || this.password || this.date || this.textarea || this.address || this.username || this.isPostalCode) && !/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/.test(this.value)) {
        validationFailures.push('special');
        helperMessages.push('Special characters such as @, !, etc are not allowed.');
      } // show error helper if validation fails


      if (validationFailures.length > 0 && helperMessages.length > 0) {
        this.validated = false;
        this.calculatedHelper = helperMessages.join('<br />');
        this.showHelper = true;
      } else {
        // reset helper based on helper prop
        this.validated = true;
        this.calculatedHelper = this.helper;
        this.showHelper = this.helper.length > 0;
      }
    }
  },
  created: function created() {
    if (this.checked) {
      this.isChecked = true;
    }
  },
  mounted: function mounted() {
    // Store passed in helper
    // Show if present
    if (this.helper.length > 0) {
      this.calculatedHelper = this.helper;
      this.showHelper = true;
    }

    if (this.isSwitch) {
      this.value = this.setDefaultValue();
    }

    if (this.defaultValue.length > 0) {
      this.value = this.defaultValue;
      this.validateField();
    }
  },
  props: {
    address: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    autocomplete: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    },
    checkbox: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    checked: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    customHumanName: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    date: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    defaultValue: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    disabled: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    email: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    field: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    hasFlag: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    hasNoForm: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    helper: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    icon: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    id: {
      type: String,
      default: function _default() {
        return "".concat(this.field, "-").concat(Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["a" /* randomId */])());
      }
    },
    isCentered: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isStartDateOnly: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isSmall: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isMedium: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isLarge: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    label: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    link: {
      type: Object,
      default: function _default() {
        return {
          name: '',
          url: ''
        };
      }
    },
    match: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    max: {
      type: String,
      default: function _default() {
        return null;
      }
    },
    maxDate: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    min: {
      type: String,
      default: function _default() {
        return null;
      }
    },
    minLength: {
      type: String,
      default: function _default() {
        return null;
      }
    },
    multiDate: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    noDefault: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    number: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    password: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    placeholder: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    phone: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    postalCode: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    radio: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    required: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    selectableDates: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showPlaceholder: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    select: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    selected: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    selectOptions: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    skipValidation: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    target: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    textarea: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    toggle: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    username: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    validatePasswordFormat: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  }
};
var baseInputProps = {
  computed: {
    inputListeners: function inputListeners() {
      var vm = this; // `Object.assign` merges objects together to form a new object

      return Object.assign({}, // We add all the listeners from the parent
      this.$listeners, // Then we can add custom listeners or override the
      // behavior of some listeners.
      {
        // This ensures that the component works with v-model
        input: function input(event) {
          if (event.target.nodeName !== 'SELECT' || event.target.type && (event.target.type !== 'checkbox' || event.target.type !== 'radio')) {
            vm.$emit('input', event);
          }
        },
        focus: function focus() {
          vm.$emit('focus');
        },
        blur: function blur(event) {
          vm.$emit('blur', event);
        },
        change: function change(event) {
          vm.$emit('change', event);
        },
        mounted: function mounted(event) {
          vm.$emit('mounted', event);
        }
      });
    }
  },
  props: {
    checked: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    field: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    selected: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    selectOptions: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    type: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    value: {
      type: [Number, String, Boolean],
      default: function _default() {
        return '';
      }
    }
  }
};


/***/ }),
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeSection_vue__ = __webpack_require__(130);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_df330f46_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeSection_vue__ = __webpack_require__(384);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeSection_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_df330f46_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeSection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/doe/DoeSection.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-df330f46", Component.options)
  } else {
    hotAPI.reload("data-v-df330f46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return randomId; });
/* unused harmony export wait */
var randomId = function randomId() {
  return Math.random().toString(36).slice(2);
}; // wait until element is in dom


var wait = function wait(selector) {
  return new Promise(function (resolve, reject) {
    var waitForEl = function waitForEl(selector) {
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var el = document.querySelector(selector);

      if (el) {
        resolve(el);
      } else {
        setTimeout(function () {
          count++;

          if (count < 10) {
            waitForEl(selector, count);
          } else {
            reject();
          }
        }, 100);
      }
    };

    waitForEl(selector);
  });
};



/***/ }),
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeScrollProgress_vue__ = __webpack_require__(129);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_15ca7852_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeScrollProgress_vue__ = __webpack_require__(383);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeScrollProgress_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_15ca7852_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeScrollProgress_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/doe/DoeScrollProgress.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15ca7852", Component.options)
  } else {
    hotAPI.reload("data-v-15ca7852", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_The404Page_vue__ = __webpack_require__(124);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23224844_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_The404Page_vue__ = __webpack_require__(378);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_The404Page_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23224844_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_The404Page_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/The404Page.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23224844", Component.options)
  } else {
    hotAPI.reload("data-v-23224844", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__ = __webpack_require__(36);
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeContent: __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__["a" /* default */]
  },
  mounted: function mounted() {
    document.title = '404';
    this.$eventBus.$emit('page-rendered');
  },
  methods: {
    handleSearchClick: function handleSearchClick() {
      this.$eventBus.$emit('show-search');
    }
  }
});

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    h1: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    h2: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    h3: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    h4: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    h5: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    h6: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    headlineLink: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    html: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    p: {
      type: [String, Array],
      default: function _default() {
        return '';
      }
    },
    ul: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    },
    ol: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    },
    dl: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    button: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    hasButton: function hasButton() {
      return Object.keys(this.button).length > 0 && this.button.text;
    },
    hasDl: function hasDl() {
      return this.dl.length > 0;
    },
    hasHtml: function hasHtml() {
      return this.html && this.html.length > 0;
    },
    hasMultipleParagraphs: function hasMultipleParagraphs() {
      return this.p instanceof Array;
    },
    hasOl: function hasOl() {
      if (this.ol instanceof Array) {
        return this.ol.length > 0;
      }

      if (this.ol instanceof Object) {
        return Object.keys(this.ol).length > 0;
      }

      return false;
    },
    hasUl: function hasUl() {
      if (this.ul instanceof Array) {
        return this.ul.length > 0;
      }

      if (this.ul instanceof Object) {
        return Object.keys(this.ul).length > 0;
      }

      return false;
    },
    isSingleParagraph: function isSingleParagraph() {
      return this.p && !this.hasMultipleParagraphs;
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.hasHtml) {
      this.$nextTick(function () {
        _this.unWrapHtmlDiv();
      });
    }
  },
  activated: function activated() {
    this.bindLinks();
  },
  deactivated: function deactivated() {
    this.unbindLinks();
  },
  beforeDestroy: function beforeDestroy() {
    this.unbindLinks();
  },
  methods: {
    bindLink: function bindLink(e) {
      e.preventDefault();
      var path = e.target.href.replace(/^.*\/\/[^/]+/, '');

      if (this.$site !== 'en') {
        path = "/".concat(this.$site.replace(/_/g, '-')).concat(path);
      }

      this.$router.push({
        path: path
      });
    },
    bindLinks: function bindLinks() {
      var _this2 = this;

      // NOTE: IE11 can't handle forEach over a nodeList, so convert to an array first
      Array.from(this.$el.querySelectorAll('a:not(.content-button):not([target])')).forEach(function (el) {
        return el.addEventListener('click', _this2.bindLink);
      });
    },
    unbindLinks: function unbindLinks() {
      var _this3 = this;

      // NOTE: IE11 can't handle forEach over a nodeList, so convert to an array first
      Array.from(this.$el.querySelectorAll('a:not(.content-button):not([target])')).forEach(function (el) {
        return el.removeEventListener('click', _this3.bindLink);
      });
    },
    unWrapHtmlDiv: function unWrapHtmlDiv() {
      // In Vue, you can only render raw
      // HTML on an element like div, but we
      // don't want our HTML wrapped in
      // superfluous markup. This "unwraps"
      // the HTML blob and puts it in the root
      // div.
      var html = this.$refs.html;
      var parent = html.parentNode;

      while (html.firstChild) {
        parent.insertBefore(html.firstChild, html);
      }

      parent.removeChild(html); // hook anchors into vue router after we've
      // moved around the HTML

      this.bindLinks();
    }
  }
});

/***/ }),
/* 126 */,
/* 127 */,
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeScrollProgress_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doe_DoeSection_vue__ = __webpack_require__(51);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// TODO: refactor loading animation parts into mixin/ajaxPageProps


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeScrollProgress: __WEBPACK_IMPORTED_MODULE_0__doe_DoeScrollProgress_vue__["a" /* default */],
    DoeSection: __WEBPACK_IMPORTED_MODULE_1__doe_DoeSection_vue__["a" /* default */]
  },
  created: function created() {
    var _this = this;

    this.$eventBus.$on('animate-page', function () {
      setTimeout(function () {
        _this.animateHero();
      }, 250);

      _this.$eventBus.$emit('page-loaded');
    });
  },
  activated: function activated() {
    var overlayEl = document.querySelector('.hero-carousel.is-overlay');

    if (overlayEl) {
      var oldVideo = overlayEl.querySelector('video');

      if (oldVideo) {
        var newVideo = this.$refs.hero.$el.querySelector('video');
        newVideo.currentTime = oldVideo.currentTime;
        this.prepareLoadingVideo(newVideo, oldVideo);
        return;
      }
    }

    this.$emit('page-activated', true);
  },
  methods: {
    animateHero: function animateHero() {
      var hero = this.$refs.hero.$el;
      hero.classList.toggle('is-inset');
      var scrollProgress = this.$refs.scrollProgress.$el;
      scrollProgress.classList.toggle('is-visible');
    },
    prepareLoadingVideo: function prepareLoadingVideo(newVideo, oldVideo) {
      var _this2 = this;

      if (newVideo.readyState === 4) {
        this.$emit('page-activated', true, 250);
        return;
      } // recursively call method until the above condition is true


      setTimeout(function () {
        _this2.prepareLoadingVideo(newVideo, oldVideo);
      }, 100);
    }
  }
});

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    isDarkText: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isRight: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    title: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  data: function data() {
    return {
      progress: 0
    };
  },
  computed: {
    classNames: function classNames() {
      return {
        'scroll-progress': true,
        'is-dark-text': this.isDarkText,
        'is-right': this.isRight
      };
    },
    hasTitle: function hasTitle() {
      return this.title && this.title.length > 0;
    },
    progressStyle: function progressStyle() {
      return {
        width: "".concat(this.progress, "%")
      };
    }
  },
  activated: function activated() {
    document.addEventListener('scroll', this.handleScroll, {
      passive: true
    });
  },
  deactivated: function deactivated() {
    document.addEventListener('scroll', this.handleScroll, {
      passive: true
    });
  },
  methods: {
    handleScroll: function handleScroll() {
      var docHeight = document.body.clientHeight;
      var winHeight = window.innerHeight;
      var max = docHeight - winHeight;
      var value = window.scrollY;
      this.progress = value / max * 100;
    }
  }
});

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DoeContent_vue__ = __webpack_require__(36);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeContent: __WEBPACK_IMPORTED_MODULE_0__DoeContent_vue__["a" /* default */]
  },
  props: {
    button: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    content: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    hasCenteredContent: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    hasFullImage: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    hasLargeImage: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    hasRotatedText: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isHero: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isLargeHeadline: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isReverse: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isSplit: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    mediaButton: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    picture: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    video: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    videoFile: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  computed: {
    hasCopy: function hasCopy() {
      return this.content.html || this.content.p;
    },
    hasMedia: function hasMedia() {
      return this.$slots.media || this.hasPicture || this.hasVideo;
    },
    hasMediaButton: function hasMediaButton() {
      return Object.keys(this.mediaButton).length > 0;
    },
    hasPicture: function hasPicture() {
      return this.picture && Object.keys(this.picture).length > 0 && ('videoUrl' in this.picture === false || this.picture.videoUrl === null);
    },
    hasVideo: function hasVideo() {
      return this.picture && this.picture.videoUrl && this.picture.videoUrl.length > 0 || this.videoFile.length > 0 || this.video && Object.keys(this.video).length > 0;
    },
    mediaButtonHasIconOnly: function mediaButtonHasIconOnly() {
      return this.hasMediaButton && !this.mediaButton.text;
    },
    modifiers: function modifiers() {
      return {
        section: true,
        'has-centered-content': this.hasCenteredContent,
        'has-copy': this.hasCopy,
        'has-full-image': this.hasFullImage,
        'has-large-image': this.hasLargeImage,
        'has-rotated-text': this.hasRotatedText,
        'is-hero': this.isHero,
        'is-large-headline': this.isLargeHeadline,
        'is-split': this.isSplit,
        'is-reverse': this.isReverse
      };
    }
  }
});

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeScrollProgress_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doe_DoeSection_vue__ = __webpack_require__(51);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// TODO: refactor loading animation parts into mixin/ajaxPageProps


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeScrollProgress: __WEBPACK_IMPORTED_MODULE_0__doe_DoeScrollProgress_vue__["a" /* default */],
    DoeSection: __WEBPACK_IMPORTED_MODULE_1__doe_DoeSection_vue__["a" /* default */]
  },
  created: function created() {
    var _this = this;

    this.$eventBus.$on('animate-page', function () {
      setTimeout(function () {
        _this.animateHero();
      }, 250);

      _this.$eventBus.$emit('page-loaded');
    });
  },
  activated: function activated() {
    this.$emit('page-activated', true);
  },
  methods: {
    animateHero: function animateHero() {
      var hero = this.$refs.hero.$el;
      hero.classList.toggle('is-inset');
      var scrollProgress = this.$refs.scrollProgress.$el;
      scrollProgress.classList.toggle('is-visible');
    }
  }
});

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_LegentButtons_vue__ = __webpack_require__(391);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    LegentButtons: __WEBPACK_IMPORTED_MODULE_0__components_LegentButtons_vue__["a" /* default */]
  }
});

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    isCenter: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isRight: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  computed: {
    buttonsModifiers: function buttonsModifiers() {
      return {
        buttons: true,
        'is-center': this.isCenter,
        'is-right': this.isRight
      };
    }
  }
});

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeSection_vue__ = __webpack_require__(51);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// TODO: refactor loading animation parts into mixin/ajaxPageProps

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeSection: __WEBPACK_IMPORTED_MODULE_0__doe_DoeSection_vue__["a" /* default */]
  },
  created: function created() {
    var _this = this;

    this.$eventBus.$on('animate-page', function () {
      setTimeout(function () {
        _this.animateHero();
      }, 250);

      _this.$eventBus.$emit('page-loaded');
    });
  },
  activated: function activated() {
    this.$emit('page-activated', true);
  },
  methods: {
    animateHero: function animateHero() {
      var hero = this.$refs.hero.$el;
      hero.classList.toggle('is-inset');
    }
  }
});

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_LegentCarouselHero_vue__ = __webpack_require__(397);
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    LegentCarouselHero: __WEBPACK_IMPORTED_MODULE_0__components_LegentCarouselHero_vue__["a" /* default */]
  },
  data: function data() {
    return {
      slides: [{
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
      }, {
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
      }, {
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
      }, {
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
      }]
    };
  },
  activated: function activated() {
    this.$emit('page-activated');
    this.$eventBus.$emit('page-loaded');
  }
});

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_mixins__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doe_DoeSection_vue__ = __webpack_require__(51);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeSection: __WEBPACK_IMPORTED_MODULE_1__doe_DoeSection_vue__["a" /* default */]
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_mixins__["a" /* smoothScroll */]],
  props: {
    slides: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      currentSlide: 0
    };
  },
  computed: {
    currentSlideText: function currentSlideText() {
      return "".concat(this.currentSlide + 1, " of ").concat(this.slidesCount);
    },
    progressOffset: function progressOffset() {
      return this.progressWidth * this.currentSlide;
    },
    progressStyles: function progressStyles() {
      return {
        marginLeft: "".concat(this.progressOffset, "%"),
        width: "".concat(this.progressWidth, "%")
      };
    },
    progressWidth: function progressWidth() {
      return 100 / this.slidesCount;
    },
    slidesCount: function slidesCount() {
      return this.slides.length;
    }
  },
  activated: function activated() {
    var _this = this;

    setTimeout(function () {
      _this.$el.classList.add('is-ready');
    }, 250);
  },
  methods: {
    handleCtaClick: function handleCtaClick(path) {
      var _this$$refs = this.$refs,
          slidesContainer = _this$$refs.slidesContainer,
          progress = _this$$refs.progress,
          nav = _this$$refs.nav;
      var currentSlide = slidesContainer.querySelectorAll('.section')[this.currentSlide];
      var currentSlideVideo = currentSlide.querySelector('video');
      var loadingScreen = document.createElement('div');
      var heroCarouselContent = document.createElement('div');
      var newSlide = currentSlide.cloneNode(true);
      var newSlideVideo = newSlide.querySelector('video');
      var newProgress = progress.cloneNode(true);
      var newNav = nav.cloneNode(true);
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
    nextSlide: function nextSlide() {
      /* eslint prefer-destructuring: 0 */
      this.currentSlide === this.slidesCount - 1 ? false : this.setSlide(this.currentSlide + 1);
    },
    prepareLoadingVideo: function prepareLoadingVideo(container, path, newVideo, oldVideo) {
      var _this2 = this;

      if (newVideo.readyState === 4) {
        container.classList.add('is-showing');
        oldVideo.pause();
        this.redirect(container, path);
        return;
      } // recursively call method until the above condition is true


      setTimeout(function () {
        _this2.prepareLoadingVideo(container, path, newVideo, oldVideo);
      }, 100);
    },
    prevSlide: function prevSlide() {
      /* eslint no-unused-expressions: 0 */
      this.currentSlide === 0 ? false : this.setSlide(this.currentSlide - 1);
    },
    redirect: function redirect(container, path) {
      var _this3 = this;

      setTimeout(function () {
        container.classList.add('is-loading');

        _this3.$router.push({
          path: path
        });
      }, 250);
    },
    setSlide: function setSlide(targetSlide) {
      if (targetSlide === this.currentSlide) {
        return;
      }

      this.smoothScroll(this.$el.querySelectorAll('.section')[targetSlide]);
      var slidesContainer = this.$refs.slidesContainer;
      var slides = slidesContainer.querySelectorAll('.section');
      var currentSlide = slides[this.currentSlide];
      var nextSlide = slides[targetSlide];
      var nextSlideVideo = nextSlide.querySelector('video');

      if (nextSlideVideo) {
        nextSlideVideo.play();
      }

      currentSlide.style.zIndex = 2;
      nextSlide.style.zIndex = 1;
      currentSlide.classList.add('is-hiding');
      setTimeout(function () {
        currentSlide.style.zIndex = 0;
        currentSlide.classList.remove('is-hiding');
        nextSlide.style.zIndex = 2;
        var currentSlideVideo = currentSlide.querySelector('video');

        if (currentSlideVideo) {
          currentSlideVideo.pause();
          currentSlideVideo.currentTime = 0;
        }
      }, 1000);
      this.currentSlide = targetSlide;
    }
  }
});

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeScrollProgress_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doe_DoeSection_vue__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_fred_signature_svg__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_fred_signature_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__images_fred_signature_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_sinji_signature_svg__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_sinji_signature_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_sinji_signature_svg__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// TODO: refactor loading animation parts into mixin/ajaxPageProps




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeScrollProgress: __WEBPACK_IMPORTED_MODULE_0__doe_DoeScrollProgress_vue__["a" /* default */],
    DoeSection: __WEBPACK_IMPORTED_MODULE_1__doe_DoeSection_vue__["a" /* default */],
    FredSignature: __WEBPACK_IMPORTED_MODULE_2__images_fred_signature_svg___default.a,
    SinjiSignature: __WEBPACK_IMPORTED_MODULE_3__images_sinji_signature_svg___default.a
  },
  created: function created() {
    var _this = this;

    this.$eventBus.$on('animate-page', function () {
      setTimeout(function () {
        _this.animateHero();
      }, 250);

      _this.$eventBus.$emit('page-loaded');
    });
  },
  activated: function activated() {
    var overlayEl = document.querySelector('.hero-carousel.is-overlay');

    if (overlayEl) {
      var oldVideo = overlayEl.querySelector('video');

      if (oldVideo) {
        var newVideo = this.$refs.hero.querySelector('video');
        newVideo.currentTime = oldVideo.currentTime;
        this.prepareLoadingVideo(newVideo, oldVideo);
        return;
      }
    }

    this.$emit('page-activated', true);
  },
  methods: {
    animateHero: function animateHero() {
      var _this2 = this;

      var hero = this.$refs.hero;
      hero.classList.toggle('is-ready');
      setTimeout(function () {
        hero.classList.toggle('is-finished');
        setTimeout(function () {
          hero.classList.toggle('show-names');
          var scrollProgress = _this2.$refs.scrollProgress.$el;
          scrollProgress.classList.toggle('is-visible');
        }, 10);
      }, 1000);
    },
    prepareLoadingVideo: function prepareLoadingVideo(newVideo, oldVideo) {
      var _this3 = this;

      if (newVideo.readyState === 4) {
        this.$emit('page-activated', true, 2000);
        return;
      } // recursively call method until the above condition is true


      setTimeout(function () {
        _this3.prepareLoadingVideo(newVideo, oldVideo);
      }, 100);
    }
  }
});

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_if_emoji__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_if_emoji___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_if_emoji__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_outdated_browser_rework__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_outdated_browser_rework___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_outdated_browser_rework__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_The500Page_vue__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_The503Page_vue__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layout_TheAgeGate_vue__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layout_TheHeader_vue__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__layout_TheFooter_vue__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_TheOfflinePage_vue__ = __webpack_require__(430);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    The500Page: __WEBPACK_IMPORTED_MODULE_2__pages_The500Page_vue__["a" /* default */],
    The503Page: __WEBPACK_IMPORTED_MODULE_3__pages_The503Page_vue__["a" /* default */],
    TheAgeGate: __WEBPACK_IMPORTED_MODULE_4__layout_TheAgeGate_vue__["a" /* default */],
    TheHeader: __WEBPACK_IMPORTED_MODULE_5__layout_TheHeader_vue__["a" /* default */],
    TheFooter: __WEBPACK_IMPORTED_MODULE_6__layout_TheFooter_vue__["a" /* default */],
    TheOfflinePage: __WEBPACK_IMPORTED_MODULE_7__pages_TheOfflinePage_vue__["a" /* default */]
  },
  data: function data() {
    return {
      baseGtmDataLayer: [],
      data: {},
      isOldEnough: true,
      // TODO: set to false to reenable age gate
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
    apiUrl: function apiUrl() {
      return window.prerender ? "https://legent-frontend.test".concat(this.$api.app) : this.$api.app;
    }
  },
  watch: {
    isOldEnough: function isOldEnough(value) {
      if (value) {
        document.body.classList.remove('has-modal-active');
      }
    },
    $route: function $route() {
      var _this = this;

      this.show500Page = false;
      this.showOfflinePage = false;

      if (this.resetIsOldEnough) {
        this.isOldEnough = false;
      }

      this.$nextTick(function () {
        _this.updateDataLayer();
      });
    }
  },
  created: function created() {
    var _this2 = this;

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

    this.checkBrowserSupport(); // this.loadData();

    this.$eventBus.$on('page-loading', function () {
      _this2.pageLoadingTransition = 'slideLeft';

      _this2.$nextTick(function () {
        _this2.pageLoading = true;
      });
    });
    window.addEventListener('blur', this.handleWindowBlur);
    window.addEventListener('focus', this.handleWindowFocus);
    this.$eventBus.$on('error', function (error) {
      if ('onLine' in navigator && !navigator.onLine) {
        _this2.showOfflinePage = true;
        return;
      }

      if (window.location.hostname !== 'www.makersmark.com') {
        console.error(error);
      }

      _this2.show500Page = true;
    });

    if (window.prerender) {
      this.$eventBus.$on('page-loaded', function () {
        document.dispatchEvent(new Event('page-rendered'));
      });
    }

    window.dataLayer = [];
    var dataLayerUser = {};
    this.baseGtmDataLayer = {
      user: dataLayerUser,
      global: {
        siteType: 'standard',
        brand: 'legent',
        spiritType: 'bourbon'
      }
    }; // TODO:set hostnames

    var addScript = window.location.hostname === 'www.legent.com' || window.location.hostname === 'legent-frontend.doe1915.com';
    this.updateDataLayer(addScript); // Only add bugherd when on staging

    if (window.location.hostname === 'legent-frontend.doe1915.com') {
      this.addBugherd();
    }
  },
  mounted: function mounted() {
    if (!this.isOldEnough) {
      document.body.classList.add('has-modal-active');
    } // check this after mount because it doesn't need to be
    // available right away


    if (__WEBPACK_IMPORTED_MODULE_0_if_emoji___default()('🥃')) {
      // ifEmoji detects if the computer has the passed emoji
      // or not. This is a relatively new emoji, so a lot of computers
      // don't have it. Add it to the away title if it is there.
      this.metaTitleAway = "\uD83E\uDD43 ".concat(this.metaTitleAway);
    } // Show outdated browser banner


    __WEBPACK_IMPORTED_MODULE_1_outdated_browser_rework___default()();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('blur', this.handleWindowBlur);
    window.removeEventListener('focus', this.handleWindowFocus);
  },
  methods: {
    addBugherd: function addBugherd() {// const script = document.createElement('script');
      // script.type = 'text/javascript';
      // script.src = 'https://www.bugherd.com/sidebarv2.js?apikey=oewza4qsz5b3vyue06bemg';
      // document.head.appendChild(script);
    },
    checkBrowserSupport: function checkBrowserSupport() {
      var maskClass = document.body.style['-webkit-mask-repeat'] !== undefined || document.body.style['mask-repeat'] !== undefined ? 'cssmask' : 'no-cssmask';
      document.documentElement.classList.add(maskClass);
    },
    handlePageActivated: function handlePageActivated() {
      var _this3 = this;

      var overlay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (overlay) {
        var overlayEl = document.querySelector('.hero-carousel.is-overlay');

        if (overlayEl) {
          setTimeout(function () {
            document.body.removeChild(document.querySelector('.hero-carousel.is-overlay'));
          }, delay);
        }

        this.$eventBus.$emit('animate-page');
        return;
      }

      this.pageLoadingTransition = 'slideRight';
      this.$nextTick(function () {
        _this3.pageLoading = false;
      });
      this.$eventBus.$emit('animate-page');
    },
    handlePassedAgeGate: function handlePassedAgeGate() {
      this.setIsOldEnough();
    },
    handleWindowBlur: function handleWindowBlur() {
      var _this4 = this;

      this.metaTitle = document.title;
      this.metaTitleInterval = setInterval(function () {
        document.title = _this4.metaTitleChanged ? _this4.metaTitleAway : _this4.metaTitle;
        _this4.metaTitleChanged = !_this4.metaTitleChanged;
      }, 5000);
    },
    handleWindowFocus: function handleWindowFocus() {
      document.title = this.metaTitle;
      clearInterval(this.metaTitleInterval);
    },
    loadData: function loadData() {
      var _this5 = this;

      var updateFromApi = true;

      if (window.data) {
        this.data = window.data.app;
        delete window.data.app;
        updateFromApi = false;
      }

      this.$axios.get("".concat(this.apiUrl, "?site=").concat(this.$site)).then(function (response) {
        if (updateFromApi) {
          _this5.data = response.data;
        }
      }).catch(function (error) {
        _this5.$eventBus.$emit('error', error);
      });
    },
    setIsOldEnough: function setIsOldEnough() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.isOldEnough = state;
    },
    updateDataLayer: function updateDataLayer() {
      var addScript = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      window.dataLayer.push(this.baseGtmDataLayer);

      if (addScript) {
        var script = document.createElement('script');
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
});

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__ = __webpack_require__(36);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeContent: __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__["a" /* default */]
  },
  mounted: function mounted() {
    document.title = 'Error';
    this.$eventBus.$emit('page-loaded');
  }
});

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__ = __webpack_require__(36);
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeContent: __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__["a" /* default */]
  },
  mounted: function mounted() {
    document.title = 'Site Maintenance';
    this.$eventBus.$emit('page-loaded');
  }
});

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_forms_AgeGateBirthdate_vue__ = __webpack_require__(420);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    AgeGateBirthdate: __WEBPACK_IMPORTED_MODULE_0__components_forms_AgeGateBirthdate_vue__["a" /* default */]
  },
  data: function data() {
    return {
      age: '',
      birthdate: '',
      country: 'United States',
      rememberMe: false
    };
  },
  computed: {
    copyrightYear: function copyrightYear() {
      return new Date().getFullYear();
    }
  },
  mounted: function mounted() {
    this.$gtm.$emit('trackEvent', {
      event: 'e_ageGatePresented'
    });
  },
  methods: {
    handleSuccess: function handleSuccess(birthdate, country, rememberMe, age) {
      this.country = country;
      this.birthdate = birthdate;
      this.rememberMe = rememberMe;
      this.age = age;
      this.passedAgeGate();
    },
    passedAgeGate: function passedAgeGate() {
      var duration = '0'; // session cookie, expires when browser is closed

      if (this.rememberMe) {
        duration = '30D';
      }

      this.$cookies.set('over21', '1', duration);
      this.$cookies.set('country', this.country, duration);
      this.$cookies.set('birthdate', this.birthdate, duration);
      this.$gtm.$emit('trackEvent', {
        event: 'e_ageGate',
        ageGatePass: 'true',
        ageGateAge: this.age,
        ageGateYear: this.birthdate.split('/')[0]
      });
      this.$emit('passed-age-gate');
    }
  }
});

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_data__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_forms__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elements_LegentBirthday_vue__ = __webpack_require__(144);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    LegentBirthday: __WEBPACK_IMPORTED_MODULE_2__elements_LegentBirthday_vue__["default"]
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_1__core_forms__["a" /* form */]],
  data: function data() {
    return {
      age: '',
      birthdate: '',
      country: 'United States',
      validBirthdate: false
    };
  },
  computed: {
    activeCountries: function activeCountries() {
      return __WEBPACK_IMPORTED_MODULE_0__core_data__["a" /* countries */].filter(function (country) {
        return country.active;
      });
    },
    canSubmit: function canSubmit() {
      // override mixin method to account for birthdate
      return this.hasValidFields && this.requiredFieldsCount === this.validatedFieldsCount && this.validBirthdate;
    },
    currentCountry: function currentCountry() {
      var _this = this;

      return this.activeCountries.filter(function (country) {
        return country.name === _this.country;
      })[0];
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.checkValidation();
    });
  },
  methods: {
    handlebirthdateInvalid: function handlebirthdateInvalid() {
      this.birthdate = '';
      this.validBirthdate = false;
      this.checkValidation();
    },
    handlebirthdateValid: function handlebirthdateValid(birthdate, age) {
      this.birthdate = birthdate;
      this.age = age;
      this.validBirthdate = true;
      this.checkValidation();
    },
    handleChange: function handleChange() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.country = _this3.findField('country').value;

        _this3.checkValidation();
      });
    },
    handleSubmit: function handleSubmit() {
      this.$gtm.$emit('trackEvent', {
        event: 'e_formSubmit',
        formName: 'age gate birthdate'
      });

      if (this.validBirthdate) {
        var formData = this.getFormData();
        this.$emit('success', this.birthdate, this.country, formData.remember_me, false, this.age);
      } else {
        this.$gtm.$emit('trackEvent', {
          event: 'e_ageGate',
          ageGatePass: 'false',
          ageGateAge: this.age,
          ageGateYear: this.birthdate.split('/')[0]
        });
        window.location = 'https://www.responsibility.org/';
      }
    }
  }
});

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultCountry */
/* unused harmony export locales */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return countries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return states; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return provinces; });
var locales = [{
  abbreviation: 'AU',
  countryCode: 'AUS',
  language: 'au',
  name: 'Australia',
  active: true,
  emoji: '🇦🇺'
}, {
  abbreviation: 'US',
  countryCode: 'USA',
  language: 'en',
  name: 'United States',
  active: true,
  emoji: '🇺🇸'
}, {
  abbreviation: 'CA',
  countryCode: 'CAN',
  language: 'ca',
  name: 'Canada',
  active: true,
  emoji: '🇨🇦'
}, {
  abbreviation: 'CA',
  countryCode: 'CAN',
  language: 'fr_ca',
  name: 'Canada - French',
  drinkingAge: 19,
  emoji: '🇨🇦'
}, {
  abbreviation: 'ZH',
  countryCode: 'CHN',
  language: 'zh',
  name: 'China',
  active: true,
  emoji: '🇨🇳'
}, {
  abbreviation: 'DE',
  countryCode: 'DEU',
  language: 'de',
  name: 'Germany',
  active: true,
  emoji: '🇩🇪'
}, {
  abbreviation: 'FR',
  countryCode: 'FRA',
  language: 'fr',
  name: 'France',
  active: true,
  emoji: '🇫🇷'
}, {
  abbreviation: 'JP',
  countryCode: 'JPN',
  language: 'ja',
  name: 'Japan',
  active: true,
  emoji: '🇯🇵'
}, {
  abbreviation: 'RU',
  countryCode: 'RUS',
  language: 'ru',
  name: 'Russia',
  active: true,
  emoji: '🇷🇺'
}, {
  abbreviation: 'UK',
  countryCode: 'GBR',
  language: 'uk',
  name: 'United Kingdom',
  active: true,
  emoji: '🇬🇧'
}];
var countries = [{
  abbreviation: 'US',
  name: 'United States',
  drinkingAge: 21,
  active: true,
  emoji: '🇺🇸'
}, {
  abbreviation: 'AU',
  name: 'Australia',
  drinkingAge: 18,
  active: true,
  emoji: '🇦🇺'
}, {
  abbreviation: 'CA',
  name: 'Canada',
  drinkingAge: 19,
  active: true,
  emoji: '🇨🇦'
}, {
  abbreviation: 'ZH',
  name: 'China',
  drinkingAge: 18,
  active: true,
  emoji: '🇨🇳'
}, {
  abbreviation: 'FR',
  name: 'France',
  drinkingAge: 18,
  active: true,
  emoji: '🇫🇷'
}, {
  abbreviation: 'DE',
  name: 'Germany',
  drinkingAge: 18,
  active: true,
  emoji: '🇩🇪'
}, {
  abbreviation: 'JP',
  name: 'Japan',
  drinkingAge: 20,
  active: true,
  emoji: '🇯🇵'
}, {
  abbreviation: 'UK',
  name: 'United Kingdom',
  drinkingAge: 18,
  active: true,
  emoji: '🇬🇧'
}, {
  abbreviation: 'RU',
  name: 'Russia',
  drinkingAge: 18,
  active: true,
  emoji: '🇷🇺'
}, {
  abbreviation: 'OT',
  name: 'Other',
  drinkingAge: 21,
  active: true
}, {
  abbreviation: 'AR',
  name: 'Argentina',
  drinkingAge: 18,
  active: false,
  emoji: '🇦🇷'
}, {
  abbreviation: 'AT',
  name: 'Austria',
  drinkingAge: 18,
  active: false,
  emoji: '🇦🇹'
}, {
  abbreviation: 'BE',
  name: 'Belgium',
  drinkingAge: 18,
  active: false,
  emoji: '🇧🇪'
}, {
  abbreviation: 'BR',
  name: 'Brazil',
  drinkingAge: 18,
  active: false,
  emoji: '🇧🇷'
}, {
  abbreviation: 'BG',
  name: 'Bulgaria',
  drinkingAge: 18,
  active: false,
  emoji: '🇧🇬'
}, {
  abbreviation: 'KH',
  name: 'Cambodia',
  drinkingAge: 18,
  active: false,
  emoji: '🇨🇰'
}, {
  abbreviation: 'CL',
  name: 'Chile',
  drinkingAge: 18,
  active: false,
  emoji: '🇨🇱'
}, {
  abbreviation: 'CO',
  name: 'Colombia',
  drinkingAge: 18,
  active: false,
  emoji: '🇨🇴'
}, {
  abbreviation: 'HR',
  name: 'Croatia',
  drinkingAge: 18,
  active: false,
  emoji: '🇭🇷'
}, {
  abbreviation: 'CZ',
  name: 'Czech Republic',
  drinkingAge: 18,
  active: false,
  emoji: '🇨🇿'
}, {
  abbreviation: 'DK',
  name: 'Denmark',
  drinkingAge: 16,
  active: false,
  emoji: '🇩🇰'
}, {
  abbreviation: 'EC',
  name: 'Ecuador',
  drinkingAge: 18,
  active: false,
  emoji: '🇪🇨'
}, {
  abbreviation: 'EE',
  name: 'Estonia',
  drinkingAge: 18,
  active: false,
  emoji: '🇪🇪'
}, {
  abbreviation: 'FI',
  name: 'Finland',
  drinkingAge: 18,
  active: false,
  emoji: '🇫🇮'
}, {
  abbreviation: 'GR',
  name: 'Greece',
  drinkingAge: 18,
  active: false,
  emoji: '🇬🇷'
}, {
  abbreviation: 'HK',
  name: 'Hong Kong',
  drinkingAge: 18,
  active: false,
  emoji: '🇭🇰'
}, {
  abbreviation: 'HU',
  name: 'Hungary',
  drinkingAge: 18,
  active: false,
  emoji: '🇭🇺'
}, {
  abbreviation: 'IN',
  name: 'India',
  drinkingAge: 18,
  active: false,
  emoji: '🇮🇳'
}, {
  abbreviation: 'ID',
  name: 'Indonesia',
  drinkingAge: 21,
  active: false,
  emoji: '🇮🇩'
}, {
  abbreviation: 'IE',
  name: 'Ireland',
  drinkingAge: 18,
  active: false,
  emoji: '🇮🇪'
}, {
  abbreviation: 'IT',
  name: 'Italy',
  drinkingAge: 16,
  active: false,
  emoji: '🇮🇹'
}, {
  abbreviation: 'KR',
  name: 'Korea, Republic of',
  drinkingAge: 19,
  active: false,
  emoji: '🇰🇷'
}, {
  abbreviation: 'LV',
  name: 'Latvia',
  drinkingAge: 18,
  active: false,
  emoji: '🇱🇻'
}, {
  abbreviation: 'LT',
  name: 'Lithuania',
  drinkingAge: 18,
  active: false,
  emoji: '🇱🇹'
}, {
  abbreviation: 'MY',
  name: 'Malaysia',
  drinkingAge: 18,
  active: false,
  emoji: '🇲🇾'
}, {
  abbreviation: 'MX',
  name: 'Mexico',
  drinkingAge: 18,
  active: false,
  emoji: '🇲🇽'
}, {
  abbreviation: 'NL',
  name: 'Netherlands',
  drinkingAge: 18,
  active: false,
  emoji: '🇳🇱'
}, {
  abbreviation: 'NZ',
  name: 'New Zealand',
  drinkingAge: 18,
  active: false,
  emoji: '🇳🇿'
}, {
  abbreviation: 'NO',
  name: 'Norway',
  drinkingAge: 20,
  active: false,
  emoji: '🇳🇴'
}, {
  abbreviation: 'PE',
  name: 'Peru',
  drinkingAge: 18,
  active: false,
  emoji: '🇵🇪'
}, {
  abbreviation: 'PH',
  name: 'Philippines',
  drinkingAge: 18,
  active: false,
  emoji: '🇵🇭'
}, {
  abbreviation: 'PL',
  name: 'Poland',
  drinkingAge: 18,
  active: false,
  emoji: '🇵🇱'
}, {
  abbreviation: 'PT',
  name: 'Portugal',
  drinkingAge: 16,
  active: false,
  emoji: '🇵🇹'
}, {
  abbreviation: 'RO',
  name: 'Romania',
  drinkingAge: 18,
  active: false,
  emoji: '🇷🇴'
}, {
  abbreviation: 'SG',
  name: 'Singapore',
  drinkingAge: 18,
  active: false,
  emoji: '🇸🇬'
}, {
  abbreviation: 'SK',
  name: 'Slovakia',
  drinkingAge: 18,
  active: false,
  emoji: '🇸🇰'
}, {
  abbreviation: 'SI',
  name: 'Slovenia',
  drinkingAge: 18,
  active: false,
  emoji: '🇸🇮'
}, {
  abbreviation: 'ES',
  name: 'Spain',
  drinkingAge: 18,
  active: false,
  emoji: '🇪🇸'
}, {
  abbreviation: 'SE',
  name: 'Sweden',
  drinkingAge: 20,
  active: false,
  emoji: '🇸🇪'
}, {
  abbreviation: 'CH',
  name: 'Switzerland',
  drinkingAge: 18,
  active: false,
  emoji: '🇨🇭'
}, {
  abbreviation: 'TW',
  name: 'Taiwan',
  drinkingAge: 18,
  active: false,
  emoji: '🇹🇼'
}, {
  abbreviation: 'TH',
  name: 'Thailand',
  drinkingAge: 18,
  active: false,
  emoji: '🇹🇭'
}, {
  abbreviation: 'TR',
  name: 'Turkey',
  drinkingAge: 18,
  active: false,
  emoji: '🇹🇷'
}, {
  abbreviation: 'UY',
  name: 'Uruguay',
  drinkingAge: 18,
  active: false,
  emoji: '🇺🇾'
}, {
  abbreviation: 'VE',
  name: 'Venezuela',
  drinkingAge: 18,
  active: false,
  emoji: '🇻🇪'
}, {
  abbreviation: 'VN',
  name: 'Vietnam',
  drinkingAge: 18,
  active: false,
  emoji: '🇻🇳'
}];
var defaultCountry = {
  abbreviation: 'en',
  name: 'United States'
};
var states = [{
  abbreviation: 'AL',
  name: 'Alabama'
}, {
  abbreviation: 'AK',
  name: 'Alaska'
}, {
  abbreviation: 'AZ',
  name: 'Arizona'
}, {
  abbreviation: 'AR',
  name: 'Arkansas'
}, {
  abbreviation: 'CA',
  name: 'California'
}, {
  abbreviation: 'CO',
  name: 'Colorado'
}, {
  abbreviation: 'CT',
  name: 'Connecticut'
}, {
  abbreviation: 'DE',
  name: 'Delaware'
}, {
  abbreviation: 'DC',
  name: 'District Of Columbia'
}, {
  abbreviation: 'FL',
  name: 'Florida'
}, {
  abbreviation: 'GA',
  name: 'Georgia'
}, {
  abbreviation: 'HI',
  name: 'Hawaii'
}, {
  abbreviation: 'ID',
  name: 'Idaho'
}, {
  abbreviation: 'IL',
  name: 'Illinois'
}, {
  abbreviation: 'IN',
  name: 'Indiana'
}, {
  abbreviation: 'IA',
  name: 'Iowa'
}, {
  abbreviation: 'KS',
  name: 'Kansas'
}, {
  abbreviation: 'KY',
  name: 'Kentucky'
}, {
  abbreviation: 'LA',
  name: 'Louisiana'
}, {
  abbreviation: 'ME',
  name: 'Maine'
}, {
  abbreviation: 'MD',
  name: 'Maryland'
}, {
  abbreviation: 'MA',
  name: 'Massachusetts'
}, {
  abbreviation: 'MI',
  name: 'Michigan'
}, {
  abbreviation: 'MN',
  name: 'Minnesota'
}, {
  abbreviation: 'MS',
  name: 'Mississippi'
}, {
  abbreviation: 'MO',
  name: 'Missouri'
}, {
  abbreviation: 'MT',
  name: 'Montana'
}, {
  abbreviation: 'NE',
  name: 'Nebraska'
}, {
  abbreviation: 'NV',
  name: 'Nevada'
}, {
  abbreviation: 'NH',
  name: 'New Hampshire'
}, {
  abbreviation: 'NJ',
  name: 'New Jersey'
}, {
  abbreviation: 'NM',
  name: 'New Mexico'
}, {
  abbreviation: 'NY',
  name: 'New York'
}, {
  abbreviation: 'NC',
  name: 'North Carolina'
}, {
  abbreviation: 'ND',
  name: 'North Dakota'
}, {
  abbreviation: 'OH',
  name: 'Ohio'
}, {
  abbreviation: 'OK',
  name: 'Oklahoma'
}, {
  abbreviation: 'OR',
  name: 'Oregon'
}, {
  abbreviation: 'PA',
  name: 'Pennsylvania'
}, {
  abbreviation: 'RI',
  name: 'Rhode Island'
}, {
  abbreviation: 'SC',
  name: 'South Carolina'
}, {
  abbreviation: 'SD',
  name: 'South Dakota'
}, {
  abbreviation: 'TN',
  name: 'Tennessee'
}, {
  abbreviation: 'TX',
  name: 'Texas'
}, {
  abbreviation: 'UT',
  name: 'Utah'
}, {
  abbreviation: 'VT',
  name: 'Vermont'
}, {
  abbreviation: 'VA',
  name: 'Virginia'
}, {
  abbreviation: 'WA',
  name: 'Washington'
}, {
  abbreviation: 'WV',
  name: 'West Virginia'
}, {
  abbreviation: 'WI',
  name: 'Wisconsin'
}, {
  abbreviation: 'WY',
  name: 'Wyoming'
}];
var provinces = [{
  abbreviation: 'AB',
  name: 'Alberta'
}, {
  abbreviation: 'BC',
  name: 'British Columbia'
}, {
  abbreviation: 'MB',
  name: 'Manitoba'
}, {
  abbreviation: 'NB',
  name: 'New Brunswick'
}, {
  abbreviation: 'NL',
  name: 'Newfoundland and Labrador'
}, {
  abbreviation: 'NS',
  name: 'Nova Scotia'
}, {
  abbreviation: 'ON',
  name: 'Ontario'
}, {
  abbreviation: 'PE',
  name: 'Prince Edward Island'
}, {
  abbreviation: 'QC',
  name: 'Quebec'
}, {
  abbreviation: 'SK',
  name: 'Saskatchewan'
}, {
  abbreviation: 'NT',
  name: 'Northwest Territories'
}, {
  abbreviation: 'NU',
  name: 'Nunavut'
}, {
  abbreviation: 'YT',
  name: 'Yukon'
}];


/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentBirthday_vue__ = __webpack_require__(145);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6800cfc5_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentBirthday_vue__ = __webpack_require__(422);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentBirthday_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6800cfc5_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentBirthday_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentBirthday.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6800cfc5", Component.options)
  } else {
    hotAPI.reload("data-v-6800cfc5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    country: {
      type: Object,
      required: true
    },
    currentBirthday: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    dynamicHelperText: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    reset: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    showHelperText: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    }
  },
  data: function data() {
    return {
      age: '',
      day: '',
      hasError: false,
      hasSuccess: false,
      month: '',
      year: ''
    };
  },
  computed: {
    classNames: function classNames() {
      return {
        field: true,
        'has-multiple': true,
        'has-placeholder': true,
        'is-birthday': true,
        'is-success': this.hasSuccess,
        'is-danger': this.hasError
      };
    },
    helperText: function helperText() {
      if (this.dynamicHelperText.length > 0) {
        return this.dynamicHelperText;
      }

      return 'Invalid birthday';
    }
  },
  watch: {
    dynamicHelperText: function dynamicHelperText(value) {
      if (value.length > 0) {
        this.hasSuccess = false;
        this.hasError = true;
      }
    },
    reset: function reset(shouldReset) {
      if (shouldReset) {
        this.age = '';
        this.day = '';
        this.month = '';
        this.year = '';
      }
    },
    country: function country() {
      this.validateBirthdate();
    }
  },
  created: function created() {
    if (this.currentBirthday.length > 0) {
      var _this$currentBirthday = this.currentBirthday.split('/'),
          _this$currentBirthday2 = _slicedToArray(_this$currentBirthday, 3),
          year = _this$currentBirthday2[0],
          month = _this$currentBirthday2[1],
          day = _this$currentBirthday2[2]; // 1979/01/01


      this.year = year;
      this.month = month;
      this.day = day;
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.currentBirthday.length > 0) {
      [this.$refs.month, this.$refs.day, this.$refs.year].forEach(function (el) {
        return _this.validateField(el, false);
      });
    }
  },
  methods: {
    isOfAge: function isOfAge(minAge) {
      var year = this.year,
          month = this.month,
          day = this.day;

      if (year.length === 0 || month.length === 0 || day.length === 0) {
        return false;
      }

      var oneYear = 1000 * 60 * 60 * 24 * 365.25;
      var birthdate = new Date(year, month, day);
      this.age = Math.floor((new Date() - birthdate) / oneYear);
      return this.age > minAge;
    },
    handleKeyUp: function handleKeyUp(e) {
      var el = e.target;
      this.hasError = true;
      this.hasSuccess = false;
      this.$emit('birthdayInvalid');
      this.validateField(el);
    },
    validateBirthdate: function validateBirthdate() {
      // only validate if year is present
      if (this.year.toString().length === 4) {
        // passed
        if (this.isOfAge(this.country.drinkingAge)) {
          var formattedDay = this.day.toString();
          var formattedMonth = this.month.toString();

          if (formattedDay.length === 1) {
            formattedDay = "0".concat(formattedDay);
          }

          if (formattedMonth.length === 1) {
            formattedMonth = "0".concat(formattedMonth);
          }

          this.$emit('birthdayValid', "".concat(this.year, "/").concat(formattedMonth, "/").concat(formattedDay), this.age);
          this.hasError = false;
          this.hasSuccess = true;
          return;
        } // failed


        this.$emit('birthdayInvalid');
        this.hasError = true;
        this.hasSuccess = false;
      }
    },
    validateField: function validateField(el) {
      var focusNext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var parentEl = el.parentNode;

      if (focusNext && (el.name === 'month' || el.name === 'day') && el.value.length === 2) {
        parentEl.nextElementSibling.querySelector('input').focus();
      }

      this.validateBirthdate();
    },
    handleKeyDown: function handleKeyDown(e) {
      var el = e.target;
      var parentEl = el.parentNode; // keycodes: 8 -> delete, 37 -> left arrow

      if (el.name !== 'month' && (e.keyCode === 8 && el.selectionStart === 0 || e.keyCode === 37 && el.selectionStart === 0)) {
        parentEl.previousElementSibling.querySelector('input').focus();
      } // keycodes: 39 -> right arrow


      if (el.name !== 'year' && e.keyCode === 39 && el.selectionStart === el.value.length) {
        parentEl.nextElementSibling.querySelector('input').focus();
      }
    }
  }
});

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_legent_logo_svg__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_legent_logo_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__images_legent_logo_svg__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    LegentLogo: __WEBPACK_IMPORTED_MODULE_0__images_legent_logo_svg___default.a
  },
  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    hasItems: function hasItems() {
      return this.items.length > 0;
    }
  }
});

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__ = __webpack_require__(36);
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeContent: __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__["a" /* default */]
  },
  computed: {
    copyrightYear: function copyrightYear() {
      return new Date().getFullYear();
    }
  }
});

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__ = __webpack_require__(36);
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeContent: __WEBPACK_IMPORTED_MODULE_0__doe_DoeContent_vue__["a" /* default */]
  },
  mounted: function mounted() {
    document.title = 'Offline | Legent';
    this.$eventBus.$emit('page-loaded');
  }
});

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    href: {
      type: String,
      default: function _default() {
        return '#';
      }
    },
    icon: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    newWindow: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    text: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    title: {
      type: String,
      default: function _default() {
        return null;
      }
    }
  },
  computed: {
    rel: function rel() {
      return this.newWindow ? 'noopener' : null;
    },
    target: function target() {
      return this.newWindow ? '_blank' : null;
    }
  }
});

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseBlockquote_vue__ = __webpack_require__(151);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_50211831_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseBlockquote_vue__ = __webpack_require__(436);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseBlockquote_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_50211831_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseBlockquote_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseBlockquote.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50211831", Component.options)
  } else {
    hotAPI.reload("data-v-50211831", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    content: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    cite: {
      type: Object,
      default: function _default() {
        return {
          content: '',
          title: ''
        };
      }
    }
  },
  computed: {
    hasCite: function hasCite() {
      return this.cite.title && this.cite.title.length > 0 || this.cite.content && this.cite.content.length > 0;
    }
  }
});

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    disabled: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    icon: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    isSubmit: {
      type: Boolean,
      default: function _default() {
        return '';
      }
    },
    text: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    title: {
      type: String,
      default: function _default() {
        return null;
      }
    }
  },
  computed: {
    type: function type() {
      return this.isSubmit ? 'submit' : 'button';
    }
  }
});

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseCheckbox_vue__ = __webpack_require__(154);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4c4e2a65_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseCheckbox_vue__ = __webpack_require__(439);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseCheckbox_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4c4e2a65_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseCheckbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseCheckbox.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c4e2a65", Component.options)
  } else {
    hotAPI.reload("data-v-4c4e2a65", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_inputs__ = __webpack_require__(48);
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  inheritAttrs: false,
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_inputs__["a" /* baseInputProps */]],
  props: {
    text: {
      type: String
    },
    value: {
      type: [String, Number, Boolean]
    },
    id: {
      type: String
    },
    name: {
      type: String
    },
    required: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    checked: {
      type: Boolean
    }
  }
});

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    title: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    content: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  }
});

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
});

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    picture: {
      type: Object,
      required: true
    },
    caption: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  computed: {
    hasCaption: function hasCaption() {
      return this.caption && this.caption.length > 0;
    }
  }
});

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    action: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    method: {
      type: String,
      default: function _default() {
        return 'post';
      }
    },
    notification: {
      type: Object,
      default: function _default() {
        return {
          status: 200,
          message: '',
          withClose: true
        };
      }
    }
  },
  computed: {
    hasErrors: function hasErrors() {
      return this.notification.status && this.notification.status !== 200;
    },
    showNotification: function showNotification() {
      return this.notification.message && this.notification.message.length > 0;
    }
  },
  methods: {
    handleClose: function handleClose() {
      this.$emit('form-close');
    },
    handleInput: function handleInput() {
      this.$emit('input-changed', this);
    }
  }
});

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      isActive: false
    };
  },
  methods: {
    handleInput: function handleInput() {
      this.$emit('input-changed', this);
    }
  }
});

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    icon: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  computed: {
    hasIcon: function hasIcon() {
      return this.icon.length > 0;
    },
    iconClass: function iconClass() {
      return "icon-".concat(this.icon);
    }
  }
});

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    src: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  computed: {
    hasSrc: function hasSrc() {
      return this.src.length > 0;
    }
  }
});

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_inputs__ = __webpack_require__(48);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_inputs__["a" /* baseInputProps */]],
  inheritAttrs: false
});

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_inputs__ = __webpack_require__(48);
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_inputs__["a" /* baseInputProps */]],
  inheritAttrs: false,
  computed: {
    isSelected: function isSelected() {
      return this.selected || this.value === this.$parent.value;
    }
  }
});

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseOrderedList_vue__ = __webpack_require__(165);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7161ac0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseOrderedList_vue__ = __webpack_require__(458);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseOrderedList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7161ac0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseOrderedList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseOrderedList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7161ac0e", Component.options)
  } else {
    hotAPI.reload("data-v-7161ac0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    items: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    }
  }
});

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_picturefill__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_picturefill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_picturefill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stackblur_canvas__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stackblur_canvas___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stackblur_canvas__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    objectFit: {
      type: String,
      default: function _default() {
        return null;
      }
    },
    padding: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    picture: {
      type: Object,
      default: function _default() {
        return {
          alt: '',
          aspectRatio: 1,
          dimensions: {
            width: 1,
            height: 1
          },
          loadingUrl: null,
          title: '',
          sources: [],
          srcset: '',
          url: ''
        };
      }
    }
  },
  data: function data() {
    return {
      blurLoaded: false,
      loading: true,
      svgImage: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0wIDBoMXYxaC0xeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg=='
    };
  },
  computed: {
    hasLoadingUrl: function hasLoadingUrl() {
      return this.picture && this.picture.loadingUrl && this.picture.loadingUrl.length > 0;
    },
    hasSources: function hasSources() {
      return this.picture && 'sources' in this.picture && this.picture.sources.length > 0;
    },
    hasSrcSet: function hasSrcSet() {
      return this.picture && 'srcset' in this.picture && this.picture.srcset.length > 0;
    },
    imageClassNames: function imageClassNames() {
      return {
        image: true,
        'has-blur': this.blurLoaded,
        'is-lazy': this.hasLoadingUrl,
        'is-loading': this.loading
      };
    },
    loadingStyle: function loadingStyle() {
      return {
        paddingTop: this.paddingTop
      };
    },
    paddingTop: function paddingTop() {
      if (!this.shouldHavePadding) {
        return null;
      }

      return this.padding.length > 0 ? this.padding : "".concat(this.picture.dimensions.height / this.picture.dimensions.width * 100, "%");
    },
    shouldHavePadding: function shouldHavePadding() {
      return this.padding.length > 0 || this.picture.dimensions && Object.keys(this.picture.dimensions).length > 0;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyScene();
  },
  mounted: function mounted() {
    if (window.prerender) {
      return;
    }

    this.setupImage();
  },
  activated: function activated() {
    if (window.prerender) {
      return;
    }

    this.setupImage();
  },
  deactivated: function deactivated() {
    this.destroyScene();
  },
  methods: {
    addScene: function addScene() {
      var _this = this;

      var loadScene = new this.$scrollMagic.Scene({
        offset: -(window.innerHeight * 3),
        reverse: false,
        triggerElement: this.$el.parentNode,
        triggerHook: 'onEnter'
      }).on('enter', function () {
        var loadingImage = new Image();
        loadingImage.crossOrigin = 'anonymous';
        loadingImage.src = _this.picture.loadingUrl;

        loadingImage.onload = function () {
          _this.blurCanvas(loadingImage);

          loadingImage = null;

          _this.loadFullImage();

          _this.$scrollActions.$emit('destroyScene', "picture-".concat(_this._uid));
        };
      });
      this.$scrollActions.$emit('addScene', "picture-".concat(this._uid), loadScene);
    },
    blurCanvas: function blurCanvas(image) {
      var canvas = this.$refs.canvas;
      var canvasContext = canvas.getContext('2d');
      var canvasWidth = canvas.width;
      var canvasHeight = canvas.height;
      canvasContext.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      __WEBPACK_IMPORTED_MODULE_1_stackblur_canvas___default.a.canvasRGBA(canvas, 0, 0, canvasWidth, canvasHeight, 20);
      this.blurLoaded = true;
    },
    destroyScene: function destroyScene() {
      this.$scrollActions.$emit('destroyScene', "picture-".concat(this._uid));
    },
    loadFullImage: function loadFullImage() {
      var _this2 = this;

      var image = this.$refs.image;

      if (this.hasSources) {
        var sources = image.parentNode.getElementsByTagName('source');
        Array.from(sources).forEach(function (source) {
          source.srcset = source.dataset.srcset;
        });
      }

      if (this.hasSrcSet) {
        image.srcset = image.dataset.srcset;
      }

      image.src = image.dataset.src;

      image.onload = function () {
        _this2.loading = false;

        if (typeof __WEBPACK_IMPORTED_MODULE_0_picturefill___default.a === 'function') {
          __WEBPACK_IMPORTED_MODULE_0_picturefill___default()();
        }
      };
    },
    setupImage: function setupImage() {
      var _this3 = this;

      if (!this.loading) {
        return;
      }

      if (this.hasLoadingUrl) {
        this.$nextTick(function () {
          _this3.addScene();
        });
        return;
      }

      var image = this.$refs.image;

      if (this.hasSources) {
        var sources = image.parentNode.getElementsByTagName('source');
        Array.from(sources).forEach(function (source) {
          source.srcset = source.dataset.srcset;
        });
      }

      if (this.hasSrcSet) {
        image.srcset = image.dataset.srcset;
      }

      image.src = image.dataset.src;
      this.loading = false;
    }
  }
});

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseRadio_vue__ = __webpack_require__(168);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_50e157c9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseRadio_vue__ = __webpack_require__(463);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseRadio_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_50e157c9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseRadio_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseRadio.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50e157c9", Component.options)
  } else {
    hotAPI.reload("data-v-50e157c9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    text: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    value: {
      type: [String, Number, Boolean],
      default: function _default() {
        return '';
      }
    },
    id: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    name: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    required: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    checked: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  computed: {
    bindings: function bindings() {
      return {
        checked: this.checked,
        disabled: this.disabled,
        id: this.id,
        name: this.name,
        required: this.required,
        value: this.value
      };
    }
  }
});

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_inputs__ = __webpack_require__(48);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_inputs__["a" /* baseInputProps */]],
  inheritAttrs: false,
  props: {
    noDefault: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$children.forEach(function (option) {
      if (option.selected) {
        // this -> legent-field-wrapper -> legent-input
        _this.$parent.$parent.value = option.value;

        _this.$parent.$parent.validateField();
      }
    });
  }
});

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseTable_vue__ = __webpack_require__(171);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_142f5e1c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseTable_vue__ = __webpack_require__(466);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_142f5e1c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-142f5e1c", Component.options)
  } else {
    hotAPI.reload("data-v-142f5e1c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_mixins__ = __webpack_require__(37);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_mixins__["c" /* tableProps */]],
  computed: {
    showTable: function showTable() {
      return this.showHeader || this.showBody;
    },
    showHeader: function showHeader() {
      return this.headerRows && this.headerRows.length > 0;
    },
    showBody: function showBody() {
      return this.bodyRows && this.bodyRows.length > 0;
    }
  }
});

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_inputs__ = __webpack_require__(48);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_inputs__["a" /* baseInputProps */]],
  inheritAttrs: false,
  props: {
    columns: {
      type: [String, Number, Boolean],
      default: function _default() {
        return false;
      }
    },
    rows: {
      type: [String, Number, Boolean],
      default: function _default() {
        return false;
      }
    }
  }
});

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseUnorderedList_vue__ = __webpack_require__(174);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4e0e40c0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseUnorderedList_vue__ = __webpack_require__(469);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseUnorderedList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4e0e40c0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseUnorderedList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseUnorderedList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e0e40c0", Component.options)
  } else {
    hotAPI.reload("data-v-4e0e40c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    items: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    }
  }
});

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    autoplay: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    file: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    video: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    loadImmediately: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    loop: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    muted: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    playsinline: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    posterUrl: {
      type: String,
      default: function _default() {
        return 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0wIDBoMXYxaC0xeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==';
      }
    },
    url: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    urlMobile: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  data: function data() {
    return {
      loading: true
    };
  },
  computed: {
    autoDetect: function autoDetect() {
      return this.baseFile.length > 0;
    },
    baseFile: function baseFile() {
      return this.file.replace(/\.[^/.]+$/, '');
    },
    hasUrl: function hasUrl() {
      return this.url && this.url.length > 0;
    },
    isLoaded: function isLoaded() {
      return !this.loading;
    },
    mp4Url: function mp4Url() {
      if (this.hasUrl) {
        return '';
      }

      return this.autoDetect ? "".concat(this.baseFile, ".mp4") : this.video.mp4;
    },
    placeholderPoster: function placeholderPoster() {
      return 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0wIDBoMXYxaC0xeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==';
    },
    webmUrl: function webmUrl() {
      if (this.hasUrl) {
        return '';
      }

      return this.autoDetect ? "".concat(this.baseFile, ".webm") : this.video.webm;
    }
  },
  activated: function activated() {
    if (window.prerender) {
      return;
    }

    if (this.loadImmediately) {
      this.loadVideo();
      return;
    }

    this.addScene();
  },
  deactivated: function deactivated() {
    if (!this.loading) {
      this.$refs.video.pause();
      this.$refs.video.currentTime = 0;
      return;
    }

    this.destroyScene();
  },
  mounted: function mounted() {
    if (window.prerender) {
      return;
    }

    if (this.loadImmediately) {
      this.loadVideo();
      return;
    }

    this.addScene();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyScene();
  },
  methods: {
    addScene: function addScene() {
      var _this = this;

      if (this.loading) {
        var loadScene = new this.$scrollMagic.Scene({
          offset: -window.innerHeight,
          reverse: false,
          triggerElement: this.$el.parentNode,
          triggerHook: 'onEnter'
        }).on('enter', function () {
          _this.loadVideo();

          _this.$scrollActions.$emit('destroyScene', "video-".concat(_this._uid));
        });
        this.$scrollActions.$emit('addScene', "video-".concat(this._uid), loadScene);
        return;
      }

      this.$refs.video.play();
    },
    destroyScene: function destroyScene() {
      this.$scrollActions.$emit('destroyScene', "video-".concat(this._uid));
    },
    loadVideo: function loadVideo() {
      var _this2 = this;

      if (this.loading) {
        this.$refs.video.poster = this.$refs.video.dataset.poster;
        var sources = this.$refs.video.getElementsByTagName('source');
        Array.from(sources).forEach(function (source) {
          source.src = source.dataset.src;
        });
        setTimeout(function () {
          _this2.$refs.video.load();

          window.objectFitPolyfill();
        }, 50);
        this.loading = false;
        return;
      }

      this.$refs.video.play();
    }
  }
});

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_data__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doe_DoeColumn_vue__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doe_DoeColumns_vue__ = __webpack_require__(476);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeColumn: __WEBPACK_IMPORTED_MODULE_1__doe_DoeColumn_vue__["a" /* default */],
    DoeColumns: __WEBPACK_IMPORTED_MODULE_2__doe_DoeColumns_vue__["a" /* default */]
  },
  props: {
    address: {
      type: Object,
      default: function _default() {
        return {
          country: 'United States'
        };
      }
    },
    prepend: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  computed: {
    fieldNames: function fieldNames() {
      return {
        address1: "".concat(this.getPrependText, "address1"),
        address2: "".concat(this.getPrependText, "address2"),
        city: "".concat(this.getPrependText, "city"),
        state: "".concat(this.getPrependText).concat(this.stateField),
        postalCode: "".concat(this.getPrependText, "postal_code")
      };
    },
    getPrependText: function getPrependText() {
      return this.prepend !== '' ? "".concat(this.prepend, "_") : '';
    },
    inCanada: function inCanada() {
      return this.address.country === 'Canada';
    },
    postalCodeFormat: function postalCodeFormat() {
      return this.inCanada ? '### ###' : '#####';
    },
    postalCodeMask: function postalCodeMask() {
      return this.inCanada ? 'A#A #A#' : '#####-####';
    },
    postalCodePlaceholder: function postalCodePlaceholder() {
      return this.inCanada ? 'A1A 1A1' : '12345-6789';
    },
    stateLabel: function stateLabel() {
      return this.inCanada ? 'Province/Territory*' : 'State*';
    },
    stateField: function stateField() {
      return this.inCanada ? 'province' : 'state';
    },
    stateOptions: function stateOptions() {
      return this.inCanada ? __WEBPACK_IMPORTED_MODULE_0__core_data__["b" /* provinces */] : __WEBPACK_IMPORTED_MODULE_0__core_data__["c" /* states */];
    }
  }
});

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    size: {
      type: String,
      default: function _default() {
        return 'auto';
      }
    }
  },
  computed: {
    classNames: function classNames() {
      return ['column', "column-".concat(this.size)];
    }
  }
});

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    animateIn: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    },
    isCentered: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isReversed: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isGapless: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  computed: {
    styleModifiers: function styleModifiers() {
      return {
        columns: true,
        'is-reverse': this.isReversed,
        'is-gapless': this.isGapless,
        'is-centered': this.isCentered
      };
    }
  },
  mounted: function mounted() {
    if (this.animateIn) {
      this.addScene();
    }
  },
  activated: function activated() {
    if (this.animateIn) {
      this.addScene();
    }
  },
  deactivated: function deactivated() {
    this.destroyScene();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyScene();
  },
  methods: {
    addScene: function addScene() {
      var timeline = new this.$gsapTimelineMax(); // NOTE: IE11 can't handle forEach over a nodeList, so convert to an array first

      Array.from(this.$el.querySelectorAll('.column')).forEach(function (column) {
        var elements = column.children;
        timeline.staggerFromTo(elements, 1.25, {
          y: '15%',
          opacity: 0
        }, {
          y: '0%',
          opacity: 1
        }, 0.25, 0);
      });
      var scene = new this.$scrollMagic.Scene({
        reverse: false,
        triggerElement: this.$el,
        triggerHook: 'onEnter'
      }).setTween(timeline);
      this.$scrollActions.$emit('addScene', "columns-".concat(this._uid), scene);
    },
    destroyScene: function destroyScene() {
      this.$scrollActions.$emit('destroyScene', "columns-".concat(this._uid));
    }
  }
});

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_mixins__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_BaseBlockquote_vue__ = __webpack_require__(150);
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    BaseBlockquote: __WEBPACK_IMPORTED_MODULE_1__base_BaseBlockquote_vue__["default"]
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_mixins__["b" /* styleProps */]],
  props: {
    content: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    cite: {
      type: Object,
      default: function _default() {
        return {
          content: '',
          title: ''
        };
      }
    }
  },
  computed: {
    blockquoteModifiers: function blockquoteModifiers() {
      return {
        blockquote: true
      };
    }
  }
});

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  inheritAttrs: false,
  props: {
    options: {
      type: Object,
      default: function _default() {
        return {
          wrapperClasses: '',
          name: '',
          label: '',
          hasIcon: false,
          iconClass: '',
          hasHelper: false,
          helperText: '',
          disabled: false,
          required: false,
          validated: false
        };
      }
    }
  }
});

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_inputs__ = __webpack_require__(48);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_inputs__["b" /* inputProps */]]
});

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_mixins__ = __webpack_require__(37);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_mixins__["b" /* styleProps */]],
  props: {
    disabled: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    href: {
      type: String,
      required: false,
      default: function _default() {
        return '#';
      }
    },
    text: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    icon: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    isAbstract: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isAnchor: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isBlended: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isButton: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isIconOnly: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isIconRight: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isSubmit: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    },
    isTransparent: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isExtraSmall: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isFullWidth: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isSmall: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isMedium: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isLarge: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isExtraLarge: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    newWindow: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    skipRouter: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      timeline: null
    };
  },
  computed: {
    linkModifiers: function linkModifiers() {
      return {
        button: !this.isAnchor,
        'is-abstract': this.isAbstract,
        'is-blended': this.isBlended,
        'is-full-width': this.isFullWidth,
        'is-icon-only': this.isIconOnly,
        'is-icon-right': this.isIconRight,
        'is-transparent': this.isTransparent,
        'is-xsmall': this.isExtraSmall,
        'is-small': this.isSmall,
        'is-medium': this.isMedium,
        'is-large': this.isLarge,
        'is-xlarge': this.isExtraLarge
      };
    },
    containerClassname: function containerClassname() {
      return "button-".concat(this._uid);
    },
    shouldUseRouterLink: function shouldUseRouterLink() {
      if (this.skipRouter) {
        return false;
      } // only use router-link for relative URLs


      return this.href.startsWith('/');
    }
  },
  mounted: function mounted() {// this.timeline = new this.$gsapTimelineMax({ paused: true });
    // this.timeline.add(this.$gsapTweenMax.to(`.${this.containerClassname} .wax-button-background`, 0.01, { opacity: 1 }), 0);
    // this.timeline.add(this.$gsapTweenMax.from(`.${this.containerClassname} .wax-button-background`, 0.7, { y: -60 }), 0);
    // this.timeline.add(this.$gsapTweenMax.to(`.${this.containerClassname} .wax-button-path-in`, 0.7, { morphSVG: { shape: `.${this.containerClassname} .wax-button-full` }, shapeIndex: 1, ease: this.$gsapEases.Linear.easeNone }), 0);
  },
  methods: {
    handleMouseenter: function handleMouseenter() {// this.timeline.isActive() ? this.timeline.restart() : this.timeline.play();
    },
    handleMouseout: function handleMouseout() {// this.timeline.reverse();
    }
  }
});

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_mixins__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_BaseOrderedList_vue__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_BaseUnorderedList_vue__ = __webpack_require__(173);
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    BaseOrderedList: __WEBPACK_IMPORTED_MODULE_1__base_BaseOrderedList_vue__["default"],
    BaseUnorderedList: __WEBPACK_IMPORTED_MODULE_2__base_BaseUnorderedList_vue__["default"]
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_mixins__["b" /* styleProps */]],
  props: {
    items: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    },
    isOrdered: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isInline: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  computed: {
    listModifiers: function listModifiers() {
      return {
        list: true,
        'is-inline': this.isInline
      };
    }
  }
});

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_The404Page_vue__ = __webpack_require__(123);
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    The404Page: __WEBPACK_IMPORTED_MODULE_0__pages_The404Page_vue__["a" /* default */]
  },
  props: {
    status: {
      type: Object,
      required: true
    }
  },
  computed: {
    show404Page: function show404Page() {
      return this.status.hasError && this.status.code === 404;
    }
  }
});

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_mixins__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doe_DoeContent_vue__ = __webpack_require__(36);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    DoeContent: __WEBPACK_IMPORTED_MODULE_1__doe_DoeContent_vue__["a" /* default */]
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_mixins__["b" /* styleProps */]],
  props: {
    content: {
      type: Object,
      required: true
    },
    cancel: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    accept: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    hasClose: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isActive: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    }
  },
  data: function data() {
    return {
      active: this.isActive
    };
  },
  computed: {
    notificationModifiers: function notificationModifiers() {
      return {
        'has-close': this.hasClose
      };
    }
  },
  methods: {
    closeNotification: function closeNotification() {
      this.active = !this.active;
      this.$emit('close');
    },
    confirmNotification: function confirmNotification() {
      this.active = !this.active;
      this.$emit('accept');
    }
  }
});

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_BaseRadio__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utilities__ = __webpack_require__(60);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    BaseRadio: __WEBPACK_IMPORTED_MODULE_0__base_BaseRadio__["default"]
  },
  props: {
    text: {
      type: String,
      required: true,
      default: function _default() {
        return 'Radio';
      }
    },
    id: {
      type: String,
      default: function _default() {
        return "radio-".concat(Object(__WEBPACK_IMPORTED_MODULE_1__core_utilities__["a" /* randomId */])());
      }
    },
    value: {
      type: [String, Number, Boolean],
      default: function _default() {
        return null;
      }
    },
    name: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    required: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    checked: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  computed: {
    radioModifiers: function radioModifiers() {
      return {
        radio: true,
        'is-disabled': this.disabled
      };
    }
  }
});

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utilities__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_BaseCheckbox_vue__ = __webpack_require__(153);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    BaseCheckbox: __WEBPACK_IMPORTED_MODULE_1__base_BaseCheckbox_vue__["default"]
  },
  props: {
    isToggle: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    text: {
      type: String,
      required: true,
      default: function _default() {
        return 'Checkbox';
      }
    },
    id: {
      type: String,
      default: function _default() {
        return "checkbox-".concat(Object(__WEBPACK_IMPORTED_MODULE_0__core_utilities__["a" /* randomId */])());
      }
    },
    value: {
      type: [String, Number, Boolean],
      default: function _default() {
        return null;
      }
    },
    name: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    required: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    checked: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  computed: {
    switchModifiers: function switchModifiers() {
      return {
        toggle: this.isToggle,
        checkbox: !this.isToggle,
        'is-disabled': this.disabled
      };
    }
  }
});

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  inheritAttrs: false,
  props: {
    options: {
      type: Object,
      default: function _default() {
        return {
          wrapperClasses: {},
          name: '',
          label: '',
          hasIcon: false,
          iconClass: '',
          hasHelper: false,
          helperText: '',
          disabled: false,
          required: false,
          validated: false,
          link: {
            name: '',
            url: ''
          }
        };
      }
    }
  },
  computed: {
    isToggle: function isToggle() {
      return this.options.wrapperClasses.toggle === 'true';
    },
    hasLink: function hasLink() {
      // TODO: add a true toggle / functionality
      return false;
    }
  }
});

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_mixins__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_BaseTable_vue__ = __webpack_require__(170);
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    BaseTable: __WEBPACK_IMPORTED_MODULE_1__base_BaseTable_vue__["default"]
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_0__core_mixins__["c" /* tableProps */]],
  props: {
    isNarrow: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isFullWidth: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  computed: {
    classNames: function classNames() {
      var classNames = ['table'];

      if (this.isNarrow) {
        classNames.push('is-narrow');
      } else if (this.isFullWidth) {
        classNames.push('is-fullwidth');
      }

      return classNames;
    }
  }
});

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    dimensions: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    file: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    loadImmediately: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    posterUrl: {
      type: String,
      default: function _default() {
        return 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0wIDBoMXYxaC0xeiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==';
      }
    },
    shouldHavePadding: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    video: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    url: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    urlMobile: {
      type: String,
      default: function _default() {
        return '';
      }
    }
  },
  computed: {
    autoDetect: function autoDetect() {
      return this.baseFile.length > 0;
    },
    baseFile: function baseFile() {
      return this.file.replace(/\.[^/.]+$/, '');
    },
    computedPosterUrl: function computedPosterUrl() {
      if (this.hasUrl) {
        return this.posterUrl;
      }

      return this.autoDetect ? "".concat(this.baseFile, ".jpg") : this.video.poster;
    },
    hasUrl: function hasUrl() {
      return this.url && this.url.length > 0;
    },
    paddingTop: function paddingTop() {
      if (!this.shouldHavePadding || Object.keys(this.dimensions).length === 0) {
        return null;
      }

      return "".concat(this.dimensions.height / this.dimensions.width * 100, "%");
    },
    style: function style() {
      return {
        paddingTop: this.paddingTop
      };
    }
  }
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(192);
module.exports = __webpack_require__(193);


/***/ }),
/* 192 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es6_array_copy_within__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es6_array_copy_within___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_modules_es6_array_copy_within__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es6_array_fill__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es6_array_fill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_modules_es6_array_fill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es6_array_find__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es6_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_modules_es6_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es6_array_find_index__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es6_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_modules_es6_array_find_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es6_array_from__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es6_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_modules_es6_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es7_array_includes__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es7_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_modules_es7_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es6_array_iterator__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es6_array_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_modules_es6_array_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es6_array_of__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es6_array_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_modules_es6_array_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es6_array_sort__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es6_array_sort___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_modules_es6_array_sort__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_es6_array_species__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_es6_array_species___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_modules_es6_array_species__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_modules_es6_date_to_json__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_modules_es6_date_to_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_modules_es6_date_to_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_modules_es6_date_to_primitive__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_modules_es6_date_to_primitive___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_modules_es6_date_to_primitive__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_modules_es6_function_has_instance__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_modules_es6_function_has_instance___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_modules_es6_function_has_instance__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_modules_es6_function_name__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_modules_es6_function_name___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_modules_es6_function_name__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_modules_es6_map__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_modules_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_modules_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_modules_es6_math_acosh__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_core_js_modules_es6_math_acosh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_core_js_modules_es6_math_acosh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_core_js_modules_es6_math_asinh__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_core_js_modules_es6_math_asinh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_core_js_modules_es6_math_asinh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_core_js_modules_es6_math_atanh__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_core_js_modules_es6_math_atanh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_core_js_modules_es6_math_atanh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_core_js_modules_es6_math_cbrt__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_core_js_modules_es6_math_cbrt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_core_js_modules_es6_math_cbrt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_core_js_modules_es6_math_clz32__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_core_js_modules_es6_math_clz32___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_core_js_modules_es6_math_clz32__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_core_js_modules_es6_math_cosh__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_core_js_modules_es6_math_cosh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_core_js_modules_es6_math_cosh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_core_js_modules_es6_math_expm1__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_core_js_modules_es6_math_expm1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_core_js_modules_es6_math_expm1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_core_js_modules_es6_math_fround__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_core_js_modules_es6_math_fround___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_core_js_modules_es6_math_fround__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_core_js_modules_es6_math_hypot__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_core_js_modules_es6_math_hypot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_core_js_modules_es6_math_hypot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_core_js_modules_es6_math_imul__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_core_js_modules_es6_math_imul___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_core_js_modules_es6_math_imul__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_core_js_modules_es6_math_log1p__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_core_js_modules_es6_math_log1p___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_core_js_modules_es6_math_log1p__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_core_js_modules_es6_math_log10__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_core_js_modules_es6_math_log10___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_core_js_modules_es6_math_log10__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_core_js_modules_es6_math_log2__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_core_js_modules_es6_math_log2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_core_js_modules_es6_math_log2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_core_js_modules_es6_math_sign__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_core_js_modules_es6_math_sign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_core_js_modules_es6_math_sign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_core_js_modules_es6_math_sinh__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_core_js_modules_es6_math_sinh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29_core_js_modules_es6_math_sinh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_core_js_modules_es6_math_tanh__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_core_js_modules_es6_math_tanh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30_core_js_modules_es6_math_tanh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_core_js_modules_es6_math_trunc__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_core_js_modules_es6_math_trunc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_31_core_js_modules_es6_math_trunc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_core_js_modules_es6_number_constructor__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_core_js_modules_es6_number_constructor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_32_core_js_modules_es6_number_constructor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_core_js_modules_es6_number_epsilon__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_core_js_modules_es6_number_epsilon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33_core_js_modules_es6_number_epsilon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_core_js_modules_es6_number_is_finite__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_core_js_modules_es6_number_is_finite___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_34_core_js_modules_es6_number_is_finite__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_core_js_modules_es6_number_is_integer__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_core_js_modules_es6_number_is_integer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35_core_js_modules_es6_number_is_integer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_core_js_modules_es6_number_is_nan__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_core_js_modules_es6_number_is_nan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36_core_js_modules_es6_number_is_nan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_core_js_modules_es6_number_is_safe_integer__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_core_js_modules_es6_number_is_safe_integer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_37_core_js_modules_es6_number_is_safe_integer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_core_js_modules_es6_number_max_safe_integer__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_core_js_modules_es6_number_max_safe_integer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_38_core_js_modules_es6_number_max_safe_integer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_core_js_modules_es6_number_min_safe_integer__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_core_js_modules_es6_number_min_safe_integer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_39_core_js_modules_es6_number_min_safe_integer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_core_js_modules_es6_number_parse_float__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_core_js_modules_es6_number_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_40_core_js_modules_es6_number_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_core_js_modules_es6_number_parse_int__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_core_js_modules_es6_number_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_41_core_js_modules_es6_number_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_core_js_modules_es6_object_assign__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_core_js_modules_es6_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_42_core_js_modules_es6_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_core_js_modules_es7_object_define_getter__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_core_js_modules_es7_object_define_getter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_43_core_js_modules_es7_object_define_getter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_core_js_modules_es7_object_define_setter__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_core_js_modules_es7_object_define_setter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_44_core_js_modules_es7_object_define_setter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_core_js_modules_es7_object_entries__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_core_js_modules_es7_object_entries___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_45_core_js_modules_es7_object_entries__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_core_js_modules_es6_object_freeze__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_core_js_modules_es6_object_freeze___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_46_core_js_modules_es6_object_freeze__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_core_js_modules_es6_object_get_own_property_descriptor__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_core_js_modules_es6_object_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_47_core_js_modules_es6_object_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_core_js_modules_es7_object_get_own_property_descriptors__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_core_js_modules_es7_object_get_own_property_descriptors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_48_core_js_modules_es7_object_get_own_property_descriptors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_core_js_modules_es6_object_get_own_property_names__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_core_js_modules_es6_object_get_own_property_names___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_49_core_js_modules_es6_object_get_own_property_names__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_core_js_modules_es6_object_get_prototype_of__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_core_js_modules_es6_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_50_core_js_modules_es6_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51_core_js_modules_es7_object_lookup_getter__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51_core_js_modules_es7_object_lookup_getter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_51_core_js_modules_es7_object_lookup_getter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52_core_js_modules_es7_object_lookup_setter__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52_core_js_modules_es7_object_lookup_setter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_52_core_js_modules_es7_object_lookup_setter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_core_js_modules_es6_object_prevent_extensions__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_core_js_modules_es6_object_prevent_extensions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_53_core_js_modules_es6_object_prevent_extensions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_core_js_modules_es6_object_is__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_core_js_modules_es6_object_is___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_54_core_js_modules_es6_object_is__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_core_js_modules_es6_object_is_frozen__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_core_js_modules_es6_object_is_frozen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_55_core_js_modules_es6_object_is_frozen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56_core_js_modules_es6_object_is_sealed__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56_core_js_modules_es6_object_is_sealed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_56_core_js_modules_es6_object_is_sealed__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57_core_js_modules_es6_object_is_extensible__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57_core_js_modules_es6_object_is_extensible___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_57_core_js_modules_es6_object_is_extensible__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58_core_js_modules_es6_object_keys__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58_core_js_modules_es6_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_58_core_js_modules_es6_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59_core_js_modules_es6_object_seal__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59_core_js_modules_es6_object_seal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_59_core_js_modules_es6_object_seal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60_core_js_modules_es6_object_set_prototype_of__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60_core_js_modules_es6_object_set_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_60_core_js_modules_es6_object_set_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61_core_js_modules_es7_object_values__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61_core_js_modules_es7_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_61_core_js_modules_es7_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62_core_js_modules_es6_promise__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62_core_js_modules_es6_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_62_core_js_modules_es6_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63_core_js_modules_es7_promise_finally__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63_core_js_modules_es7_promise_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_63_core_js_modules_es7_promise_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64_core_js_modules_es6_reflect_apply__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64_core_js_modules_es6_reflect_apply___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_64_core_js_modules_es6_reflect_apply__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65_core_js_modules_es6_reflect_construct__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65_core_js_modules_es6_reflect_construct___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_65_core_js_modules_es6_reflect_construct__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66_core_js_modules_es6_reflect_define_property__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66_core_js_modules_es6_reflect_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_66_core_js_modules_es6_reflect_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67_core_js_modules_es6_reflect_delete_property__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67_core_js_modules_es6_reflect_delete_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_67_core_js_modules_es6_reflect_delete_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68_core_js_modules_es6_reflect_get__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68_core_js_modules_es6_reflect_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_68_core_js_modules_es6_reflect_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69_core_js_modules_es6_reflect_get_own_property_descriptor__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69_core_js_modules_es6_reflect_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_69_core_js_modules_es6_reflect_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70_core_js_modules_es6_reflect_get_prototype_of__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70_core_js_modules_es6_reflect_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_70_core_js_modules_es6_reflect_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71_core_js_modules_es6_reflect_has__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71_core_js_modules_es6_reflect_has___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_71_core_js_modules_es6_reflect_has__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72_core_js_modules_es6_reflect_is_extensible__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72_core_js_modules_es6_reflect_is_extensible___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_72_core_js_modules_es6_reflect_is_extensible__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73_core_js_modules_es6_reflect_own_keys__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73_core_js_modules_es6_reflect_own_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_73_core_js_modules_es6_reflect_own_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74_core_js_modules_es6_reflect_prevent_extensions__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74_core_js_modules_es6_reflect_prevent_extensions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_74_core_js_modules_es6_reflect_prevent_extensions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75_core_js_modules_es6_reflect_set__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75_core_js_modules_es6_reflect_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_75_core_js_modules_es6_reflect_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76_core_js_modules_es6_reflect_set_prototype_of__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76_core_js_modules_es6_reflect_set_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_76_core_js_modules_es6_reflect_set_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77_core_js_modules_es6_regexp_constructor__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77_core_js_modules_es6_regexp_constructor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_77_core_js_modules_es6_regexp_constructor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78_core_js_modules_es6_regexp_flags__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78_core_js_modules_es6_regexp_flags___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_78_core_js_modules_es6_regexp_flags__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79_core_js_modules_es6_regexp_match__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79_core_js_modules_es6_regexp_match___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_79_core_js_modules_es6_regexp_match__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80_core_js_modules_es6_regexp_replace__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80_core_js_modules_es6_regexp_replace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_80_core_js_modules_es6_regexp_replace__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81_core_js_modules_es6_regexp_split__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81_core_js_modules_es6_regexp_split___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_81_core_js_modules_es6_regexp_split__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82_core_js_modules_es6_regexp_search__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82_core_js_modules_es6_regexp_search___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_82_core_js_modules_es6_regexp_search__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83_core_js_modules_es6_regexp_to_string__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83_core_js_modules_es6_regexp_to_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_83_core_js_modules_es6_regexp_to_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84_core_js_modules_es6_set__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84_core_js_modules_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_84_core_js_modules_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85_core_js_modules_es6_symbol__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85_core_js_modules_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_85_core_js_modules_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86_core_js_modules_es7_symbol_async_iterator__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86_core_js_modules_es7_symbol_async_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_86_core_js_modules_es7_symbol_async_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87_core_js_modules_es6_string_anchor__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87_core_js_modules_es6_string_anchor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_87_core_js_modules_es6_string_anchor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88_core_js_modules_es6_string_big__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88_core_js_modules_es6_string_big___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_88_core_js_modules_es6_string_big__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89_core_js_modules_es6_string_blink__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89_core_js_modules_es6_string_blink___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_89_core_js_modules_es6_string_blink__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_90_core_js_modules_es6_string_bold__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_90_core_js_modules_es6_string_bold___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_90_core_js_modules_es6_string_bold__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_91_core_js_modules_es6_string_code_point_at__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_91_core_js_modules_es6_string_code_point_at___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_91_core_js_modules_es6_string_code_point_at__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_92_core_js_modules_es6_string_ends_with__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_92_core_js_modules_es6_string_ends_with___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_92_core_js_modules_es6_string_ends_with__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_93_core_js_modules_es6_string_fixed__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_93_core_js_modules_es6_string_fixed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_93_core_js_modules_es6_string_fixed__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_94_core_js_modules_es6_string_fontcolor__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_94_core_js_modules_es6_string_fontcolor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_94_core_js_modules_es6_string_fontcolor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_95_core_js_modules_es6_string_fontsize__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_95_core_js_modules_es6_string_fontsize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_95_core_js_modules_es6_string_fontsize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_96_core_js_modules_es6_string_from_code_point__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_96_core_js_modules_es6_string_from_code_point___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_96_core_js_modules_es6_string_from_code_point__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97_core_js_modules_es6_string_includes__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97_core_js_modules_es6_string_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_97_core_js_modules_es6_string_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98_core_js_modules_es6_string_italics__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98_core_js_modules_es6_string_italics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_98_core_js_modules_es6_string_italics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99_core_js_modules_es6_string_iterator__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99_core_js_modules_es6_string_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_99_core_js_modules_es6_string_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_100_core_js_modules_es6_string_link__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_100_core_js_modules_es6_string_link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_100_core_js_modules_es6_string_link__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_101_core_js_modules_es7_string_pad_start__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_101_core_js_modules_es7_string_pad_start___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_101_core_js_modules_es7_string_pad_start__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_102_core_js_modules_es7_string_pad_end__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_102_core_js_modules_es7_string_pad_end___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_102_core_js_modules_es7_string_pad_end__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_103_core_js_modules_es6_string_raw__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_103_core_js_modules_es6_string_raw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_103_core_js_modules_es6_string_raw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_104_core_js_modules_es6_string_repeat__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_104_core_js_modules_es6_string_repeat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_104_core_js_modules_es6_string_repeat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_105_core_js_modules_es6_string_small__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_105_core_js_modules_es6_string_small___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_105_core_js_modules_es6_string_small__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_106_core_js_modules_es6_string_starts_with__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_106_core_js_modules_es6_string_starts_with___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_106_core_js_modules_es6_string_starts_with__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_107_core_js_modules_es6_string_strike__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_107_core_js_modules_es6_string_strike___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_107_core_js_modules_es6_string_strike__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_108_core_js_modules_es6_string_sub__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_108_core_js_modules_es6_string_sub___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_108_core_js_modules_es6_string_sub__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_109_core_js_modules_es6_string_sup__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_109_core_js_modules_es6_string_sup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_109_core_js_modules_es6_string_sup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_110_core_js_modules_es6_typed_array_buffer__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_110_core_js_modules_es6_typed_array_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_110_core_js_modules_es6_typed_array_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_111_core_js_modules_es6_typed_int8_array__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_111_core_js_modules_es6_typed_int8_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_111_core_js_modules_es6_typed_int8_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_112_core_js_modules_es6_typed_uint8_array__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_112_core_js_modules_es6_typed_uint8_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_112_core_js_modules_es6_typed_uint8_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_113_core_js_modules_es6_typed_uint8_clamped_array__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_113_core_js_modules_es6_typed_uint8_clamped_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_113_core_js_modules_es6_typed_uint8_clamped_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_114_core_js_modules_es6_typed_int16_array__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_114_core_js_modules_es6_typed_int16_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_114_core_js_modules_es6_typed_int16_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_115_core_js_modules_es6_typed_uint16_array__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_115_core_js_modules_es6_typed_uint16_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_115_core_js_modules_es6_typed_uint16_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_116_core_js_modules_es6_typed_int32_array__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_116_core_js_modules_es6_typed_int32_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_116_core_js_modules_es6_typed_int32_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_117_core_js_modules_es6_typed_uint32_array__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_117_core_js_modules_es6_typed_uint32_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_117_core_js_modules_es6_typed_uint32_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_118_core_js_modules_es6_typed_float32_array__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_118_core_js_modules_es6_typed_float32_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_118_core_js_modules_es6_typed_float32_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_119_core_js_modules_es6_typed_float64_array__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_119_core_js_modules_es6_typed_float64_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_119_core_js_modules_es6_typed_float64_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_120_core_js_modules_es6_weak_map__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_120_core_js_modules_es6_weak_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_120_core_js_modules_es6_weak_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_121_core_js_modules_es6_weak_set__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_121_core_js_modules_es6_weak_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_121_core_js_modules_es6_weak_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_122_core_js_modules_web_timers__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_122_core_js_modules_web_timers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_122_core_js_modules_web_timers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_123_core_js_modules_web_immediate__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_123_core_js_modules_web_immediate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_123_core_js_modules_web_immediate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_124_core_js_modules_web_dom_iterable__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_124_core_js_modules_web_dom_iterable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_124_core_js_modules_web_dom_iterable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_125_regenerator_runtime_runtime__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_125_regenerator_runtime_runtime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_125_regenerator_runtime_runtime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_126_axios__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_126_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_126_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_127_portal_vue__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_127_portal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_127_portal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_128_vue__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_129_vue_cookies__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_129_vue_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_129_vue_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_130_vue_router__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_131_detect_browser__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_131_detect_browser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_131_detect_browser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_132_objectFitPolyfill__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_132_objectFitPolyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_132_objectFitPolyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_133__core_api__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_134__core_event_bus__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_135__core_gsap_plugin__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_136__core_gtm_plugin__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_137__core_routes__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_138__App_vue__ = __webpack_require__(404);











































































































































__WEBPACK_IMPORTED_MODULE_128_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_135__core_gsap_plugin__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_128_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_136__core_gtm_plugin__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_128_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_127_portal_vue___default.a);
__WEBPACK_IMPORTED_MODULE_128_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_129_vue_cookies___default.a);
__WEBPACK_IMPORTED_MODULE_128_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_130_vue_router__["a" /* default */]); // Detect and set browser
// {
//   name,
//   version,
//   os
// }

var browser = Object(__WEBPACK_IMPORTED_MODULE_131_detect_browser__["detect"])();
__WEBPACK_IMPORTED_MODULE_128_vue__["default"].prototype.$browser = browser; // Set axios default headers
// Axios is the HTTP request library

__WEBPACK_IMPORTED_MODULE_128_vue__["default"].prototype.$axios = __WEBPACK_IMPORTED_MODULE_126_axios___default.a.create();
__WEBPACK_IMPORTED_MODULE_128_vue__["default"].prototype.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; // Set api endpoints for later use

__WEBPACK_IMPORTED_MODULE_128_vue__["default"].prototype.$api = __WEBPACK_IMPORTED_MODULE_133__core_api__["a" /* default */]; // Set event bus

__WEBPACK_IMPORTED_MODULE_128_vue__["default"].prototype.$eventBus = __WEBPACK_IMPORTED_MODULE_134__core_event_bus__["a" /* default */]; // Register Base Components
// https://webpack.js.org/guides/dependency-management/#require-context

var requireBaseComponent = __webpack_require__(433);

requireBaseComponent.keys().forEach(function (fileName) {
  // Get the component config
  var componentConfig = requireBaseComponent(fileName); // Remove the . and leading back slash
  // Remove the .vue file extension

  var componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''); // Globally register the component

  __WEBPACK_IMPORTED_MODULE_128_vue__["default"].component(componentName, componentConfig.default || componentConfig);
}); // Register Element Components
// https://webpack.js.org/guides/dependency-management/#require-context

var requireElementComponent = __webpack_require__(472);

requireElementComponent.keys().forEach(function (fileName) {
  // Get the component config
  var componentConfig = requireElementComponent(fileName); // Remove the . and leading back slash
  // Remove the .vue file extension

  var componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''); // Globally register the component

  __WEBPACK_IMPORTED_MODULE_128_vue__["default"].component(componentName, componentConfig.default || componentConfig);
});

var scrollBehavior = function scrollBehavior(to, from, savedPosition) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (savedPosition) {
        resolve(savedPosition);
      } else {
        resolve({
          x: 0,
          y: 0
        });
      }
    }, 500);
  });
};

var router = new __WEBPACK_IMPORTED_MODULE_130_vue_router__["a" /* default */]({
  mode: 'history',
  routes: __WEBPACK_IMPORTED_MODULE_137__core_routes__["a" /* default */],
  scrollBehavior: scrollBehavior
});
var app = new __WEBPACK_IMPORTED_MODULE_128_vue__["default"]({
  router: router,
  components: {
    App: __WEBPACK_IMPORTED_MODULE_138__App_vue__["a" /* default */]
  },
  template: '<App />'
});
document.addEventListener('DOMContentLoaded', function () {
  app.$mount('#app');
  router.beforeEach(function (to, from, next) {
    // TODO: if story is handled the same, remove the path condition
    if (from.meta && from.meta.skipLoading) {
      setTimeout(function () {
        next();
      }, 400);
      return;
    }

    __WEBPACK_IMPORTED_MODULE_128_vue__["default"].prototype.$eventBus.$emit('page-loading');
    setTimeout(function () {
      next();
    }, 400);
  }); // Add service worker if on production and browser supports it
  // NOTE: if you want to test in dev or staging, change the hostname condition
  // TODO: set hostname

  if ('serviceWorker' in navigator && window.location.hostname === 'https://www.legent.com') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
});

/***/ }),
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var api = {
  app: '/api/v1/app',
  forms: {},
  pages: {}
};
/* harmony default export */ __webpack_exports__["a"] = (api);

/***/ }),
/* 359 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(87);

var eventBus = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]();
/* harmony default export */ __webpack_exports__["a"] = (eventBus);

/***/ }),
/* 360 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gsap_TweenMax__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_scrollmagic__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_scrollmagic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_scrollmagic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gsap_MorphSVGPlugin__ = __webpack_require__(371);




__webpack_require__(372);

var GsapPlugin = {
  install: function install(Vue) {
    Vue.prototype.$gsapTimelineMax = __WEBPACK_IMPORTED_MODULE_0_gsap_TweenMax__["d" /* TimelineMax */];
    Vue.prototype.$gsapTweenMax = __WEBPACK_IMPORTED_MODULE_0_gsap_TweenMax__["e" /* TweenMax */];
    Vue.prototype.$scrollMagic = __WEBPACK_IMPORTED_MODULE_1_scrollmagic___default.a;
    Vue.prototype.$gsapEases = {
      Bounce: __WEBPACK_IMPORTED_MODULE_0_gsap_TweenMax__["a" /* Bounce */],
      Power0: __WEBPACK_IMPORTED_MODULE_0_gsap_TweenMax__["c" /* Power0 */],
      Linear: __WEBPACK_IMPORTED_MODULE_0_gsap_TweenMax__["b" /* Linear */]
    };
    Vue.prototype.$scrollActions = new Vue({
      data: function data() {
        return {
          controller: null,
          scenes: {}
        };
      },
      created: function created() {
        var vm = this;
        vm.$on('addScene', function (name, scene) {
          Vue.nextTick(function () {
            if (vm.controller === null) {
              vm.controller = new vm.$scrollMagic.Controller({
                loglevel: 0,
                refreshInterval: 0
              });
            } // set loglevel to no logging


            scene.loglevel = 0;

            if (!vm.scenes[name]) {
              vm.scenes[name] = scene;
              vm.scenes[name].addTo(vm.controller);
            }
          });
        });
        vm.$on('destroyScene', function (name) {
          if (vm.scenes[name]) {
            vm.scenes[name].destroy(true);
            delete vm.scenes[name];
          }
        });
        vm.$on('destroy', function () {
          vm.controller.destroy(true);
          vm.controller = null;
          vm.scenes = {};
        });
      }
    });
  }
};
/* harmony default export */ __webpack_exports__["a"] = (GsapPlugin);

/***/ }),
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MorphSVGPlugin */
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gsap_TweenLite_js__ = __webpack_require__(17);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * VERSION: 0.8.11
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * MorphSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */


var _DEG2RAD = Math.PI / 180,
    _RAD2DEG = 180 / Math.PI,
    _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/gi,
    _commands = /[achlmqstvz]/ig,
    _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
    //_attrExp = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gi, //finds all the attribute name/value pairs in an HTML element
//_outerTagExp = /^<([A-Za-z0-9_\-]+)((?:\s+[A-Za-z0-9_\-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i, //takes the outerHTML and pulls out [0] - the first tag, [1] - the tag name, and [2] - the attribute name/value pairs (space-delimited)
//_wrappingQuotesExp = /^["']|["']$/g,
TweenLite = __WEBPACK_IMPORTED_MODULE_0_gsap_TweenLite_js__["g" /* _gsScope */]._gsDefine.globals.TweenLite,
    //_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
_log = function _log(message) {
  if (__WEBPACK_IMPORTED_MODULE_0_gsap_TweenLite_js__["g" /* _gsScope */].console) {
    console.log(message);
  }
},
    // translates an arc into a normalized array of cubic beziers excluding the starting x/y. The circle the arc follows will be centered at 0,0 and have a radius of 1 (hence normalized). Each bezier covers no more than 90 degrees; the arc will be divided evenly into a maximum of four curves.
_normalizedArcToBeziers = function _normalizedArcToBeziers(angleStart, angleExtent) {
  var segments = Math.ceil(Math.abs(angleExtent) / 90),
      l = 0,
      a = [],
      angleIncrement,
      controlLength,
      angle,
      dx,
      dy,
      i;
  angleStart *= _DEG2RAD;
  angleExtent *= _DEG2RAD;
  angleIncrement = angleExtent / segments;
  controlLength = 4 / 3 * Math.sin(angleIncrement / 2) / (1 + Math.cos(angleIncrement / 2));

  for (i = 0; i < segments; i++) {
    angle = angleStart + i * angleIncrement;
    dx = Math.cos(angle);
    dy = Math.sin(angle);
    a[l++] = dx - controlLength * dy;
    a[l++] = dy + controlLength * dx;
    angle += angleIncrement;
    dx = Math.cos(angle);
    dy = Math.sin(angle);
    a[l++] = dx + controlLength * dy;
    a[l++] = dy - controlLength * dx;
    a[l++] = dx;
    a[l++] = dy;
  }

  return a;
},
    // translates SVG arc data into an array of cubic beziers
_arcToBeziers = function _arcToBeziers(lastX, lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
  if (lastX === x && lastY === y) {
    return;
  }

  rx = Math.abs(rx);
  ry = Math.abs(ry);
  var angleRad = angle % 360 * _DEG2RAD,
      cosAngle = Math.cos(angleRad),
      sinAngle = Math.sin(angleRad),
      dx2 = (lastX - x) / 2,
      dy2 = (lastY - y) / 2,
      x1 = cosAngle * dx2 + sinAngle * dy2,
      y1 = -sinAngle * dx2 + cosAngle * dy2,
      rx_sq = rx * rx,
      ry_sq = ry * ry,
      x1_sq = x1 * x1,
      y1_sq = y1 * y1,
      radiiCheck = x1_sq / rx_sq + y1_sq / ry_sq;

  if (radiiCheck > 1) {
    rx = Math.sqrt(radiiCheck) * rx;
    ry = Math.sqrt(radiiCheck) * ry;
    rx_sq = rx * rx;
    ry_sq = ry * ry;
  }

  var sign = largeArcFlag === sweepFlag ? -1 : 1,
      sq = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);

  if (sq < 0) {
    sq = 0;
  }

  var coef = sign * Math.sqrt(sq),
      cx1 = coef * (rx * y1 / ry),
      cy1 = coef * -(ry * x1 / rx),
      sx2 = (lastX + x) / 2,
      sy2 = (lastY + y) / 2,
      cx = sx2 + (cosAngle * cx1 - sinAngle * cy1),
      cy = sy2 + (sinAngle * cx1 + cosAngle * cy1),
      ux = (x1 - cx1) / rx,
      uy = (y1 - cy1) / ry,
      vx = (-x1 - cx1) / rx,
      vy = (-y1 - cy1) / ry,
      n = Math.sqrt(ux * ux + uy * uy),
      p = ux;
  sign = uy < 0 ? -1 : 1;

  var angleStart = sign * Math.acos(p / n) * _RAD2DEG;

  n = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
  p = ux * vx + uy * vy;
  sign = ux * vy - uy * vx < 0 ? -1 : 1;

  var angleExtent = sign * Math.acos(p / n) * _RAD2DEG;

  if (!sweepFlag && angleExtent > 0) {
    angleExtent -= 360;
  } else if (sweepFlag && angleExtent < 0) {
    angleExtent += 360;
  }

  angleExtent %= 360;
  angleStart %= 360;

  var bezierPoints = _normalizedArcToBeziers(angleStart, angleExtent),
      a = cosAngle * rx,
      b = sinAngle * rx,
      c = sinAngle * -ry,
      d = cosAngle * ry,
      l = bezierPoints.length - 2,
      i,
      px,
      py; //translate all the bezier points according to the matrix...


  for (i = 0; i < l; i += 2) {
    px = bezierPoints[i];
    py = bezierPoints[i + 1];
    bezierPoints[i] = px * a + py * c + cx;
    bezierPoints[i + 1] = px * b + py * d + cy;
  }

  bezierPoints[bezierPoints.length - 2] = x; //always set the end to exactly where it's supposed to be

  bezierPoints[bezierPoints.length - 1] = y;
  return bezierPoints;
},
    //Spits back an array of cubic Bezier segments that use absolute coordinates. Each segment starts with a "moveTo" command (x coordinate, then y) and then 2 control points (x, y, x, y), then anchor. The goal is to minimize memory and maximize speed.
_pathDataToBezier = function _pathDataToBezier(d) {
  var a = (d + "").replace(_scientific, function (m) {
    var n = +m;
    return n < 0.0001 && n > -0.0001 ? 0 : n;
  }).match(_svgPathExp) || [],
      //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
  path = [],
      relativeX = 0,
      relativeY = 0,
      elements = a.length,
      l = 2,
      points = 0,
      i,
      j,
      x,
      y,
      command,
      isRelative,
      segment,
      startX,
      startY,
      difX,
      difY,
      beziers,
      prevCommand;

  if (!d || !isNaN(a[0]) || isNaN(a[1])) {
    _log("ERROR: malformed path data: " + d);

    return path;
  }

  for (i = 0; i < elements; i++) {
    prevCommand = command;

    if (isNaN(a[i])) {
      command = a[i].toUpperCase();
      isRelative = command !== a[i]; //lower case means relative
    } else {
      //commands like "C" can be strung together without any new command characters between.
      i--;
    }

    x = +a[i + 1];
    y = +a[i + 2];

    if (isRelative) {
      x += relativeX;
      y += relativeY;
    }

    if (i === 0) {
      startX = x;
      startY = y;
    } // "M" (move)


    if (command === "M") {
      if (segment && segment.length < 8) {
        //if the path data was funky and just had a M with no actual drawing anywhere, skip it.
        path.length -= 1;
        l = 0;
      }

      relativeX = startX = x;
      relativeY = startY = y;
      segment = [x, y];
      points += l;
      l = 2;
      path.push(segment);
      i += 2;
      command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").
      // "C" (cubic bezier)
    } else if (command === "C") {
      if (!segment) {
        segment = [0, 0];
      }

      segment[l++] = x;
      segment[l++] = y;

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      segment[l++] = relativeX + a[i + 3] * 1; //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.

      segment[l++] = relativeY + a[i + 4] * 1;
      segment[l++] = relativeX = relativeX + a[i + 5] * 1;
      segment[l++] = relativeY = relativeY + a[i + 6] * 1; //if (y === segment[l-1] && y === segment[l-3] && x === segment[l-2] && x === segment[l-4]) { //if all the values are the same, eliminate the waste.
      //	segment.length = l = l-6;
      //}

      i += 6; // "S" (continuation of cubic bezier)
    } else if (command === "S") {
      if (prevCommand === "C" || prevCommand === "S") {
        difX = relativeX - segment[l - 4];
        difY = relativeY - segment[l - 3];
        segment[l++] = relativeX + difX;
        segment[l++] = relativeY + difY;
      } else {
        segment[l++] = relativeX;
        segment[l++] = relativeY;
      }

      segment[l++] = x;
      segment[l++] = y;

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      segment[l++] = relativeX = relativeX + a[i + 3] * 1;
      segment[l++] = relativeY = relativeY + a[i + 4] * 1; //if (y === segment[l-1] && y === segment[l-3] && x === segment[l-2] && x === segment[l-4]) { //if all the values are the same, eliminate the waste.
      //	segment.length = l = l-6;
      //}

      i += 4; // "Q" (quadratic bezier)
    } else if (command === "Q") {
      difX = x - relativeX;
      difY = y - relativeY;
      segment[l++] = relativeX + difX * 2 / 3;
      segment[l++] = relativeY + difY * 2 / 3;

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      relativeX = relativeX + a[i + 3] * 1;
      relativeY = relativeY + a[i + 4] * 1;
      difX = x - relativeX;
      difY = y - relativeY;
      segment[l++] = relativeX + difX * 2 / 3;
      segment[l++] = relativeY + difY * 2 / 3;
      segment[l++] = relativeX;
      segment[l++] = relativeY;
      i += 4; // "T" (continuation of quadratic bezier)
    } else if (command === "T") {
      difX = relativeX - segment[l - 4];
      difY = relativeY - segment[l - 3];
      segment[l++] = relativeX + difX;
      segment[l++] = relativeY + difY;
      difX = relativeX + difX * 1.5 - x;
      difY = relativeY + difY * 1.5 - y;
      segment[l++] = x + difX * 2 / 3;
      segment[l++] = y + difY * 2 / 3;
      segment[l++] = relativeX = x;
      segment[l++] = relativeY = y;
      i += 2; // "H" (horizontal line)
    } else if (command === "H") {
      y = relativeY; //if (x !== relativeX) {

      segment[l++] = relativeX + (x - relativeX) / 3;
      segment[l++] = relativeY + (y - relativeY) / 3;
      segment[l++] = relativeX + (x - relativeX) * 2 / 3;
      segment[l++] = relativeY + (y - relativeY) * 2 / 3;
      segment[l++] = relativeX = x;
      segment[l++] = y; //}

      i += 1; // "V" (horizontal line)
    } else if (command === "V") {
      y = x; //adjust values because the first (and only one) isn't x in this case, it's y.

      x = relativeX;

      if (isRelative) {
        y += relativeY - relativeX;
      } //if (y !== relativeY) {


      segment[l++] = x;
      segment[l++] = relativeY + (y - relativeY) / 3;
      segment[l++] = x;
      segment[l++] = relativeY + (y - relativeY) * 2 / 3;
      segment[l++] = x;
      segment[l++] = relativeY = y; //}

      i += 1; // "L" (line) or "Z" (close)
    } else if (command === "L" || command === "Z") {
      if (command === "Z") {
        x = startX;
        y = startY;
        segment.closed = true;
      }

      if (command === "L" || Math.abs(relativeX - x) > 0.5 || Math.abs(relativeY - y) > 0.5) {
        segment[l++] = relativeX + (x - relativeX) / 3;
        segment[l++] = relativeY + (y - relativeY) / 3;
        segment[l++] = relativeX + (x - relativeX) * 2 / 3;
        segment[l++] = relativeY + (y - relativeY) * 2 / 3;
        segment[l++] = x;
        segment[l++] = y;

        if (command === "L") {
          i += 2;
        }
      }

      relativeX = x;
      relativeY = y; // "A" (arc)
    } else if (command === "A") {
      beziers = _arcToBeziers(relativeX, relativeY, a[i + 1] * 1, a[i + 2] * 1, a[i + 3] * 1, a[i + 4] * 1, a[i + 5] * 1, (isRelative ? relativeX : 0) + a[i + 6] * 1, (isRelative ? relativeY : 0) + a[i + 7] * 1);

      if (beziers) {
        for (j = 0; j < beziers.length; j++) {
          segment[l++] = beziers[j];
        }
      }

      relativeX = segment[l - 2];
      relativeY = segment[l - 1];
      i += 7;
    } else {
      _log("Error: malformed path data: " + d);
    }
  }

  path.totalPoints = points + l;
  return path;
},
    //adds a certain number of Beziers while maintaining the path shape (so that the start/end values can have a matching quantity of points to animate). Only pass in ONE segment of the Bezier at a time. Format: [xAnchor, yAnchor, xControlPoint1, yControlPoint1, xControlPoint2, yControlPoint2, xAnchor, yAnchor, xControlPoint1, etc...]
_subdivideBezier = function _subdivideBezier(bezier, quantity) {
  var tally = 0,
      max = 0.999999,
      l = bezier.length,
      newPointsPerSegment = quantity / ((l - 2) / 6),
      ax,
      ay,
      cp1x,
      cp1y,
      cp2x,
      cp2y,
      bx,
      by,
      x1,
      y1,
      x2,
      y2,
      i,
      t;

  for (i = 2; i < l; i += 6) {
    tally += newPointsPerSegment;

    while (tally > max) {
      //compare with 0.99999 instead of 1 in order to prevent rounding errors
      ax = bezier[i - 2];
      ay = bezier[i - 1];
      cp1x = bezier[i];
      cp1y = bezier[i + 1];
      cp2x = bezier[i + 2];
      cp2y = bezier[i + 3];
      bx = bezier[i + 4];
      by = bezier[i + 5];
      t = 1 / (Math.floor(tally) + 1); //progress along the bezier (value between 0 and 1)

      x1 = ax + (cp1x - ax) * t;
      x2 = cp1x + (cp2x - cp1x) * t;
      x1 += (x2 - x1) * t;
      x2 += (cp2x + (bx - cp2x) * t - x2) * t;
      y1 = ay + (cp1y - ay) * t;
      y2 = cp1y + (cp2y - cp1y) * t;
      y1 += (y2 - y1) * t;
      y2 += (cp2y + (by - cp2y) * t - y2) * t;
      bezier.splice(i, 4, ax + (cp1x - ax) * t, //first control point
      ay + (cp1y - ay) * t, x1, //second control point
      y1, x1 + (x2 - x1) * t, //new fabricated anchor on line
      y1 + (y2 - y1) * t, x2, //third control point
      y2, cp2x + (bx - cp2x) * t, //fourth control point
      cp2y + (by - cp2y) * t);
      i += 6;
      l += 6;
      tally--;
    }
  }

  return bezier;
},
    _bezierToPathData = function _bezierToPathData(beziers) {
  var data = "",
      l = beziers.length,
      rnd = 100,
      sl,
      s,
      i,
      segment;

  for (s = 0; s < l; s++) {
    segment = beziers[s];
    data += "M" + segment[0] + "," + segment[1] + " C";
    sl = segment.length;

    for (i = 2; i < sl; i++) {
      data += (segment[i++] * rnd | 0) / rnd + "," + (segment[i++] * rnd | 0) / rnd + " " + (segment[i++] * rnd | 0) / rnd + "," + (segment[i++] * rnd | 0) / rnd + " " + (segment[i++] * rnd | 0) / rnd + "," + (segment[i] * rnd | 0) / rnd + " ";
    }

    if (segment.closed) {
      data += "z";
    }
  }

  return data;
},
    _reverseBezier = function _reverseBezier(bezier) {
  var a = [],
      i = bezier.length - 1,
      l = 0;

  while (--i > -1) {
    a[l++] = bezier[i];
    a[l++] = bezier[i + 1];
    i--;
  }

  for (i = 0; i < l; i++) {
    bezier[i] = a[i];
  }

  bezier.reversed = bezier.reversed ? false : true;
},
    _getAverageXY = function _getAverageXY(bezier) {
  var l = bezier.length,
      x = 0,
      y = 0,
      i;

  for (i = 0; i < l; i++) {
    x += bezier[i++];
    y += bezier[i];
  }

  return [x / (l / 2), y / (l / 2)];
},
    _getSize = function _getSize(bezier) {
  //rough estimate of the bounding box (based solely on the anchors) of a single segment. sets "size", "centerX", and "centerY" properties on the bezier array itself, and returns the size (width * height)
  var l = bezier.length,
      xMax = bezier[0],
      xMin = xMax,
      yMax = bezier[1],
      yMin = yMax,
      x,
      y,
      i;

  for (i = 6; i < l; i += 6) {
    x = bezier[i];
    y = bezier[i + 1];

    if (x > xMax) {
      xMax = x;
    } else if (x < xMin) {
      xMin = x;
    }

    if (y > yMax) {
      yMax = y;
    } else if (y < yMin) {
      yMin = y;
    }
  }

  bezier.centerX = (xMax + xMin) / 2;
  bezier.centerY = (yMax + yMin) / 2;
  return bezier.size = (xMax - xMin) * (yMax - yMin);
},
    _getTotalSize = function _getTotalSize(bezier) {
  //rough estimate of the bounding box of the entire list of Bezier segments (based solely on the anchors). sets "size", "centerX", and "centerY" properties on the bezier array itself, and returns the size (width * height)
  var segment = bezier.length,
      xMax = bezier[0][0],
      xMin = xMax,
      yMax = bezier[0][1],
      yMin = yMax,
      l,
      x,
      y,
      i,
      b;

  while (--segment > -1) {
    b = bezier[segment];
    l = b.length;

    for (i = 6; i < l; i += 6) {
      x = b[i];
      y = b[i + 1];

      if (x > xMax) {
        xMax = x;
      } else if (x < xMin) {
        xMin = x;
      }

      if (y > yMax) {
        yMax = y;
      } else if (y < yMin) {
        yMin = y;
      }
    }
  }

  bezier.centerX = (xMax + xMin) / 2;
  bezier.centerY = (yMax + yMin) / 2;
  return bezier.size = (xMax - xMin) * (yMax - yMin);
},
    _sortByComplexity = function _sortByComplexity(a, b) {
  return b.length - a.length;
},
    _sortBySize = function _sortBySize(a, b) {
  var sizeA = a.size || _getSize(a),
      sizeB = b.size || _getSize(b);

  return Math.abs(sizeB - sizeA) < (sizeA + sizeB) / 20 ? b.centerX - a.centerX || b.centerY - a.centerY : sizeB - sizeA; //if the size is within 10% of each other, prioritize position from left to right, then top to bottom.
},
    _offsetBezier = function _offsetBezier(bezier, shapeIndex) {
  var a = bezier.slice(0),
      l = bezier.length,
      wrap = l - 2,
      i,
      index;
  shapeIndex = shapeIndex | 0;

  for (i = 0; i < l; i++) {
    index = (i + shapeIndex) % wrap;
    bezier[i++] = a[index];
    bezier[i] = a[index + 1];
  }
},
    _getTotalMovement = function _getTotalMovement(sb, eb, shapeIndex, offsetX, offsetY) {
  var l = sb.length,
      d = 0,
      wrap = l - 2,
      index,
      i,
      x,
      y;
  shapeIndex *= 6;

  for (i = 0; i < l; i += 6) {
    index = (i + shapeIndex) % wrap;
    y = sb[index] - (eb[i] - offsetX);
    x = sb[index + 1] - (eb[i + 1] - offsetY);
    d += Math.sqrt(x * x + y * y);
  }

  return d;
},
    _getClosestShapeIndex = function _getClosestShapeIndex(sb, eb, checkReverse) {
  //finds the index in a closed cubic bezier array that's closest to the angle provided (angle measured from the center or average x/y).
  var l = sb.length,
      sCenter = _getAverageXY(sb),
      //when comparing distances, adjust the coordinates as if the shapes are centered with each other.
  eCenter = _getAverageXY(eb),
      offsetX = eCenter[0] - sCenter[0],
      offsetY = eCenter[1] - sCenter[1],
      min = _getTotalMovement(sb, eb, 0, offsetX, offsetY),
      minIndex = 0,
      copy,
      d,
      i;

  for (i = 6; i < l; i += 6) {
    d = _getTotalMovement(sb, eb, i / 6, offsetX, offsetY);

    if (d < min) {
      min = d;
      minIndex = i;
    }
  }

  if (checkReverse) {
    copy = sb.slice(0);

    _reverseBezier(copy);

    for (i = 6; i < l; i += 6) {
      d = _getTotalMovement(copy, eb, i / 6, offsetX, offsetY);

      if (d < min) {
        min = d;
        minIndex = -i;
      }
    }
  }

  return minIndex / 6;
},
    _getClosestAnchor = function _getClosestAnchor(bezier, x, y) {
  //finds the x/y of the anchor that's closest to the provided x/y coordinate (returns an array, like [x, y]). The bezier should be the top-level type that contains an array for each segment.
  var j = bezier.length,
      closestDistance = 99999999999,
      closestX = 0,
      closestY = 0,
      b,
      dx,
      dy,
      d,
      i,
      l;

  while (--j > -1) {
    b = bezier[j];
    l = b.length;

    for (i = 0; i < l; i += 6) {
      dx = b[i] - x;
      dy = b[i + 1] - y;
      d = Math.sqrt(dx * dx + dy * dy);

      if (d < closestDistance) {
        closestDistance = d;
        closestX = b[i];
        closestY = b[i + 1];
      }
    }
  }

  return [closestX, closestY];
},
    _getClosestSegment = function _getClosestSegment(bezier, pool, startIndex, sortRatio, offsetX, offsetY) {
  //matches the bezier to the closest one in a pool (array) of beziers, assuming they are in order of size and we shouldn't drop more than 20% of the size, otherwise prioritizing location (total distance to the center). Extracts the segment out of the pool array and returns it.
  var l = pool.length,
      index = 0,
      minSize = Math.min(bezier.size || _getSize(bezier), pool[startIndex].size || _getSize(pool[startIndex])) * sortRatio,
      //limit things based on a percentage of the size of either the bezier or the next element in the array, whichever is smaller.
  min = 999999999999,
      cx = bezier.centerX + offsetX,
      cy = bezier.centerY + offsetY,
      size,
      i,
      dx,
      dy,
      d;

  for (i = startIndex; i < l; i++) {
    size = pool[i].size || _getSize(pool[i]);

    if (size < minSize) {
      break;
    }

    dx = pool[i].centerX - cx;
    dy = pool[i].centerY - cy;
    d = Math.sqrt(dx * dx + dy * dy);

    if (d < min) {
      index = i;
      min = d;
    }
  }

  d = pool[index];
  pool.splice(index, 1);
  return d;
},
    _equalizeSegmentQuantity = function _equalizeSegmentQuantity(start, end, shapeIndex, map) {
  //returns an array of shape indexes, 1 for each segment.
  var dif = end.length - start.length,
      longer = dif > 0 ? end : start,
      shorter = dif > 0 ? start : end,
      added = 0,
      sortMethod = map === "complexity" ? _sortByComplexity : _sortBySize,
      sortRatio = map === "position" ? 0 : typeof map === "number" ? map : 0.8,
      i = shorter.length,
      shapeIndices = _typeof(shapeIndex) === "object" && shapeIndex.push ? shapeIndex.slice(0) : [shapeIndex],
      reverse = shapeIndices[0] === "reverse" || shapeIndices[0] < 0,
      log = shapeIndex === "log",
      eb,
      sb,
      b,
      x,
      y,
      offsetX,
      offsetY;

  if (!shorter[0]) {
    return;
  }

  if (longer.length > 1) {
    start.sort(sortMethod);
    end.sort(sortMethod);
    offsetX = longer.size || _getTotalSize(longer); //ensures centerX and centerY are defined (used below).

    offsetX = shorter.size || _getTotalSize(shorter);
    offsetX = longer.centerX - shorter.centerX;
    offsetY = longer.centerY - shorter.centerY;

    if (sortMethod === _sortBySize) {
      for (i = 0; i < shorter.length; i++) {
        longer.splice(i, 0, _getClosestSegment(shorter[i], longer, i, sortRatio, offsetX, offsetY));
      }
    }
  }

  if (dif) {
    if (dif < 0) {
      dif = -dif;
    }

    if (longer[0].length > shorter[0].length) {
      //since we use shorter[0] as the one to map the origination point of any brand new fabricated segments, do any subdividing first so that there are more points to choose from (if necessary)
      _subdivideBezier(shorter[0], (longer[0].length - shorter[0].length) / 6 | 0);
    }

    i = shorter.length;

    while (added < dif) {
      x = longer[i].size || _getSize(longer[i]); //just to ensure centerX and centerY are calculated which we use on the next line.

      b = _getClosestAnchor(shorter, longer[i].centerX, longer[i].centerY);
      x = b[0];
      y = b[1];
      shorter[i++] = [x, y, x, y, x, y, x, y];
      shorter.totalPoints += 8;
      added++;
    }
  }

  for (i = 0; i < start.length; i++) {
    eb = end[i];
    sb = start[i];
    dif = eb.length - sb.length;

    if (dif < 0) {
      _subdivideBezier(eb, -dif / 6 | 0);
    } else if (dif > 0) {
      _subdivideBezier(sb, dif / 6 | 0);
    }

    if (reverse && !sb.reversed) {
      _reverseBezier(sb);
    }

    shapeIndex = shapeIndices[i] || shapeIndices[i] === 0 ? shapeIndices[i] : "auto";

    if (shapeIndex) {
      //if start shape is closed, find the closest point to the start/end, and re-organize the bezier points accordingly so that the shape morphs in a more intuitive way.
      if (sb.closed || Math.abs(sb[0] - sb[sb.length - 2]) < 0.5 && Math.abs(sb[1] - sb[sb.length - 1]) < 0.5) {
        if (shapeIndex === "auto" || shapeIndex === "log") {
          shapeIndices[i] = shapeIndex = _getClosestShapeIndex(sb, eb, i === 0);

          if (shapeIndex < 0) {
            reverse = true;

            _reverseBezier(sb);

            shapeIndex = -shapeIndex;
          }

          _offsetBezier(sb, shapeIndex * 6);
        } else if (shapeIndex !== "reverse") {
          if (i && shapeIndex < 0) {
            //only happens if an array is passed as shapeIndex and a negative value is defined for an index beyond 0. Very rare, but helpful sometimes.
            _reverseBezier(sb);
          }

          _offsetBezier(sb, (shapeIndex < 0 ? -shapeIndex : shapeIndex) * 6);
        } //otherwise, if it's not a closed shape, consider reversing it if that would make the overall travel less

      } else if (!reverse && (shapeIndex === "auto" && Math.abs(eb[0] - sb[0]) + Math.abs(eb[1] - sb[1]) + Math.abs(eb[eb.length - 2] - sb[sb.length - 2]) + Math.abs(eb[eb.length - 1] - sb[sb.length - 1]) > Math.abs(eb[0] - sb[sb.length - 2]) + Math.abs(eb[1] - sb[sb.length - 1]) + Math.abs(eb[eb.length - 2] - sb[0]) + Math.abs(eb[eb.length - 1] - sb[1]) || shapeIndex % 2)) {
        _reverseBezier(sb);

        shapeIndices[i] = -1;
        reverse = true;
      } else if (shapeIndex === "auto") {
        shapeIndices[i] = 0;
      } else if (shapeIndex === "reverse") {
        shapeIndices[i] = -1;
      }

      if (sb.closed !== eb.closed) {
        //if one is closed and one isn't, don't close either one otherwise the tweening will look weird (but remember, the beginning and final states will honor the actual values, so this only affects the inbetween state)
        sb.closed = eb.closed = false;
      }
    }
  }

  if (log) {
    _log("shapeIndex:[" + shapeIndices.join(",") + "]");
  }

  return shapeIndices;
},
    _pathFilter = function _pathFilter(a, shapeIndex, map, precompile) {
  var start = _pathDataToBezier(a[0]),
      end = _pathDataToBezier(a[1]);

  if (!_equalizeSegmentQuantity(start, end, shapeIndex || shapeIndex === 0 ? shapeIndex : "auto", map)) {
    return; //malformed path data or null target
  }

  a[0] = _bezierToPathData(start);
  a[1] = _bezierToPathData(end);

  if (precompile === "log" || precompile === true) {
    _log('precompile:["' + a[0] + '","' + a[1] + '"]');
  }
},
    _buildPathFilter = function _buildPathFilter(shapeIndex, map, precompile) {
  return map || precompile || shapeIndex || shapeIndex === 0 ? function (a) {
    _pathFilter(a, shapeIndex, map, precompile);
  } : _pathFilter;
},
    _offsetPoints = function _offsetPoints(text, offset) {
  if (!offset) {
    return text;
  }

  var a = text.match(_numbersExp) || [],
      l = a.length,
      s = "",
      inc,
      i,
      j;

  if (offset === "reverse") {
    i = l - 1;
    inc = -2;
  } else {
    i = ((parseInt(offset, 10) || 0) * 2 + 1 + l * 100) % l;
    inc = 2;
  }

  for (j = 0; j < l; j += 2) {
    s += a[i - 1] + "," + a[i] + " ";
    i = (i + inc) % l;
  }

  return s;
},
    //adds a certain number of points while maintaining the polygon/polyline shape (so that the start/end values can have a matching quantity of points to animate). Returns the revised string.
_equalizePointQuantity = function _equalizePointQuantity(a, quantity) {
  var tally = 0,
      x = parseFloat(a[0]),
      y = parseFloat(a[1]),
      s = x + "," + y + " ",
      max = 0.999999,
      newPointsPerSegment,
      i,
      l,
      j,
      factor,
      nextX,
      nextY;
  l = a.length;
  newPointsPerSegment = quantity * 0.5 / (l * 0.5 - 1);

  for (i = 0; i < l - 2; i += 2) {
    tally += newPointsPerSegment;
    nextX = parseFloat(a[i + 2]);
    nextY = parseFloat(a[i + 3]);

    if (tally > max) {
      //compare with 0.99999 instead of 1 in order to prevent rounding errors
      factor = 1 / (Math.floor(tally) + 1);
      j = 1;

      while (tally > max) {
        s += (x + (nextX - x) * factor * j).toFixed(2) + "," + (y + (nextY - y) * factor * j).toFixed(2) + " ";
        tally--;
        j++;
      }
    }

    s += nextX + "," + nextY + " ";
    x = nextX;
    y = nextY;
  }

  return s;
},
    _pointsFilter = function _pointsFilter(a) {
  var startNums = a[0].match(_numbersExp) || [],
      endNums = a[1].match(_numbersExp) || [],
      dif = endNums.length - startNums.length;

  if (dif > 0) {
    a[0] = _equalizePointQuantity(startNums, dif);
  } else {
    a[1] = _equalizePointQuantity(endNums, -dif);
  }
},
    _buildPointsFilter = function _buildPointsFilter(shapeIndex) {
  return !isNaN(shapeIndex) ? function (a) {
    _pointsFilter(a);

    a[1] = _offsetPoints(a[1], parseInt(shapeIndex, 10));
  } : _pointsFilter;
},
    _createPath = function _createPath(e, ignore) {
  var path = __WEBPACK_IMPORTED_MODULE_0_gsap_TweenLite_js__["g" /* _gsScope */].document.createElementNS("http://www.w3.org/2000/svg", "path"),
      attr = Array.prototype.slice.call(e.attributes),
      i = attr.length,
      name;

  ignore = "," + ignore + ",";

  while (--i > -1) {
    name = attr[i].nodeName.toLowerCase(); //in Microsoft Edge, if you don't set the attribute with a lowercase name, it doesn't render correctly! Super weird.

    if (ignore.indexOf("," + name + ",") === -1) {
      path.setAttributeNS(null, name, attr[i].nodeValue);
    }
  }

  return path;
},
    _convertToPath = function _convertToPath(e, swap) {
  var type = e.tagName.toLowerCase(),
      circ = 0.552284749831,
      data,
      x,
      y,
      r,
      ry,
      path,
      rcirc,
      rycirc,
      points,
      w,
      h,
      x2,
      x3,
      x4,
      x5,
      x6,
      y2,
      y3,
      y4,
      y5,
      y6;

  if (type === "path" || !e.getBBox) {
    return e;
  }

  path = _createPath(e, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points");

  if (type === "rect") {
    r = +e.getAttribute("rx") || 0;
    ry = +e.getAttribute("ry") || 0;
    x = +e.getAttribute("x") || 0;
    y = +e.getAttribute("y") || 0;
    w = (+e.getAttribute("width") || 0) - r * 2;
    h = (+e.getAttribute("height") || 0) - ry * 2;

    if (r || ry) {
      //if there are rounded corners, render cubic beziers
      x2 = x + r * (1 - circ);
      x3 = x + r;
      x4 = x3 + w;
      x5 = x4 + r * circ;
      x6 = x4 + r;
      y2 = y + ry * (1 - circ);
      y3 = y + ry;
      y4 = y3 + h;
      y5 = y4 + ry * circ;
      y6 = y4 + ry;
      data = "M" + x6 + "," + y3 + " V" + y4 + " C" + [x6, y5, x5, y6, x4, y6, x4 - (x4 - x3) / 3, y6, x3 + (x4 - x3) / 3, y6, x3, y6, x2, y6, x, y5, x, y4, x, y4 - (y4 - y3) / 3, x, y3 + (y4 - y3) / 3, x, y3, x, y2, x2, y, x3, y, x3 + (x4 - x3) / 3, y, x4 - (x4 - x3) / 3, y, x4, y, x5, y, x6, y2, x6, y3].join(",") + "z";
    } else {
      data = "M" + (x + w) + "," + y + " v" + h + " h" + -w + " v" + -h + " h" + w + "z";
    }
  } else if (type === "circle" || type === "ellipse") {
    if (type === "circle") {
      r = ry = +e.getAttribute("r") || 0;
      rycirc = r * circ;
    } else {
      r = +e.getAttribute("rx") || 0;
      ry = +e.getAttribute("ry") || 0;
      rycirc = ry * circ;
    }

    x = +e.getAttribute("cx") || 0;
    y = +e.getAttribute("cy") || 0;
    rcirc = r * circ;
    data = "M" + (x + r) + "," + y + " C" + [x + r, y + rycirc, x + rcirc, y + ry, x, y + ry, x - rcirc, y + ry, x - r, y + rycirc, x - r, y, x - r, y - rycirc, x - rcirc, y - ry, x, y - ry, x + rcirc, y - ry, x + r, y - rycirc, x + r, y].join(",") + "z";
  } else if (type === "line") {
    data = _bezierToPathData(_pathDataToBezier("M" + (e.getAttribute("x1") || 0) + "," + (e.getAttribute("y1") || 0) + " L" + (e.getAttribute("x2") || 0) + "," + (e.getAttribute("y2") || 0))); //previously, we just converted to "Mx,y Lx,y" but Safari has bugs that cause that not to render properly when using a stroke-dasharray that's not fully visible! Using a cubic bezier fixes that issue.
  } else if (type === "polyline" || type === "polygon") {
    points = (e.getAttribute("points") + "").match(_numbersExp) || [];
    x = points.shift();
    y = points.shift();
    data = "M" + x + "," + y + " L" + points.join(",");

    if (type === "polygon") {
      data += "," + x + "," + y + "z";
    }
  }

  path.setAttribute("d", data);

  if (swap && e.parentNode) {
    e.parentNode.insertBefore(path, e);
    e.parentNode.removeChild(e);
  }

  return path;
},
    _parseShape = function _parseShape(shape, forcePath, target) {
  var isString = typeof shape === "string",
      e,
      type;

  if (!isString || _selectorExp.test(shape) || (shape.match(_numbersExp) || []).length < 3) {
    e = isString ? TweenLite.selector(shape) : shape && shape[0] ? shape : [shape]; //allow array-like objects like jQuery objects.

    if (e && e[0]) {
      e = e[0];
      type = e.nodeName.toUpperCase();

      if (forcePath && type !== "PATH") {
        //if we were passed an element (or selector text for an element) that isn't a path, convert it.
        e = _convertToPath(e, false);
        type = "PATH";
      }

      shape = e.getAttribute(type === "PATH" ? "d" : "points") || "";

      if (e === target) {
        //if the shape matches the target element, the user wants to revert to the original which should have been stored in the data-original attribute
        shape = e.getAttributeNS(null, "data-original") || shape;
      }
    } else {
      _log("WARNING: invalid morph to: " + shape);

      shape = false;
    }
  }

  return shape;
},
    _morphMessage = "Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",
    MorphSVGPlugin = __WEBPACK_IMPORTED_MODULE_0_gsap_TweenLite_js__["g" /* _gsScope */]._gsDefine.plugin({
  propName: "morphSVG",
  API: 2,
  global: true,
  version: "0.8.11",
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween, index) {
    var type, p, pt, shape, isPoly;

    if (typeof target.setAttribute !== "function") {
      return false;
    }

    if (typeof value === "function") {
      value = value(index, target);
    }

    type = target.nodeName.toUpperCase();
    isPoly = type === "POLYLINE" || type === "POLYGON";

    if (type !== "PATH" && !isPoly) {
      _log("WARNING: cannot morph a <" + type + "> SVG element. " + _morphMessage);

      return false;
    }

    p = type === "PATH" ? "d" : "points";

    if (typeof value === "string" || value.getBBox || value[0]) {
      value = {
        shape: value
      };
    }

    shape = _parseShape(value.shape || value.d || value.points || "", p === "d", target);

    if (isPoly && _commands.test(shape)) {
      _log("WARNING: a <" + type + "> cannot accept path data. " + _morphMessage);

      return false;
    }

    if (shape) {
      this._target = target;

      if (!target.getAttributeNS(null, "data-original")) {
        target.setAttributeNS(null, "data-original", target.getAttribute(p)); //record the original state in a data-original attribute so that we can revert to it later.
      }

      pt = this._addTween(target, "setAttribute", target.getAttribute(p) + "", shape + "", "morphSVG", false, p, _typeof(value.precompile) === "object" ? function (a) {
        a[0] = value.precompile[0];
        a[1] = value.precompile[1];
      } : p === "d" ? _buildPathFilter(value.shapeIndex, value.map || MorphSVGPlugin.defaultMap, value.precompile) : _buildPointsFilter(value.shapeIndex));

      if (pt) {
        this._overwriteProps.push("morphSVG");

        pt.end = shape;
        pt.endProp = p;
      }
    }

    return true;
  },
  set: function set(ratio) {
    var pt;

    this._super.setRatio.call(this, ratio);

    if (ratio === 1) {
      pt = this._firstPT;

      while (pt) {
        if (pt.end) {
          this._target.setAttribute(pt.endProp, pt.end); //make sure the end value is exactly as specified (in case we had to add fabricated points during the tween)

        }

        pt = pt._next;
      }
    }
  }
});

MorphSVGPlugin.pathFilter = _pathFilter;
MorphSVGPlugin.pointsFilter = _pointsFilter;
MorphSVGPlugin.subdivideRawBezier = _subdivideBezier;
MorphSVGPlugin.defaultMap = "size";

MorphSVGPlugin.pathDataToRawBezier = function (data) {
  return _pathDataToBezier(_parseShape(data, true));
};

MorphSVGPlugin.equalizeSegmentQuantity = _equalizeSegmentQuantity;

MorphSVGPlugin.convertToPath = function (targets, swap) {
  if (typeof targets === "string") {
    targets = TweenLite.selector(targets);
  }

  var a = !targets || targets.length === 0 ? [] : targets.length && targets[0] && targets[0].nodeType ? Array.prototype.slice.call(targets, 0) : [targets],
      i = a.length;

  while (--i > -1) {
    a[i] = _convertToPath(a[i], swap !== false);
  }

  return a;
};

MorphSVGPlugin.pathDataToBezier = function (data, vars) {
  //converts SVG path data into an array of {x, y} objects that can be plugged directly into a bezier tween. You can optionally pass in a 2D matrix like [a, b, c, d, tx, ty] containing numbers that should transform each point.
  var bezier = _pathDataToBezier(_parseShape(data, true))[0] || [],
      prefix = 0,
      a,
      i,
      l,
      matrix,
      offsetX,
      offsetY,
      bbox,
      e;
  vars = vars || {};
  e = vars.align || vars.relative;
  matrix = vars.matrix || [1, 0, 0, 1, 0, 0];
  offsetX = vars.offsetX || 0;
  offsetY = vars.offsetY || 0;

  if (e === "relative" || e === true) {
    offsetX -= bezier[0] * matrix[0] + bezier[1] * matrix[2];
    offsetY -= bezier[0] * matrix[1] + bezier[1] * matrix[3];
    prefix = "+=";
  } else {
    offsetX += matrix[4];
    offsetY += matrix[5];

    if (e) {
      e = typeof e === "string" ? TweenLite.selector(e) : e && e[0] ? e : [e]; //allow array-like objects like jQuery objects.

      if (e && e[0]) {
        bbox = e[0].getBBox() || {
          x: 0,
          y: 0
        };
        offsetX -= bbox.x;
        offsetY -= bbox.y;
      }
    }
  }

  a = [];
  l = bezier.length;

  if (matrix && matrix.join(",") !== "1,0,0,1,0,0") {
    for (i = 0; i < l; i += 2) {
      a.push({
        x: prefix + (bezier[i] * matrix[0] + bezier[i + 1] * matrix[2] + offsetX),
        y: prefix + (bezier[i] * matrix[1] + bezier[i + 1] * matrix[3] + offsetY)
      });
    }
  } else {
    for (i = 0; i < l; i += 2) {
      a.push({
        x: prefix + (bezier[i] + offsetX),
        y: prefix + (bezier[i + 1] + offsetY)
      });
    }
  }

  return a;
};



/***/ }),
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var GtmPlugin = {
  install: function install(Vue) {
    Vue.prototype.$gtm = new Vue({
      created: function created() {
        var vm = this;
        vm.$on('trackView', function (path) {
          var dataLayer = window.dataLayer = window.dataLayer || [];
          dataLayer.push({
            event: 'content-view',
            'content-name': path
          });
        });
        vm.$on('trackEvent', function (eventData) {
          var dataLayer = window.dataLayer = window.dataLayer || [];
          dataLayer.push(eventData);
        });
      }
    });
  }
};
/* harmony default export */ __webpack_exports__["a"] = (GtmPlugin);

/***/ }),
/* 376 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_The404Page_vue__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_TheBourbonPage_vue__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_TheCocktailsPage_vue__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_TheElementsPage_vue__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_TheFindPage_vue__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_TheHomePage_vue__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_TheStoryPage_vue__ = __webpack_require__(400);







var routes = [{
  path: '/',
  component: __WEBPACK_IMPORTED_MODULE_5__pages_TheHomePage_vue__["a" /* default */],
  meta: {
    skipLoading: true
  }
}, {
  path: '/bourbon',
  component: __WEBPACK_IMPORTED_MODULE_1__pages_TheBourbonPage_vue__["a" /* default */]
}, {
  path: '/cocktails',
  component: __WEBPACK_IMPORTED_MODULE_2__pages_TheCocktailsPage_vue__["a" /* default */]
}, {
  path: '/elements',
  component: __WEBPACK_IMPORTED_MODULE_3__pages_TheElementsPage_vue__["a" /* default */]
}, {
  path: '/find',
  component: __WEBPACK_IMPORTED_MODULE_4__pages_TheFindPage_vue__["a" /* default */]
}, {
  path: '/story',
  component: __WEBPACK_IMPORTED_MODULE_6__pages_TheStoryPage_vue__["a" /* default */]
}, {
  path: '*',
  name: '404',
  component: __WEBPACK_IMPORTED_MODULE_0__pages_The404Page_vue__["a" /* default */]
}];
/* harmony default export */ __webpack_exports__["a"] = (routes);

/***/ }),
/* 377 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content" },
    [
      _vm.h1
        ? [
            _vm.headlineLink
              ? _c(
                  "h1",
                  [
                    _vm.headlineLink
                      ? _c("router-link", {
                          attrs: { to: _vm.button.href },
                          domProps: { innerHTML: _vm._s(_vm.h1) }
                        })
                      : _vm._e()
                  ],
                  1
                )
              : _c("h1", { domProps: { innerHTML: _vm._s(_vm.h1) } })
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.h2
        ? [
            _vm.headlineLink
              ? _c(
                  "h2",
                  [
                    _vm.headlineLink
                      ? _c("router-link", {
                          attrs: { to: _vm.button.href },
                          domProps: { innerHTML: _vm._s(_vm.h2) }
                        })
                      : _vm._e()
                  ],
                  1
                )
              : _c("h2", { domProps: { innerHTML: _vm._s(_vm.h2) } })
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.h3
        ? [
            _vm.headlineLink
              ? _c(
                  "h3",
                  [
                    _vm.headlineLink
                      ? _c("router-link", {
                          attrs: { to: _vm.button.href },
                          domProps: { innerHTML: _vm._s(_vm.h3) }
                        })
                      : _vm._e()
                  ],
                  1
                )
              : _c("h3", { domProps: { innerHTML: _vm._s(_vm.h3) } })
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.h4
        ? [
            _vm.headlineLink
              ? _c(
                  "h4",
                  [
                    _vm.headlineLink
                      ? _c("router-link", {
                          attrs: { to: _vm.button.href },
                          domProps: { innerHTML: _vm._s(_vm.h4) }
                        })
                      : _vm._e()
                  ],
                  1
                )
              : _c("h4", { domProps: { innerHTML: _vm._s(_vm.h4) } })
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.h5
        ? [
            _vm.headlineLink
              ? _c(
                  "h5",
                  [
                    _vm.headlineLink
                      ? _c("router-link", {
                          attrs: { to: _vm.button.href },
                          domProps: { innerHTML: _vm._s(_vm.h5) }
                        })
                      : _vm._e()
                  ],
                  1
                )
              : _c("h5", { domProps: { innerHTML: _vm._s(_vm.h5) } })
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.h6
        ? [
            _vm.headlineLink
              ? _c(
                  "h6",
                  [
                    _vm.headlineLink
                      ? _c("router-link", {
                          attrs: { to: _vm.button.href },
                          domProps: { innerHTML: _vm._s(_vm.h6) }
                        })
                      : _vm._e()
                  ],
                  1
                )
              : _c("h6", { domProps: { innerHTML: _vm._s(_vm.h6) } })
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.isSingleParagraph
        ? _c("p", { domProps: { innerHTML: _vm._s(_vm.p) } })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasMultipleParagraphs
        ? _vm._l(_vm.p, function(text, index) {
            return _c("p", {
              key: index,
              domProps: { innerHTML: _vm._s(text) }
            })
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasUl
        ? _c("base-unordered-list", { attrs: { items: _vm.ul } })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasOl
        ? _c("base-ordered-list", { attrs: { items: _vm.ol } })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasDl
        ? _c("base-definition-list", { attrs: { list: _vm.dl } })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasHtml
        ? [
            _c("div", {
              ref: "html",
              domProps: { innerHTML: _vm._s(_vm.html) }
            })
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.hasButton
        ? _c("legent-link", {
            staticClass: "content-button",
            attrs: {
              href: _vm.button.href,
              "is-anchor": _vm.button.isAnchor,
              "is-full-width": _vm.button.isFullWidth,
              "is-gold": _vm.button.isGold,
              "is-line": _vm.button.isLine,
              "is-transparent": _vm.button.isTransparent,
              text: _vm.button.text
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-56f143f1", esExports)
  }
}

/***/ }),
/* 378 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "error error-404" },
    [
      _c(
        "doe-content",
        [
          _c("h1", [_vm._v("Nothing here.")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "Something seems to have consumed the page you requested. We’ll do our best to get to the bottom of this."
            )
          ]),
          _vm._v(" "),
          _c("legent-link", { attrs: { text: "Take me back.", to: "/" } })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-23224844", esExports)
  }
}

/***/ }),
/* 379 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheBourbonPage_vue__ = __webpack_require__(128);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0102dddd_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheBourbonPage_vue__ = __webpack_require__(385);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(380)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0102dddd"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheBourbonPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0102dddd_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheBourbonPage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/TheBourbonPage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0102dddd", Component.options)
  } else {
    hotAPI.reload("data-v-0102dddd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(381);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(127)("1bfeb60c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0102dddd\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TheBourbonPage.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0102dddd\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TheBourbonPage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(126)(false);
// imports


// module
exports.push([module.i, "\n.page[data-v-0102dddd] {\n  /* TODO: remove, just a test for scroll depth */\n  height: 10000px;\n}\n", ""]);

// exports


/***/ }),
/* 382 */,
/* 383 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.classNames }, [
    _vm.hasTitle
      ? _c("span", {
          staticClass: "scroll-progress-text",
          domProps: { innerHTML: _vm._s(_vm.title) }
        })
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "scroll-progress-bar" }, [
      _c("i", { style: _vm.progressStyle })
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-15ca7852", esExports)
  }
}

/***/ }),
/* 384 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "section", class: _vm.modifiers }, [
    _c(
      "div",
      { staticClass: "section-media" },
      [
        _vm._t("media", [
          _vm.hasPicture
            ? _c("base-picture", { attrs: { picture: _vm.picture } })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasVideo
            ? _c("legent-video-background", {
                attrs: {
                  dimensions: _vm.picture.dimensions,
                  file: _vm.videoFile,
                  "poster-url": _vm.picture.url,
                  "should-have-padding": true,
                  url: _vm.picture.videoUrl,
                  "url-mobile": _vm.picture.videoUrlMobile,
                  video: _vm.video
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasMediaButton
            ? _c("legent-link", {
                staticClass: "media-button",
                attrs: {
                  icon: _vm.mediaButton.icon,
                  "is-icon-only": _vm.mediaButtonHasIconOnly,
                  text: _vm.mediaButton.text,
                  "is-large": ""
                }
              })
            : _vm._e()
        ])
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "section-content" },
      [
        _vm._t("default", [
          _c("doe-content", {
            ref: "content",
            attrs: {
              h1: _vm.content.h1,
              h2: _vm.content.h2,
              h3: _vm.content.h3,
              html: _vm.content.html,
              p: _vm.content.p,
              ul: _vm.content.ul,
              ol: _vm.content.ol,
              button: _vm.button
            }
          })
        ])
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-df330f46", esExports)
  }
}

/***/ }),
/* 385 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    { staticClass: "page bourbon" },
    [
      _c("doe-scroll-progress", {
        ref: "scrollProgress",
        staticClass: "fade-in",
        attrs: { "is-right": "", title: "The bourbon" }
      }),
      _vm._v(" "),
      _c("doe-section", {
        ref: "hero",
        staticClass: "is-white-text is-left-aligned fade-in",
        attrs: {
          button: {
            href: "/",
            isGold: true,
            isBlended: true,
            text: "Go home"
          },
          content: {
            h1: "Here is a big headline for the product."
          },
          picture: {
            url: "/images/The-Slow-Dock.jpg",
            videoUrl: "/images/The-Slow-Dock.mp4",
            videoUrlMobile: "/images/The-Slow-Dock.mp4"
          },
          "is-hero": ""
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0102dddd", esExports)
  }
}

/***/ }),
/* 386 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheCocktailsPage_vue__ = __webpack_require__(131);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b2f9515_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheCocktailsPage_vue__ = __webpack_require__(387);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheCocktailsPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b2f9515_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheCocktailsPage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/TheCocktailsPage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b2f9515", Component.options)
  } else {
    hotAPI.reload("data-v-6b2f9515", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 387 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    { staticClass: "page bourbon" },
    [
      _c("doe-scroll-progress", {
        ref: "scrollProgress",
        staticClass: "fade-in",
        attrs: { "is-right": "", title: "The cocktails" }
      }),
      _vm._v(" "),
      _c("doe-section", {
        ref: "hero",
        staticClass: "is-white-text is-left-aligned fade-in",
        attrs: {
          button: {
            href: "/",
            isGold: true,
            isBlended: true,
            text: "Go home"
          },
          content: {
            h1: "Here is a big headline for the cocktails."
          },
          picture: {
            url: "/images/temp-cocktails.jpg"
          },
          "is-hero": ""
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6b2f9515", esExports)
  }
}

/***/ }),
/* 388 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheElementsPage_vue__ = __webpack_require__(132);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_544b3a5f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheElementsPage_vue__ = __webpack_require__(393);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(389)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-544b3a5f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheElementsPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_544b3a5f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheElementsPage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/TheElementsPage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-544b3a5f", Component.options)
  } else {
    hotAPI.reload("data-v-544b3a5f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(390);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(127)("67d4caf5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-544b3a5f\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TheElementsPage.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-544b3a5f\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TheElementsPage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(126)(false);
// imports


// module
exports.push([module.i, "\n.elements[data-v-544b3a5f] {\n  padding: 24px;\n}\nhr[data-v-544b3a5f] {\n  margin: 48px 0;\n  border-width: 0 0 1px;\n  border-style: solid;\n  border-color: rgba(0, 0, 0, 0.5);\n}\n", ""]);

// exports


/***/ }),
/* 391 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentButtons_vue__ = __webpack_require__(133);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_723c3588_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentButtons_vue__ = __webpack_require__(392);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentButtons_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_723c3588_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentButtons_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/components/LegentButtons.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-723c3588", Component.options)
  } else {
    hotAPI.reload("data-v-723c3588", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 392 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "buttons" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-723c3588", esExports)
  }
}

/***/ }),
/* 393 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    { staticClass: "page elements" },
    [
      _c("h1", [_vm._v("This is an h1 headline.")]),
      _vm._v(" "),
      _c("h2", [_vm._v("This is an h2 headline.")]),
      _vm._v(" "),
      _c("h3", [_vm._v("This is an h3 headline.")]),
      _vm._v(" "),
      _c("h4", [_vm._v("This is an h4 headline.")]),
      _vm._v(" "),
      _c("h5", [_vm._v("This is an h5 headline.")]),
      _vm._v(" "),
      _c("h6", [_vm._v("This is an h6 headline.")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "This is a paragraph using ITC Legacy Sans Book at 18px, with a 30px line-height in the color black. It contains a sentence with bold and itatlic styling. Phasellus pharetra urna sit amet tellus elementum aliquet in et quam. In condimentum dui."
        )
      ]),
      _vm._v(" "),
      _c(
        "legent-buttons",
        [
          _c("legent-link", {
            attrs: { "is-blended": "", text: "Black", to: "/" }
          }),
          _vm._v(" "),
          _c("legent-link", {
            attrs: {
              "is-blended": "",
              "is-danger": "",
              text: "Danger",
              to: "/"
            }
          }),
          _vm._v(" "),
          _c("legent-link", {
            attrs: { "is-blended": "", "is-gold": "", text: "Gold", to: "/" }
          }),
          _vm._v(" "),
          _c("legent-link", {
            attrs: { "is-blended": "", "is-grey": "", text: "Grey", to: "/" }
          }),
          _vm._v(" "),
          _c("legent-link", {
            attrs: {
              "is-blended": "",
              "is-silver": "",
              text: "Silver",
              to: "/"
            }
          }),
          _vm._v(" "),
          _c("legent-link", {
            attrs: {
              "is-blended": "",
              "is-success": "",
              text: "Success",
              to: "/"
            }
          }),
          _vm._v(" "),
          _c("legent-link", {
            attrs: { "is-blended": "", "is-wave": "", text: "Wave", to: "/" }
          }),
          _vm._v(" "),
          _c("legent-link", {
            attrs: { "is-blended": "", "is-white": "", text: "White", to: "/" }
          }),
          _vm._v(" "),
          _c("legent-link", {
            attrs: { "is-transparent": "", text: "Transparent", to: "/" }
          }),
          _vm._v(" "),
          _c("button", { staticClass: "button is-abstract is-gold" }, [
            _c("span", [_vm._v("Button")]),
            _vm._v(" "),
            _c("svg", [
              _c("circle", { attrs: { cx: "31", cy: "29", r: "20" } })
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("legent-input", { attrs: { label: "Input" } }),
      _vm._v(" "),
      _c("legent-input", {
        attrs: { icon: "mail", label: "Input with icon", required: "" }
      }),
      _vm._v(" "),
      _c("legent-input", {
        attrs: { icon: "mail", label: "Disabled input", disabled: "" }
      }),
      _vm._v(" "),
      _c(
        "legent-input",
        { attrs: { field: "subject", "no-default": "", select: "" } },
        [
          _c("base-option", { attrs: { selected: "", value: "option" } }, [
            _vm._v("\n      Selected Option\n    ")
          ]),
          _vm._v(" "),
          _c("base-option", { attrs: { value: "option" } }, [
            _vm._v("Option 2")
          ]),
          _vm._v(" "),
          _c("base-option", { attrs: { value: "option" } }, [
            _vm._v("Option 3")
          ]),
          _vm._v(" "),
          _c("base-option", { attrs: { value: "option" } }, [
            _vm._v("Option 4")
          ]),
          _vm._v(" "),
          _c("base-option", { attrs: { value: "option" } }, [
            _vm._v("Option 5")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("legent-input", { attrs: { field: "message", textarea: "" } }),
      _vm._v(" "),
      _c("legent-switch", {
        attrs: { "is-toggle": "", text: "This is a toggle" }
      }),
      _vm._v(" "),
      _c("legent-switch", {
        attrs: {
          "is-toggle": "",
          text: "This is a checked toggle",
          checked: ""
        }
      }),
      _vm._v(" "),
      _c("legent-switch", {
        attrs: {
          "is-toggle": "",
          text: "This is a disabled toggle",
          disabled: "",
          checked: ""
        }
      }),
      _vm._v(" "),
      _c("legent-switch", { attrs: { text: "This is a checkbox" } }),
      _vm._v(" "),
      _c("legent-switch", {
        attrs: { text: "This is a disabled checkbox", disabled: "" }
      }),
      _vm._v(" "),
      _c("legent-switch", {
        attrs: { text: "This is a required checkbox", required: "" }
      }),
      _vm._v(" "),
      _c("legent-switch", {
        attrs: { text: "This is a checked checkbox", checked: "" }
      }),
      _vm._v(" "),
      _c("legent-radio", { attrs: { text: "This is a radio button" } }),
      _vm._v(" "),
      _c("legent-radio", {
        attrs: { text: "This is a disabled radio button", disabled: "" }
      }),
      _vm._v(" "),
      _c("legent-radio", {
        attrs: { text: "This is a required radio button", required: "" }
      }),
      _vm._v(" "),
      _c("legent-radio", {
        attrs: { text: "This is a checked radio button", checked: "" }
      }),
      _vm._v(" "),
      _c("legent-radio", {
        attrs: { text: "This is radio 1", name: "option" }
      }),
      _vm._v(" "),
      _c("legent-radio", {
        attrs: { text: "This is radio 2", name: "option" }
      }),
      _vm._v(" "),
      _c("legent-radio", {
        attrs: { text: "This is radio 3", name: "option" }
      }),
      _vm._v(" "),
      _c("base-definition-list", {
        attrs: {
          list: [
            {
              term: "Definition list",
              descriptions: ["It's another way to display text."]
            },
            {
              term: "Often overlooked",
              descriptions: [
                "But not here at Doe-Anderson",
                "Item with two definitions but one term"
              ]
            },
            { term: "Final title", descriptions: ["Final description"] }
          ]
        }
      }),
      _vm._v(" "),
      _c("legent-blockquote", {
        attrs: {
          cite: {
            title: "Star Legent",
            content: "Jeff Long, #1 fan"
          },
          content:
            "Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?"
        }
      }),
      _vm._v(" "),
      _c("legent-blockquote", {
        attrs: {
          cite: {
            title: "Star Legent",
            content: "Jeff Long, #1 fan"
          },
          content:
            "Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?",
          "is-danger": ""
        }
      }),
      _vm._v(" "),
      _c("legent-blockquote", {
        attrs: {
          cite: {
            title: "Star Legent",
            content: "Jeff Long, #1 fan"
          },
          content:
            "Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?",
          "is-gold": ""
        }
      }),
      _vm._v(" "),
      _c("legent-blockquote", {
        attrs: {
          cite: {
            title: "Star Legent",
            content: "Jeff Long, #1 fan"
          },
          content:
            "Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?",
          "is-grey": ""
        }
      }),
      _vm._v(" "),
      _c("legent-blockquote", {
        attrs: {
          cite: {
            title: "Star Legent",
            content: "Jeff Long, #1 fan"
          },
          content:
            "Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?",
          "is-silver": ""
        }
      }),
      _vm._v(" "),
      _c("legent-blockquote", {
        attrs: {
          cite: {
            title: "Star Legent",
            content: "Jeff Long, #1 fan"
          },
          content:
            "Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?",
          "is-success": ""
        }
      }),
      _vm._v(" "),
      _c("legent-blockquote", {
        attrs: {
          cite: {
            title: "Star Legent",
            content: "Jeff Long, #1 fan"
          },
          content:
            "Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?",
          "is-wave": ""
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the default notification"
          }
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the default notification with close."
          },
          "has-close": ""
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the red notification"
          },
          "is-danger": ""
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the gold notification"
          },
          "is-gold": ""
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the grey notification"
          },
          "is-grey": ""
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the silver notification"
          },
          "is-silver": ""
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the success notification"
          },
          "is-success": ""
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the wave notification"
          },
          "is-wave": ""
        }
      }),
      _vm._v(" "),
      _c("legent-notification", {
        attrs: {
          content: {
            p: "This is the white notification"
          },
          "is-white": ""
        }
      }),
      _vm._v(" "),
      _c("legent-list", {
        attrs: {
          items: [
            "This is the first list item",
            "Second list item",
            "Third list item"
          ],
          "is-ordered": ""
        }
      }),
      _vm._v(" "),
      _c("legent-list", {
        attrs: {
          items: [
            "This is the first list item",
            "Second list item",
            "Third list item"
          ]
        }
      }),
      _vm._v(" "),
      _c("legent-list", {
        attrs: {
          items: [
            "This is the first list item",
            "Second list item",
            "Third list item"
          ],
          "is-danger": ""
        }
      }),
      _vm._v(" "),
      _c("legent-list", {
        attrs: {
          items: [
            "This is the first list item",
            "Second list item",
            "Third list item"
          ],
          "is-gold": ""
        }
      }),
      _vm._v(" "),
      _c("legent-list", {
        attrs: {
          items: [
            "This is the first list item",
            "Second list item",
            "Third list item"
          ],
          "is-grey": ""
        }
      }),
      _vm._v(" "),
      _c("legent-list", {
        attrs: {
          items: [
            "This is the first list item",
            "Second list item",
            "Third list item"
          ],
          "is-silver": ""
        }
      }),
      _vm._v(" "),
      _c("legent-list", {
        attrs: {
          items: [
            "This is the first list item",
            "Second list item",
            "Third list item"
          ],
          "is-success": ""
        }
      }),
      _vm._v(" "),
      _c("legent-list", {
        attrs: {
          items: [
            "This is the first list item",
            "Second list item",
            "Third list item"
          ],
          "is-wave": ""
        }
      }),
      _vm._v(" "),
      _c("legent-table", {
        attrs: {
          "body-rows": [
            ["John", "Doe", "john@example.com"],
            ["Mary", "Moe", "mary@example.com"],
            ["Julie", "Dooley", "julie@example.com"]
          ],
          "header-rows": ["First name", "Last name", "Email address"]
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-544b3a5f", esExports)
  }
}

/***/ }),
/* 394 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheFindPage_vue__ = __webpack_require__(134);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_61c905a1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheFindPage_vue__ = __webpack_require__(395);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheFindPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_61c905a1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheFindPage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/TheFindPage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61c905a1", Component.options)
  } else {
    hotAPI.reload("data-v-61c905a1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 395 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    { staticClass: "page bourbon" },
    [
      _c("doe-section", {
        ref: "hero",
        staticClass: "is-white-text is-left-aligned fade-in",
        attrs: {
          button: {
            href: "/",
            isGold: true,
            isBlended: true,
            text: "Go home"
          },
          content: {
            h1: "Here is a big headline for the find page."
          },
          picture: {
            url: "/images/temp-find.jpg"
          },
          "is-hero": ""
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-61c905a1", esExports)
  }
}

/***/ }),
/* 396 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheHomePage_vue__ = __webpack_require__(135);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e2f90272_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheHomePage_vue__ = __webpack_require__(399);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheHomePage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e2f90272_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheHomePage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/TheHomePage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e2f90272", Component.options)
  } else {
    hotAPI.reload("data-v-e2f90272", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 397 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentCarouselHero_vue__ = __webpack_require__(136);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_230b0c83_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentCarouselHero_vue__ = __webpack_require__(398);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentCarouselHero_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_230b0c83_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentCarouselHero_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/components/LegentCarouselHero.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-230b0c83", Component.options)
  } else {
    hotAPI.reload("data-v-230b0c83", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 398 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "hero-carousel" }, [
    _c(
      "div",
      { ref: "slidesContainer", staticClass: "hero-carousel-content" },
      _vm._l(_vm.slides, function(slide, index) {
        return _c(
          "doe-section",
          {
            key: index,
            attrs: {
              picture: slide.picture,
              "has-full-image": "",
              "is-hero": ""
            }
          },
          [
            _c("h1", { domProps: { innerHTML: _vm._s(slide.content.h1) } }),
            _vm._v(" "),
            _c("legent-link", {
              attrs: {
                text: slide.button.text,
                href: slide.button.href,
                "is-gold": "",
                "is-blended": "",
                "skip-router": ""
              },
              nativeOn: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.handleCtaClick(slide.button.href)
                }
              }
            })
          ],
          1
        )
      })
    ),
    _vm._v(" "),
    _c("div", { ref: "progress", staticClass: "scroll-progress" }, [
      _c("div", { staticClass: "scroll-progress-text" }, [
        _vm._v(_vm._s(_vm.currentSlideText))
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "scroll-progress-bar" }, [
        _c("i", { style: _vm.progressStyles })
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { ref: "nav", staticClass: "hero-carousel-nav" },
      [
        _c("legent-link", {
          staticClass: "hero-carousel-nav-prev",
          attrs: {
            disabled: _vm.currentSlide === 0,
            "is-submit": false,
            icon: "caret-left",
            "is-button": "",
            "is-icon-only": "",
            "is-transparent": ""
          },
          nativeOn: {
            click: function($event) {
              $event.preventDefault()
              return _vm.prevSlide($event)
            }
          }
        }),
        _vm._v(" "),
        _c(
          "legent-link",
          {
            staticClass: "circle",
            attrs: {
              "is-submit": false,
              "is-button": "",
              "is-icon-only": "",
              "is-transparent": ""
            },
            nativeOn: {
              click: function($event) {
                $event.preventDefault()
                _vm.setSlide(0)
              }
            }
          },
          [_c("i")]
        ),
        _vm._v(" "),
        _c("legent-link", {
          staticClass: "hero-carousel-nav-next",
          attrs: {
            disabled: _vm.currentSlide === _vm.slidesCount - 1,
            "is-submit": false,
            icon: "caret-right",
            "is-button": "",
            "is-icon-only": "",
            "is-transparent": ""
          },
          nativeOn: {
            click: function($event) {
              $event.preventDefault()
              return _vm.nextSlide($event)
            }
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-230b0c83", esExports)
  }
}

/***/ }),
/* 399 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    { staticClass: "page home" },
    [_c("legent-carousel-hero", { attrs: { slides: _vm.slides } })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e2f90272", esExports)
  }
}

/***/ }),
/* 400 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheStoryPage_vue__ = __webpack_require__(137);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49131a8a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheStoryPage_vue__ = __webpack_require__(403);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheStoryPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49131a8a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheStoryPage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/TheStoryPage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49131a8a", Component.options)
  } else {
    hotAPI.reload("data-v-49131a8a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 401 */
/***/ (function(module, exports) {

var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"viewBox":"0 0 243 71","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M55.933 34.698a1.201 1.201 0 0 0 .954-1.407 1.199 1.199 0 0 0-1.407-.954c-2.033.39-4.724 1.233-7.731 2.326C58.052 21.735 70.88 6.526 71.059 6.313a1.2 1.2 0 0 0 .049-1.49 1.206 1.206 0 0 0-1.438-.394L32.337 20.361a1.203 1.203 0 0 0 .942 2.213L65.987 8.617c-5.045 6.032-14.983 18.002-22.643 27.739-11.845 4.738-26.02 11.782-26.85 12.196a1.203 1.203 0 0 0 1.074 2.151c.181-.089 11.82-5.878 22.792-10.516-1.87 2.432-3.507 4.623-4.755 6.399-15.277 21.737-18.578 22.328-19.22 21.986-2.48-1.277-11.214-9.064-14.37-11.956A1.203 1.203 0 0 0 .39 58.389c.473.434 11.623 10.637 14.892 12.321.36.184.75.29 1.192.29 2.997 0 8.325-4.858 21.1-23.03 1.773-2.526 4.334-5.892 7.258-9.62 4.4-1.747 8.396-3.132 11.101-3.652M76.926 39.868c.731-.813 1.245-1.162 1.541-1.313-.056.565-.432 1.725-1.63 3.219a87.494 87.494 0 0 1-2.289 2.75c.509-1.72 1.32-3.476 2.378-4.656m4.206 5.886l-5.486 3.587c-.728.475-1.243.593-1.356.46-.177-.209-.285-.577-.33-1.052 1.732-1.763 3.311-3.631 4.758-5.437 2.24-2.794 2.815-5.601 1.4-6.826-.582-.5-2.223-1.335-4.984 1.74-1.99 2.214-3.496 6.305-3.597 9.501-2.515 2.445-5.339 4.588-8.527 5.876-.34.138-.605.227-.804.284.124-.44.335-1.01.494-1.44.745-2.018 1.765-4.783-.156-6.237-.977-.74.268-5.715 2.61-10.439a1.23 1.23 0 0 0-.409-1.563 1.196 1.196 0 0 0-1.586.215s-7.283 8.466-11.766 13.713c-4.267 4.984-13.607 9.492-13.701 9.537a1.228 1.228 0 0 0-.575 1.628 1.207 1.207 0 0 0 1.613.58c.402-.192 9.892-4.771 14.494-10.147 2.112-2.471 4.845-5.658 7.144-8.336-.733 2.768-.907 5.533.723 6.766.474.359-.291 2.432-.659 3.428-.654 1.77-1.218 3.298-.197 4.304.923.91 2.374.502 3.674-.023 3.005-1.214 5.678-3.082 8.078-5.235.124.28.277.531.458.746.485.577 1.893 1.726 4.517.008l5.486-3.586c.56-.366.72-1.123.358-1.69a1.211 1.211 0 0 0-1.674-.362M96.267 40.589c-4.068 2.987-7.444 4.819-8.802 5.07.096-.303.306-.801.764-1.574 2.451-4.135 5.86-5.19 8.333-5.334-.127.629-.233 1.244-.295 1.838m3.256-4.022c.158-.625.318-1.262.468-1.905 1.562-6.68 7.222-16.058 13.787-16.291 1.004-.045 1.729.132 1.86.443.464 1.085-1.43 5.495-11.475 15.128a78.543 78.543 0 0 1-3.345 3.032 1.14 1.14 0 0 0-.378-.193 8.415 8.415 0 0 0-.92-.197c.002-.005.002-.011.003-.017m35.216 3.026c-3.81.223-7.406 1.103-11.572 2.121-4.38 1.071-9.345 2.285-15.948 3.098-4.282.532-6.982.205-8.019-.96-.442-.496-.614-1.214-.618-2.078 2.958-2.259 5.667-4.623 7.235-6.125 9.226-8.85 13.267-14.826 12.013-17.763-.568-1.328-1.964-1.94-4.139-1.882-8.106.288-14.35 10.983-16.019 18.122-.147.63-.304 1.254-.458 1.867l-.103.405c-3.112.03-7.746 1.112-10.932 6.484-.564.95-2.062 3.476-.463 4.731.338.266.78.387 1.308.387 2.176 0 5.785-2.062 9.355-4.6.18.747.51 1.427 1.036 2.022 1.633 1.836 4.85 2.386 10.096 1.742 6.743-.832 11.78-2.063 16.226-3.15 4.05-.991 7.55-1.845 11.143-2.057a1.187 1.187 0 0 0 1.118-1.251c-.038-.653-.585-1.13-1.26-1.113M207.626 1.643C206.394-.64 202.844.049 201.68.277c-7.978 1.554-21.406 13.896-29.448 21.926 1.702-3.897 1.757-6.966.14-9.11-1.967-2.608-6.164-3.474-12.134-2.505-9.132 1.478-19.306 7.62-20.163 12.173-.281 1.494.284 2.424.808 2.941 1.877 1.854 6.347 1.765 15.94-.315 5.346-1.157 7.109-.929 7.588-.801a1.192 1.192 0 0 0 2.235-.335c.091-.487-.087-1.008-.475-1.393-.76-.75-2.565-1.408-9.848.165-9.976 2.164-12.996 1.715-13.767.949-.075-.073-.23-.227-.13-.76.59-3.145 9.868-8.89 18.191-10.236 4.904-.792 8.492-.22 9.853 1.583 1.338 1.775.46 4.719-.512 6.878-3.975 8.827-23.292 34.362-23.487 34.62a1.214 1.214 0 0 0 .223 1.693 1.185 1.185 0 0 0 1.676-.225c.618-.815 11.986-15.85 19.03-26.85.71-.773 23.92-25.92 34.731-28.025 2.37-.464 3.246-.122 3.394.15.153.286 1.112 3.21-12.528 17.624-9.105 9.61-15.37 19.764-16.759 27.157a1.21 1.21 0 0 0 1.177 1.436c.564 0 1.066-.405 1.176-.984 1.304-6.953 7.335-16.65 16.135-25.94 13.51-14.274 13.99-18.427 12.9-20.45M194.73 35.833c-1.25 5.06-3.724 6.88-4.51 6.777-.262-.041-.581-.72-.468-2.1.373-4.593 4.416-5.083 4.876-5.123a1.07 1.07 0 0 0 .22-.039l-.118.485zm7.685-3.013c2.703-2.785 4.885-3.427 5.66-3.427h.004c-.253.58-1.322 1.938-4.423 3.813-1.073.65-1.92 1.025-2.58 1.23.426-.625.924-1.188 1.339-1.616zm38.879 5.525c-9.698-2.578-15.105-1.322-21.366.128-2.403.555-4.887 1.131-7.856 1.564-6.792.994-10.783-.347-11.719-2.107a2.087 2.087 0 0 1-.239-.928c1.354-.075 2.94-.67 4.804-1.797 3.826-2.313 5.817-4.551 5.609-6.304-.094-.8-.639-1.438-1.457-1.706-2.043-.665-5.42.943-8.396 4.008-.987 1.016-1.678 1.954-2.144 2.81-.18-.26-.308-.578-.43-.909-.135-.368-.487-1.2-1.408-1.175-.73.04-.998.3-1.334 1.438a1.212 1.212 0 0 0-.925-.323c-2.256.176-6.638 1.921-7.075 7.279-.315 3.865 1.821 4.504 2.483 4.608.138.021.278.03.422.03 2.344 0 5.393-2.874 6.8-8.577l.088-.356c.17.156.361.3.578.43a4.418 4.418 0 0 0 .495 2.556c1.647 3.098 7.084 4.38 14.202 3.347 3.068-.447 5.604-1.033 8.057-1.602 6.188-1.433 11.076-2.564 20.18-.147a1.202 1.202 0 0 0 1.474-.824 1.172 1.172 0 0 0-.843-1.443z"}})])};var toString = function () {return "/Users/kglass/Forks/legent-frontend/src/images/fred-signature.svg"};module.exports = { render: render, toString: toString };

/***/ }),
/* 402 */
/***/ (function(module, exports) {

var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"viewBox":"0 0 262 84","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M12.18 33.286c-5.375.35-7.898.293-9.023.13.51-.5 1.407-1.231 2.687-2.188 5.566-4.166 25.107-19.735 25.304-19.89a1.352 1.352 0 0 0-1.685-2.117c-.197.158-19.706 15.702-25.24 19.839-2.969 2.225-4.727 3.698-4.095 5.412.662 1.789 3.176 2.099 12.226 1.512 14.37-.934 19.284-.516 20.702.102a6.452 6.452 0 0 1-.862.697c-6.502 4.547-19.257 14.07-19.384 14.166a1.355 1.355 0 0 0 .81 2.437c.281 0 .564-.088.807-.27.128-.095 12.848-9.593 19.316-14.117.683-.477 2.763-1.934 2.12-3.766-.795-2.26-4.676-3.18-23.684-1.947M121.232 36.348c-3.658 1.185-6.17.44-7.364-.116a2.77 2.77 0 0 0-.281-.398c-.225-.279-.858-.78-1.876-.194a1.226 1.226 0 0 0-.185.092c-.03.02-.05.018-.08.04-2.514 1.85-8.011 4.008-12.05 1.953-3.745-1.902-5.83.051-7.501 1.63-.822.77-1.671 1.568-2.765 2.093-2.305 1.115-2.845.52-4.444-1.236-.285-.313-.586-.644-.914-.98-2.916-2.983-8.432.421-13.954 4.542-2.33 1.741-3.497 2.168-3.967 2.27.003-.5.202-1.81 1.58-4.796 1.486-3.226 1.48-5.54-.012-6.879-3.455-3.096-12.251 1.931-13.98 2.97l-2.652 1.61c-1.871 1.14-4.145 2.524-5.924 3.507 5.536-6.754 23.55-26.01 23.746-26.219a1.35 1.35 0 1 0-1.973-1.846c-.868.926-21.275 22.74-25.012 27.811-.646.875-1.85 2.51-.78 3.674 1.233 1.35 3.114.396 11.35-4.62l2.637-1.597c5.64-3.39 9.88-4.082 10.783-3.274.353.316.397 1.482-.638 3.731-2.091 4.536-2.367 6.968-.92 8.143 1.424 1.154 3.696.435 7.38-2.317 7.22-5.394 9.638-5.603 10.403-4.819.304.311.582.616.847.91 1.716 1.885 3.49 3.836 7.615 1.854 1.47-.709 2.519-1.694 3.445-2.563 1.63-1.536 2.378-2.233 4.423-1.188 2.298 1.168 4.869 1.323 7.309.922l-.68.585C97.774 47.686 87.16 56.817 81.382 62.29 71.787 71.381 67.756 75.911 67.59 76.1a1.35 1.35 0 0 0 .116 1.906c.256.23.577.342.896.342.372 0 .745-.155 1.01-.454.042-.045 4.137-4.647 13.63-13.639 5.73-5.43 16.316-14.536 23.319-20.562 2.964-2.548 4.768-4.106 5.876-5.157 1.573.8 4.91 1.926 9.632.381 3.465-1.126 4.33-.773 4.517-.64.238.172.354.826.346 1.947a1.353 1.353 0 0 0 1.342 1.361h.01c.742 0 1.346-.599 1.352-1.344.012-1.592-.158-3.2-1.455-4.146-1.336-.979-3.414-.9-6.95.254"}}),_c('path',{attrs:{"d":"M102.502 30.415c.172 0 .347-.034.516-.102l2.796-1.154a1.352 1.352 0 0 0-1.033-2.5l-2.796 1.153a1.354 1.354 0 0 0 .517 2.603M114.076 29.196h.008l3.447-.022a1.355 1.355 0 0 0 1.343-1.361c-.006-.748-.591-1.302-1.36-1.344l-3.447.023a1.352 1.352 0 1 0 .009 2.704M136.318 20.246c-.57.519-3.18 1.25-5.26 1.603a1.351 1.351 0 1 0 .451 2.665c1.194-.201 5.2-.963 6.632-2.275a1.35 1.35 0 0 0 .086-1.91 1.348 1.348 0 0 0-1.909-.083M204.383 31.496c-.022.02-2.394 2.18-5.012 3.537-.66.336-1.581-.4-2.907-1.578-1.31-1.16-2.803-2.464-4.56-2.179-.704.121-1.574.412-2.58.748-2.888.971-6.844 2.294-9.66.623-2.151-1.277-4.238-1.439-6.281-1.043C179.862 20.85 188.31 8.155 188.41 8.007a1.354 1.354 0 0 0-1.074-2.103l-8.46-.316c-8.504-.29-22.575 2.348-23.17 2.461a1.35 1.35 0 0 0-1.073 1.581c.143.734.859 1.222 1.582 1.073.14-.026 14.334-2.716 22.56-2.41l6.056.224c-2.958 4.492-10.222 15.631-15.416 24.465-1.173.568-2.333 1.224-3.482 1.881l-.771.438c-3.471 1.97-15.017.657-19.174-.014a1.353 1.353 0 0 0-.431 2.67c1.012.164 6.978 1.09 12.523 1.09 3.358 0 6.562-.343 8.417-1.392l.358-.204c-5.923 10.575-9.623 18.57-9.662 18.652a1.353 1.353 0 0 0 2.456 1.135c.039-.088 4.084-8.826 10.492-20.117.372-.655.765-1.335 1.169-2.028 2.592-1.155 4.723-1.456 6.974-.119 3.877 2.305 8.706.688 11.902-.385.876-.296 1.624-.553 2.172-.649.462-.07 1.542.855 2.31 1.535 1.517 1.347 3.59 3.196 5.949 1.957 2.932-1.52 5.485-3.845 5.592-3.943a1.351 1.351 0 1 0-1.826-1.993M260.902 32.456c-.896-1.27-2.564-.53-5.43.889-2.73 1.352-6.61.856-10.36.373-2.458-.313-4.783-.616-6.72-.37-2.659.314-6.496-.502-9.887-1.233-2.272-.49-4.417-.951-6.19-1.09-4.918-.333-5.95 2.65-6.85 5.329l-.36 1.04c-.25.685-1.505.295-1.556.275-1.546-.491-3.507-2.447-2.578-5.814 1.82-6.56 9.147-29.86 9.222-30.094a1.353 1.353 0 0 0-2.58-.813c-.073.237-7.416 23.58-9.247 30.187-1.275 4.61 1.297 8.135 4.362 9.112 2.232.713 4.251-.085 4.92-1.934l.378-1.098c.883-2.628 1.223-3.743 4.08-3.491 1.591.12 3.65.564 5.83 1.032 3.776.813 7.68 1.652 10.785 1.273 1.615-.2 3.765.077 6.046.37 3.527.452 7.474.96 10.745-.152-.115.113-.237.229-.36.35-4.766 4.584-25.579 25.024-32.827 33.884-3.28 4.02-4.626 7.39-3.999 10.02.521 2.187 2.181 2.98 2.37 3.065.176.077.36.117.538.117.504 0 .981-.291 1.214-.78a1.37 1.37 0 0 0-.627-1.795c-.026-.014-.68-.355-.879-1.298-.21-.997-.038-3.311 3.476-7.62 7.164-8.754 27.867-29.082 32.61-33.646 3.672-3.54 4.784-4.795 3.874-6.088"}})])};var toString = function () {return "/Users/kglass/Forks/legent-frontend/src/images/sinji-signature.svg"};module.exports = { render: render, toString: toString };

/***/ }),
/* 403 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    { staticClass: "page story" },
    [
      _c("div", { ref: "hero", staticClass: "intro" }, [
        _c(
          "div",
          { staticClass: "intro-signature fred" },
          [_c("fred-signature")],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "intro-background" }, [
          _c(
            "div",
            { staticClass: "intro-media" },
            [
              _c("legent-video-background", {
                attrs: {
                  "should-have-padding": true,
                  "poster-url": "/images/Boats-and-Waves.jpg",
                  url: "/images/Boats-and-Waves.mp4",
                  "url-mobile": "/images/Boats-and-Waves.mp4"
                }
              })
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "intro-signature sinji" },
          [_c("sinji-signature")],
          1
        )
      ]),
      _vm._v(" "),
      _c("doe-section", {
        staticClass: "has-stroke-background",
        attrs: {
          content: {
            h2: "Two True Legends"
          },
          picture: { url: "/images/legent-stroke.svg" },
          "has-full-image": "",
          "is-hero": "",
          "is-large-headline": ""
        }
      }),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c("doe-section", {
        attrs: {
          content: {
            h2: "Talk about bourbon through Fred",
            html:
              "<p>This is a paragraph using ITC Legacy Sans Book at 18px, with a 30px line-height in the color black. It contains a sentence with bold and itatlic styling. Phasellus pharetra urna sit amet tellus elementum aliquet in et quam. In condimentum dui.</p>"
          },
          "media-button": {
            icon: "play",
            href: "#"
          },
          picture: { url: "/images/story-fred-distillery.jpg" },
          "has-full-image": "",
          "is-split": ""
        }
      }),
      _vm._v(" "),
      _c("doe-section", {
        attrs: {
          content: {
            h2: "Talk about precision through Sinji",
            html:
              "<p>This is a paragraph using ITC Legacy Sans Book at 18px, with a 30px line-height in the color black. It contains a sentence with bold and itatlic styling. Phasellus pharetra urna sit amet tellus elementum aliquet in et quam. In condimentum dui.</p>"
          },
          "media-button": {
            icon: "play",
            href: "#"
          },
          picture: { url: "/images/story-sinji-distillery.jpg" },
          "has-full-image": "",
          "is-reverse": "",
          "is-split": ""
        }
      }),
      _vm._v(" "),
      _c("doe-section", {
        attrs: {
          button: {
            href: "/bourbon",
            text: "Button"
          },
          content: {
            h2: "Here is a call to the product page.",
            html:
              "<p>Nunc ac porta turpis, et sagittis magna. Nunc id ultrices quam. Nulla nec libero lorem. Phasellus semper pharetra risus bibendum ornare. Cras tristique auctor dolor, bibendum pharetra elit condimentum sit amet. Vivamus ac sollicitudin metus. Maecenas ac neque nisi. Fusce eu enim at orci eleifend dapibus. In tincidunt tortor vitae massa vulputate porta. </p>"
          },
          picture: { url: "https://satyr.io/1350x1:1" },
          "has-centered-content": "",
          "has-large-image": "",
          "is-reverse": "",
          "is-split": ""
        }
      }),
      _vm._v(" "),
      _c("doe-scroll-progress", {
        ref: "scrollProgress",
        staticClass: "fade-in",
        attrs: { "is-dark-text": "", "is-right": "", title: "The story" }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "founders" }, [
      _c("div", { staticClass: "founders-content" }, [
        _c("div", { staticClass: "content" }, [
          _c("h2", [_vm._v("Meet Fred & Sinji.")]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "Porttitor lobortis nullam suspendisse mattis conubia facilisis etiam arcu primis, blandit senectus natoque potenti euismod ante congue a accumsan cursus, ligula habitasse."
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "founders-item founders-item-left" }, [
        _c("span", { staticClass: "founders-item-toggle" }, [
          _vm._v("\n        From Fred\n        "),
          _c("span", { staticClass: "icon" }, [
            _c("span", { staticClass: "icon-play" })
          ])
        ]),
        _vm._v(" "),
        _c("img", {
          staticClass: "founders-item-image",
          attrs: { src: "/images/story-fred-portrait.jpg", alt: "" }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "founders-item founders-item-right" }, [
        _c("span", { staticClass: "founders-item-toggle" }, [
          _vm._v("\n        From Sinji\n        "),
          _c("span", { staticClass: "icon" }, [
            _c("span", { staticClass: "icon-play" })
          ])
        ]),
        _vm._v(" "),
        _c("img", {
          staticClass: "founders-item-image",
          attrs: { src: "/images/story-sinji-portrait.jpg", alt: "" }
        })
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-49131a8a", esExports)
  }
}

/***/ }),
/* 404 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(138);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3ea74058_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(432);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3ea74058_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3ea74058", Component.options)
  } else {
    hotAPI.reload("data-v-3ea74058", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_The500Page_vue__ = __webpack_require__(139);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3241d29b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_The500Page_vue__ = __webpack_require__(416);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_The500Page_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3241d29b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_The500Page_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/The500Page.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3241d29b", Component.options)
  } else {
    hotAPI.reload("data-v-3241d29b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 416 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "error error-500" },
    [
      _c("doe-content", [
        _c("h1", [_vm._v("Error")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "This internal server error is clearly on us. Apologies for the inconvenience. We expect to be back to normal shortly."
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "buttons is-center" },
          [_c("legent-link", { attrs: { text: "Take me back.", to: "/" } })],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3241d29b", esExports)
  }
}

/***/ }),
/* 417 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_The503Page_vue__ = __webpack_require__(140);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21e1c0c4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_The503Page_vue__ = __webpack_require__(418);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_The503Page_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21e1c0c4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_The503Page_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/The503Page.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-21e1c0c4", Component.options)
  } else {
    hotAPI.reload("data-v-21e1c0c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 418 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "error error-503" },
    [
      _c("doe-content", [
        _c("h1", [_vm._v("Site maintenance")]),
        _vm._v(" "),
        _c("p")
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-21e1c0c4", esExports)
  }
}

/***/ }),
/* 419 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheAgeGate_vue__ = __webpack_require__(141);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2af77e1e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheAgeGate_vue__ = __webpack_require__(424);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheAgeGate_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2af77e1e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheAgeGate_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/layout/TheAgeGate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2af77e1e", Component.options)
  } else {
    hotAPI.reload("data-v-2af77e1e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 420 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AgeGateBirthdate_vue__ = __webpack_require__(142);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0fc515cf_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AgeGateBirthdate_vue__ = __webpack_require__(423);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AgeGateBirthdate_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0fc515cf_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AgeGateBirthdate_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/components/forms/AgeGateBirthdate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0fc515cf", Component.options)
  } else {
    hotAPI.reload("data-v-0fc515cf", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 421 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return form; });
/* unused harmony export formSections */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities__ = __webpack_require__(60);

var form = {
  data: function data() {
    return {
      isSubmitting: false,
      isValid: false,
      notification: {
        message: '',
        status: 200,
        withClose: true
      },
      randomId: Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["a" /* randomId */])(),
      submitButton: 'Submit'
    };
  },
  computed: {
    canSubmit: function canSubmit() {
      return this.hasValidFields && this.requiredFieldsCount === this.validatedFieldsCount;
    },
    fields: function fields() {
      return this.randomId.length > 0 && this.findComponents(this.$refs.form, [], 'legent-input');
    },
    fieldKeys: function fieldKeys() {
      // field.field returns the field_name prop passed
      return this.fields.map(function (field) {
        return field.field;
      });
    },
    hasMatchingFields: function hasMatchingFields() {
      return this.matches.length > 0 && this.targets.length > 0;
    },
    hasValidFields: function hasValidFields() {
      return this.fields.filter(function (field) {
        return field.isInvalid;
      }).length === 0;
    },
    isDisabled: function isDisabled() {
      return !this.isValid || this.isSubmitting;
    },
    matches: function matches() {
      return this.fields.filter(function (field) {
        return field.match === true;
      });
    },
    targets: function targets() {
      return this.fields.filter(function (field) {
        return field.target === true;
      });
    },
    requiredFields: function requiredFields() {
      return this.fields.filter(function (field) {
        return field.required === true;
      });
    },
    requiredFieldsCount: function requiredFieldsCount() {
      return this.requiredFields.length;
    },
    submitButtonText: function submitButtonText() {
      return this.isSubmitting ? 'Please wait...' : this.submitButton;
    },
    validatedFields: function validatedFields() {
      return this.requiredFields.filter(function (field) {
        return field.validated === true;
      });
    },
    validatedFieldsCount: function validatedFieldsCount() {
      return this.validatedFields.length;
    }
  },
  methods: {
    checkValidation: function checkValidation() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.hasMatchingFields && _this.matches[0].value !== _this.targets[0].value) {
          _this.matches[0].setError("Must match ".concat(_this.targets[0].humanName));
        }

        _this.isValid = _this.canSubmit;
      });
    },
    clearFields: function clearFields() {
      this.fields.map(function (field) {
        return field.resetField();
      });
    },
    findComponents: function findComponents(startingComponent, componentArray, target) {
      var _this2 = this;

      if (startingComponent === undefined) {
        return componentArray;
      }

      if (startingComponent.$options._componentTag === target) {
        componentArray.push(startingComponent);
      }

      startingComponent.$children.forEach(function (childComponent) {
        _this2.findComponents(childComponent, componentArray, target);
      });
      return componentArray;
    },
    findField: function findField(key) {
      return this.fields.find(function (field) {
        return field.field === key;
      });
    },
    handleFormClose: function handleFormClose() {
      this.notification = {
        message: '',
        status: 200,
        withClose: true
      };
      return this.notification;
    },
    setErrors: function setErrors() {
      var _this3 = this;

      var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (errors && Object.keys(errors).length > 0) {
        this.fieldKeys.forEach(function (key) {
          if (errors[key]) {
            _this3.findField(key).setError(errors[key].join(', '));
          }
        });
      }
    },
    getFormData: function getFormData() {
      var formData = {}; // add component-based fields

      this.fields.forEach(function (field) {
        // field.field returns the field_name prop
        // field.value returns current field value
        formData[field.field] = field.value;
      });
      return formData;
    },
    updateRandomId: function updateRandomId() {
      this.randomId = Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["a" /* randomId */])();
    }
  }
};
var formSections = {
  data: function data() {
    return {
      fieldsBySection: {},
      currentSection: 0,
      sectionValid: false
    };
  },
  mounted: function mounted() {
    this.fieldsBySection = this.setSectionFields();

    if (this.sections.length) {
      this.sections[this.currentSection].isActive = true;
    }
  },
  computed: {
    canSubmitSection: function canSubmitSection() {
      return this.sectionHasValidFields && this.sectionRequiredFieldsCount === this.sectionValidatedFieldsCount;
    },
    sections: function sections() {
      return this.findComponents(this.$refs.form, [], 'base-form-section');
    },
    isSectionDisabled: function isSectionDisabled() {
      return !this.sectionValid;
    },
    sectionHasMatchingFields: function sectionHasMatchingFields() {
      return this.sectionMatches.length > 0 && this.sectionTargets.length > 0;
    },
    sectionHasValidFields: function sectionHasValidFields() {
      return this.fields.filter(function (field) {
        return field.isInvalid;
      }).length === 0;
    },
    sectionMatches: function sectionMatches() {
      return this.sectionFields.filter(function (field) {
        return field.match === true;
      });
    },
    sectionTargets: function sectionTargets() {
      return this.sectionFields.filter(function (field) {
        return field.target === true;
      });
    },
    sectionFields: function sectionFields() {
      return this.fieldsBySection[this.currentSection];
    },
    sectionFieldKeys: function sectionFieldKeys() {
      // field.field returns the field_name prop passed
      return this.sectionFields.map(function (field) {
        return field.field;
      });
    },
    sectionRequiredFields: function sectionRequiredFields() {
      return this.sectionFields.filter(function (field) {
        return field.required === true;
      });
    },
    sectionRequiredFieldsCount: function sectionRequiredFieldsCount() {
      return this.sectionRequiredFields.length;
    },
    sectionValidatedFields: function sectionValidatedFields() {
      return this.sectionRequiredFields.filter(function (field) {
        return field.validated === true;
      });
    },
    sectionValidatedFieldsCount: function sectionValidatedFieldsCount() {
      return this.sectionValidatedFields.length;
    }
  },
  methods: {
    // here to be overrriden in individual components if needed
    beforeNextSection: function beforeNextSection() {},
    checkSectionValidation: function checkSectionValidation() {
      var _this4 = this;

      this.$nextTick(function () {
        if (_this4.sectionHasMatchingFields && _this4.sectionMatches[0].value !== _this4.sectionTargets[0].value) {
          _this4.sectionMatches[0].setError("Must match ".concat(_this4.sectionTargets[0].humanName));
        }

        _this4.sectionValid = _this4.canSubmitSection;
      });
    },
    findComponents: function findComponents(startingComponent, componentArray, target) {
      var _this5 = this;

      if (startingComponent === undefined) {
        return componentArray;
      }

      if (startingComponent.$options._componentTag === target) {
        componentArray.push(startingComponent);
      }

      startingComponent.$children.forEach(function (childComponent) {
        _this5.findComponents(childComponent, componentArray, target);
      });
      return componentArray;
    },
    findField: function findField(key) {
      return this.fields.find(function (field) {
        return field.field === key;
      });
    },
    setSectionFields: function setSectionFields() {
      var _this6 = this;

      var sectionFields = [];
      this.sections.forEach(function (section) {
        sectionFields.push(_this6.findComponents(section, [], 'legent-input'));
      });
      return sectionFields;
    },
    goToSection: function goToSection() {
      var _this7 = this;

      this.sections.forEach(function (section) {
        section.isActive = false;
      });
      this.sections[this.currentSection].isActive = true;
      this.$nextTick(function () {
        if (!_this7.sectionFields[0].disabled) {
          _this7.sectionFields[0].setFocus();
        }
      });
    },
    handlePrevSection: function handlePrevSection(e) {
      e.preventDefault();
      this.currentSection--;
      this.goToSection();
      this.handleSectionChange();
      this.handleScrollTop();
    },
    handleNextSection: function handleNextSection(e) {
      e.preventDefault();
      this.beforeNextSection();
      this.currentSection++;
      this.goToSection();
      this.handleSectionChange();
      this.handleScrollTop();
    },
    handleScrollTop: function handleScrollTop() {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    },
    handleSectionChange: function handleSectionChange() {
      this.sectionValid = this.sectionRequiredFieldsCount === this.sectionValidatedFieldsCount;
    }
  }
};


/***/ }),
/* 422 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.classNames }, [
    _c("label", { staticClass: "label" }, [_vm._v("Birthday*")]),
    _vm._v(" "),
    _c("div", { staticClass: "control" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model.number",
            value: _vm.month,
            expression: "month",
            modifiers: { number: true }
          }
        ],
        ref: "month",
        staticClass: "input as-text",
        attrs: {
          type: "tel",
          name: "month",
          placeholder: "MM",
          maxlength: "2"
        },
        domProps: { value: _vm.month },
        on: {
          keyup: _vm.handleKeyUp,
          keydown: _vm.handleKeyDown,
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.month = _vm._n($event.target.value)
          },
          blur: function($event) {
            _vm.$forceUpdate()
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "control" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model.number",
            value: _vm.day,
            expression: "day",
            modifiers: { number: true }
          }
        ],
        ref: "day",
        staticClass: "input as-text",
        attrs: { type: "tel", name: "day", placeholder: "DD", maxlength: "2" },
        domProps: { value: _vm.day },
        on: {
          keyup: _vm.handleKeyUp,
          keydown: _vm.handleKeyDown,
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.day = _vm._n($event.target.value)
          },
          blur: function($event) {
            _vm.$forceUpdate()
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "control" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model.number",
            value: _vm.year,
            expression: "year",
            modifiers: { number: true }
          }
        ],
        ref: "year",
        staticClass: "input as-text",
        attrs: {
          type: "tel",
          name: "year",
          placeholder: "YYYY",
          maxlength: "4"
        },
        domProps: { value: _vm.year },
        on: {
          keyup: _vm.handleKeyUp,
          keydown: _vm.handleKeyDown,
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.year = _vm._n($event.target.value)
          },
          blur: function($event) {
            _vm.$forceUpdate()
          }
        }
      })
    ]),
    _vm._v(" "),
    _vm.showHelperText && _vm.hasError
      ? _c("p", {
          staticClass: "helper",
          domProps: { innerHTML: _vm._s(_vm.helperText) }
        })
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6800cfc5", esExports)
  }
}

/***/ }),
/* 423 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "age-gate-birthdate" },
    [
      _c("h1", { staticClass: "text-center" }, [_vm._v("Welcome")]),
      _vm._v(" "),
      _c("p", { staticClass: "text-center" }, [
        _vm._v("You must be 21 to enter.")
      ]),
      _vm._v(" "),
      _c(
        "base-form",
        {
          ref: "form",
          on: { "input-changed": _vm.handleChange },
          nativeOn: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.handleSubmit($event)
            }
          }
        },
        [
          _c(
            "div",
            { staticClass: "fields is-center" },
            [
              _c("legent-birthday", {
                attrs: { country: _vm.currentCountry },
                on: {
                  birthdayInvalid: _vm.handlebirthdateInvalid,
                  birthdayValid: _vm.handlebirthdateValid
                }
              }),
              _vm._v(" "),
              _c(
                "legent-input",
                {
                  attrs: {
                    icon: _vm.currentCountry.abbreviation,
                    "has-flag": "",
                    field: "country",
                    select: "",
                    "skip-validation": ""
                  }
                },
                _vm._l(_vm.activeCountries, function(countryOption) {
                  return _c(
                    "base-option",
                    {
                      key: countryOption.abbreviation,
                      attrs: {
                        selected: countryOption.name === _vm.country,
                        value: countryOption.name
                      }
                    },
                    [
                      _vm._v(
                        "\n          " +
                          _vm._s(countryOption.name) +
                          "\n        "
                      )
                    ]
                  )
                })
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "field-with-button" },
            [
              _c("legent-input", {
                attrs: { field: "remember_me", checkbox: "" }
              }),
              _vm._v(" "),
              _c("legent-link", { attrs: { "is-button": "", text: "Enter" } })
            ],
            1
          ),
          _vm._v(" "),
          _c("small", { staticClass: "block text-center" }, [
            _vm._v("\n      By entering you agree to our\n      "),
            _c(
              "a",
              {
                attrs: {
                  href: "/terms-conditions?tos=ok",
                  target: "_blank",
                  rel: "noopener"
                }
              },
              [_vm._v("\n        Terms and Conditions\n      ")]
            ),
            _vm._v("\n      &\n      "),
            _c(
              "a",
              {
                attrs: {
                  href: "/privacy-policy?tos=ok",
                  target: "_blank",
                  rel: "noopener"
                }
              },
              [_vm._v("\n        Privacy Policy\n      ")]
            ),
            _vm._v(".\n    ")
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0fc515cf", esExports)
  }
}

/***/ }),
/* 424 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "age-gate" }, [
    _c("div", { staticClass: "age-gate-header" }),
    _vm._v(" "),
    _c("div", { staticClass: "age-gate-body" }, [
      _c(
        "div",
        { staticClass: "age-gate-content" },
        [
          _c(
            "transition",
            { attrs: { name: "fade", mode: "out-in" } },
            [_c("age-gate-birthdate", { on: { success: _vm.handleSuccess } })],
            1
          )
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "age-gate-footer" }, [
      _c("p", [_vm._v("©" + _vm._s(_vm.copyrightYear) + " Legent")])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2af77e1e", esExports)
  }
}

/***/ }),
/* 425 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheHeader_vue__ = __webpack_require__(146);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d93fbd6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheHeader_vue__ = __webpack_require__(427);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheHeader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d93fbd6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheHeader_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/layout/TheHeader.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d93fbd6", Component.options)
  } else {
    hotAPI.reload("data-v-5d93fbd6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 426 */
/***/ (function(module, exports) {

var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"viewBox":"0 0 143 27","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M74.598 1.9h15.638l1.052 2.514c-1.323-1.41-2.853-1.53-6.082-1.53h-8.108v9.378h8.918l-.333 1.029-.337 1.044c-.29-.84-1.163-1.004-2.605-1.035h-5.643v9.762h7.533c3.228 0 5.746-.337 6.906-1.89l-1.108 2.873h-15.83V1.9zm-2.027.406v21.388L71 26h21v-7.851l-2.721 2.467H79.046V15.32h6.917l1.887-4.838h-8.804V5.03h10.327L92 7.24V0H71l1.57 2.306zM64.335 14.57h2.57v8.455c-1.32.866-4.48 2.056-7.708 2.056-6.476 0-12.101-3.593-12.101-11.274 0-6.002 4.343-11.222 11.977-11.222 3.102 0 5.227.746 7.469 1.487l.462 2.864c-.91-2.078-4.577-3.656-7.846-3.656-4.373 0-9.694 3.199-9.694 10.367 0 7.934 4.573 10.688 9.81 10.688 3.03 0 4.693-1.37 5.061-2.015v-4.618c0-1.964-.158-2.814-1.461-3.133h1.461zm-2.052 1.454v5.291c-1.148.368-2.163.516-3.46.516-3.3 0-6.485-2.696-6.485-8.065 0-5.337 2.95-8.064 6.768-8.064 3.64 0 6.298 1.142 8.816 3.222V.26l-1.835 1.432C64.112.953 61.79.534 58.987.534c-7.675 0-13.594 4.876-13.594 13.232C45.393 22.124 50.57 27 58.418 27c4.37 0 7.306-.803 10.519-2.762V13.766h-8.268l1.614 2.258zM20.32 21.172l-1.14 2.873H3.67V5.098c0-2.004-.16-2.872-1.465-3.197H7.534c-1.288.32-1.289 1.173-1.289 3.12v18.041h7.757c3.324 0 5.125-.337 6.319-1.89zm-12.036-.556V2.306L9.9 0H0l1.616 2.306v21.388L0 26h21v-7.851l-2.8 2.467H8.283zM114.184 1.9h2.476c-1.283.326-1.44 1.195-1.44 3.2v18.83h-1.981L98.565 3.316v17.412c0 2.007.155 2.877 1.438 3.202H96.089c1.283-.325 1.438-1.195 1.438-3.202V1.901h3.272l13.385 18.588V5.093c-.001-2-.158-2.867-1.44-3.192h1.44zm-1.842.406v12.476L101.964 0H94l1.588 2.183v21.511L94 26h8.247l-1.587-2.306V9.407L112.307 26h5.106V2.306L119 0h-8.246l1.588 2.306zM138.057 2.905h-4.877v17.208c0 2.265.187 3.334 1.465 3.793h-5.289c1.278-.46 1.464-1.528 1.464-3.793V2.905h-4.876c-2.335 0-3.545.12-4.356 1.587l.706-2.569h19.412l.707 2.57c-.812-1.468-2.021-1.588-4.356-1.588zM121 0v7.499l2.71-2.468h5.066v18.663L127.213 26h9.575l-1.563-2.306V5.031h5.066L143 7.499V0h-22zM25.598 1.9h15.638l1.052 2.514c-1.323-1.41-2.854-1.53-6.082-1.53h-8.108v9.378h8.918l-.333 1.029-.337 1.044c-.29-.84-1.163-1.004-2.605-1.035h-5.643v9.762h7.533c3.228 0 5.745-.337 6.906-1.89l-1.11 2.873h-15.83V1.9zm-2.027.406v21.388L22 26h21v-7.851l-2.721 2.467H30.046V15.32h6.917l1.886-4.838h-8.803V5.03h10.326L43 7.24V0H22l1.57 2.306z"}})])};var toString = function () {return "/Users/kglass/Forks/legent-frontend/src/images/legent-logo.svg"};module.exports = { render: render, toString: toString };

/***/ }),
/* 427 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "header",
    { staticClass: "masthead", attrs: { role: "masthead" } },
    [
      _c(
        "legent-link",
        { staticClass: "masthead-logo", attrs: { href: "/", "is-anchor": "" } },
        [
          _c("span", { staticClass: "visually-hidden" }, [_vm._v("Legent")]),
          _vm._v(" "),
          _c("legent-logo")
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d93fbd6", esExports)
  }
}

/***/ }),
/* 428 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheFooter_vue__ = __webpack_require__(147);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c6197e4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheFooter_vue__ = __webpack_require__(429);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheFooter_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c6197e4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheFooter_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/layout/TheFooter.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c6197e4", Component.options)
  } else {
    hotAPI.reload("data-v-3c6197e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 429 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("footer", { staticClass: "footer", attrs: { role: "contentinfo" } })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3c6197e4", esExports)
  }
}

/***/ }),
/* 430 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheOfflinePage_vue__ = __webpack_require__(148);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_601375e9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheOfflinePage_vue__ = __webpack_require__(431);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TheOfflinePage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_601375e9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TheOfflinePage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/TheOfflinePage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-601375e9", Component.options)
  } else {
    hotAPI.reload("data-v-601375e9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 431 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "error error-503", attrs: { "data-theme": "dark" } },
    [
      _c(
        "div",
        { staticClass: "error-content" },
        [
          _c("doe-content", [
            _c("h1", [_vm._v("Offline")]),
            _vm._v(" "),
            _c("p", [_vm._v("Your device has no connection.")])
          ])
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-601375e9", esExports)
  }
}

/***/ }),
/* 432 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c(
        "a",
        { staticClass: "skip-link visually-hidden", attrs: { href: "#main" } },
        [_vm._v("\n    Skip to content\n  ")]
      ),
      _vm._v(" "),
      !_vm.isOldEnough
        ? _c(
            "transition",
            { attrs: { name: "fadeDown", appear: "", mode: "out-in" } },
            [
              _c("the-age-gate", {
                on: { "passed-age-gate": _vm.handlePassedAgeGate }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("the-header"),
      _vm._v(" "),
      _vm.show500Page
        ? _c("the-500-page")
        : _vm.show503Page
          ? _c("the-503-page")
          : _vm.showOfflinePage
            ? _c("the-offline-page")
            : _c(
                "keep-alive",
                [
                  _c("router-view", {
                    key: _vm.$route.fullPath,
                    attrs: { id: "main" },
                    on: { "page-activated": _vm.handlePageActivated }
                  })
                ],
                1
              ),
      _vm._v(" "),
      _c("the-footer"),
      _vm._v(" "),
      _c("portal-target", { attrs: { name: "modals", slim: "" } }),
      _vm._v(" "),
      _c("transition", { attrs: { name: _vm.pageLoadingTransition } }, [
        _vm.pageLoading ? _c("div", { staticClass: "page-loading" }) : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { attrs: { id: "outdated" } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3ea74058", esExports)
  }
}

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./BaseAnchor.vue": 434,
	"./BaseBlockquote.vue": 150,
	"./BaseButton.vue": 437,
	"./BaseCheckbox.vue": 153,
	"./BaseCite.vue": 440,
	"./BaseDefinitionList.vue": 442,
	"./BaseFigure.vue": 444,
	"./BaseForm.vue": 446,
	"./BaseFormSection.vue": 448,
	"./BaseIcon.vue": 450,
	"./BaseIframe.vue": 452,
	"./BaseInput.vue": 454,
	"./BaseOption.vue": 456,
	"./BaseOrderedList.vue": 164,
	"./BasePicture.vue": 459,
	"./BaseRadio.vue": 167,
	"./BaseSelect.vue": 464,
	"./BaseTable.vue": 170,
	"./BaseTextarea.vue": 467,
	"./BaseUnorderedList.vue": 173,
	"./BaseVideo.vue": 470
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 433;

/***/ }),
/* 434 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseAnchor_vue__ = __webpack_require__(149);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fe8e3a52_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseAnchor_vue__ = __webpack_require__(435);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseAnchor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fe8e3a52_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseAnchor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseAnchor.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fe8e3a52", Component.options)
  } else {
    hotAPI.reload("data-v-fe8e3a52", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 435 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      attrs: {
        href: _vm.href,
        rel: _vm.rel,
        target: _vm.target,
        title: _vm.title
      }
    },
    [
      _vm.icon ? _c("base-icon", { attrs: { icon: _vm.icon } }) : _vm._e(),
      _vm._v(" "),
      _c(
        "span",
        [_vm._t("default", [_vm._v("\n      " + _vm._s(_vm.text) + "\n    ")])],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fe8e3a52", esExports)
  }
}

/***/ }),
/* 436 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "blockquote",
    [
      _c("p", { domProps: { innerHTML: _vm._s(_vm.content) } }),
      _vm._v(" "),
      _vm.hasCite
        ? _c("base-cite", {
            attrs: { title: _vm.cite.title, content: _vm.cite.content }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-50211831", esExports)
  }
}

/***/ }),
/* 437 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseButton_vue__ = __webpack_require__(152);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_39307e58_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseButton_vue__ = __webpack_require__(438);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseButton_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_39307e58_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseButton_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseButton.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39307e58", Component.options)
  } else {
    hotAPI.reload("data-v-39307e58", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 438 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    { attrs: { disabled: _vm.disabled, title: _vm.title, type: _vm.type } },
    [
      _vm.icon ? _c("base-icon", { attrs: { icon: _vm.icon } }) : _vm._e(),
      _vm._v(" "),
      _c(
        "span",
        [_vm._t("default", [_vm._v("\n      " + _vm._s(_vm.text) + "\n    ")])],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-39307e58", esExports)
  }
}

/***/ }),
/* 439 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "input",
    _vm._b(
      { attrs: { type: "checkbox" } },
      "input",
      {
        id: _vm.id,
        name: _vm.name,
        disabled: _vm.disabled,
        required: _vm.required,
        value: _vm.value,
        checked: _vm.checked
      },
      false
    )
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4c4e2a65", esExports)
  }
}

/***/ }),
/* 440 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseCite_vue__ = __webpack_require__(155);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60c5da0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseCite_vue__ = __webpack_require__(441);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseCite_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60c5da0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseCite_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseCite.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60c5da0e", Component.options)
  } else {
    hotAPI.reload("data-v-60c5da0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 441 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("cite", {
    attrs: { title: _vm.title },
    domProps: { innerHTML: _vm._s(_vm.content) }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-60c5da0e", esExports)
  }
}

/***/ }),
/* 442 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseDefinitionList_vue__ = __webpack_require__(156);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_74aebe9a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseDefinitionList_vue__ = __webpack_require__(443);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseDefinitionList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_74aebe9a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseDefinitionList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseDefinitionList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74aebe9a", Component.options)
  } else {
    hotAPI.reload("data-v-74aebe9a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 443 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "dl",
    [
      _vm._l(_vm.list, function(item, itemIndex) {
        return [
          _c("dt", {
            key: "t" + itemIndex,
            domProps: { innerHTML: _vm._s(item.term) }
          }),
          _vm._v(" "),
          _vm._l(item.descriptions, function(description, descriptionIndex) {
            return _c("dd", {
              key: "d" + itemIndex + descriptionIndex,
              domProps: { innerHTML: _vm._s(description) }
            })
          })
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-74aebe9a", esExports)
  }
}

/***/ }),
/* 444 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseFigure_vue__ = __webpack_require__(157);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_972208f4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseFigure_vue__ = __webpack_require__(445);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseFigure_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_972208f4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseFigure_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseFigure.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-972208f4", Component.options)
  } else {
    hotAPI.reload("data-v-972208f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 445 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "figure",
    [
      _c("base-picture", { attrs: { picture: _vm.picture } }),
      _vm._v(" "),
      _vm.hasCaption
        ? _c("figcaption", [_vm._v("\n    " + _vm._s(_vm.caption) + "\n  ")])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-972208f4", esExports)
  }
}

/***/ }),
/* 446 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseForm_vue__ = __webpack_require__(158);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_41ad07e6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseForm_vue__ = __webpack_require__(447);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseForm_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_41ad07e6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseForm_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-41ad07e6", Component.options)
  } else {
    hotAPI.reload("data-v-41ad07e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 447 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      staticClass: "form",
      attrs: {
        action: _vm.action,
        method: _vm.method,
        "accept-charset": "UTF-8",
        role: "form"
      },
      on: { input: _vm.handleInput }
    },
    [
      _vm.showNotification
        ? _c("legent-notification", {
            attrs: {
              content: { p: _vm.notification.message },
              "has-close": _vm.notification.withClose
            },
            on: { close: _vm.handleClose }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-41ad07e6", esExports)
  }
}

/***/ }),
/* 448 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseFormSection_vue__ = __webpack_require__(159);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4c70d462_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseFormSection_vue__ = __webpack_require__(449);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseFormSection_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4c70d462_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseFormSection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseFormSection.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c70d462", Component.options)
  } else {
    hotAPI.reload("data-v-4c70d462", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 449 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.isActive,
          expression: "isActive"
        }
      ],
      staticClass: "form-section",
      on: { input: _vm.handleInput }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4c70d462", esExports)
  }
}

/***/ }),
/* 450 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseIcon_vue__ = __webpack_require__(160);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d1555ca_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseIcon_vue__ = __webpack_require__(451);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseIcon_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d1555ca_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseIcon_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseIcon.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d1555ca", Component.options)
  } else {
    hotAPI.reload("data-v-0d1555ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 451 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.hasIcon
    ? _c("span", { staticClass: "icon" }, [
        _c("span", { class: _vm.iconClass })
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0d1555ca", esExports)
  }
}

/***/ }),
/* 452 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseIframe_vue__ = __webpack_require__(161);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20a61346_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseIframe_vue__ = __webpack_require__(453);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseIframe_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20a61346_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseIframe_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseIframe.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20a61346", Component.options)
  } else {
    hotAPI.reload("data-v-20a61346", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 453 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.hasSrc
    ? _c("div", { staticClass: "iframe-container" }, [
        _c("iframe", {
          attrs: { src: _vm.src, frameborder: "0", scrolling: "auto" }
        })
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-20a61346", esExports)
  }
}

/***/ }),
/* 454 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseInput_vue__ = __webpack_require__(162);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1f17c7d0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseInput_vue__ = __webpack_require__(455);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseInput_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1f17c7d0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseInput_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f17c7d0", Component.options)
  } else {
    hotAPI.reload("data-v-1f17c7d0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 455 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.type === "text"
    ? _c(
        "input",
        _vm._g(
          _vm._b(
            {
              staticClass: "input",
              attrs: { type: _vm.type },
              domProps: { value: _vm.value }
            },
            "input",
            _vm.$attrs,
            false
          ),
          _vm.inputListeners
        )
      )
    : _c(
        "input",
        _vm._g(
          _vm._b(
            {
              staticClass: "input",
              attrs: { type: _vm.type },
              domProps: { checked: _vm.checked, value: _vm.value }
            },
            "input",
            _vm.$attrs,
            false
          ),
          _vm.inputListeners
        )
      )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1f17c7d0", esExports)
  }
}

/***/ }),
/* 456 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseOption_vue__ = __webpack_require__(163);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1fe7c897_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseOption_vue__ = __webpack_require__(457);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseOption_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1fe7c897_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseOption_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseOption.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fe7c897", Component.options)
  } else {
    hotAPI.reload("data-v-1fe7c897", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 457 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "option",
    _vm._g(
      _vm._b(
        {
          staticClass: "option",
          domProps: { selected: _vm.isSelected, value: _vm.value }
        },
        "option",
        _vm.$attrs,
        false
      ),
      _vm.inputListeners
    ),
    [_vm._v("\n  " + _vm._s(_vm.field) + "\n  "), _vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1fe7c897", esExports)
  }
}

/***/ }),
/* 458 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ol",
    _vm._l(_vm.items, function(item, index) {
      return _c("li", { key: index, domProps: { innerHTML: _vm._s(item) } })
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7161ac0e", esExports)
  }
}

/***/ }),
/* 459 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BasePicture_vue__ = __webpack_require__(166);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ad96dc68_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BasePicture_vue__ = __webpack_require__(462);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BasePicture_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ad96dc68_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BasePicture_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BasePicture.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ad96dc68", Component.options)
  } else {
    hotAPI.reload("data-v-ad96dc68", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 460 */,
/* 461 */,
/* 462 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.imageClassNames }, [
    _vm.hasLoadingUrl
      ? _c(
          "div",
          { staticClass: "image-placeholder", style: _vm.loadingStyle },
          [_c("canvas", { ref: "canvas" })]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.hasSources
      ? _c(
          "picture",
          [
            _vm._l(_vm.picture.sources, function(source, index) {
              return _c("source", {
                key: index,
                attrs: { media: source.mediaQuery, "data-srcset": source.url }
              })
            }),
            _vm._v(" "),
            _c("img", {
              ref: "image",
              staticClass: "image-content",
              attrs: {
                alt: _vm.picture.alt,
                "data-src": _vm.picture.url,
                src: _vm.svgImage,
                title: _vm.picture.title
              }
            })
          ],
          2
        )
      : _vm.hasSrcSet
        ? _c("img", {
            ref: "image",
            staticClass: "image-content",
            attrs: {
              alt: _vm.picture.alt,
              "data-src": _vm.picture.url,
              "data-srcset": _vm.picture.srcset,
              src: _vm.svgImage,
              title: _vm.picture.title,
              sizes: "100vw"
            }
          })
        : _c("img", {
            ref: "image",
            staticClass: "image-content",
            attrs: {
              alt: _vm.picture.alt,
              "data-src": _vm.picture.url,
              src: _vm.svgImage,
              title: _vm.picture.title
            }
          })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ad96dc68", esExports)
  }
}

/***/ }),
/* 463 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "input",
    _vm._b({ attrs: { type: "radio" } }, "input", _vm.bindings, false)
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-50e157c9", esExports)
  }
}

/***/ }),
/* 464 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseSelect_vue__ = __webpack_require__(169);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b54d99e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseSelect_vue__ = __webpack_require__(465);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseSelect_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b54d99e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseSelect_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseSelect.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b54d99e", Component.options)
  } else {
    hotAPI.reload("data-v-6b54d99e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 465 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "select",
    _vm._g(
      _vm._b(
        { staticClass: "select", domProps: { value: _vm.value } },
        "select",
        _vm.$attrs,
        false
      ),
      _vm.inputListeners
    ),
    [
      !_vm.noDefault
        ? _c("base-option", { attrs: { disabled: "" } }, [
            _vm._v("\n    Select an option\n  ")
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6b54d99e", esExports)
  }
}

/***/ }),
/* 466 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.showTable
    ? _c("table", [
        _vm.showHeader
          ? _c("thead", [
              _c(
                "tr",
                _vm._l(_vm.headerRows, function(headerRow) {
                  return _c("th", [
                    _vm._v("\n        " + _vm._s(headerRow) + "\n      ")
                  ])
                })
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.showBody
          ? _c(
              "tbody",
              _vm._l(_vm.bodyRows, function(bodyRow) {
                return _c(
                  "tr",
                  _vm._l(bodyRow, function(data) {
                    return _c("td", [
                      _vm._v("\n        " + _vm._s(data) + "\n      ")
                    ])
                  })
                )
              })
            )
          : _vm._e()
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-142f5e1c", esExports)
  }
}

/***/ }),
/* 467 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseTextarea_vue__ = __webpack_require__(172);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37ae325c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseTextarea_vue__ = __webpack_require__(468);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseTextarea_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37ae325c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseTextarea_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseTextarea.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37ae325c", Component.options)
  } else {
    hotAPI.reload("data-v-37ae325c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 468 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "textarea" }, [
    _c("pre", [
      _c("span", { domProps: { innerHTML: _vm._s(_vm.value) } }),
      _c("br")
    ]),
    _vm._v(" "),
    _c(
      "textarea",
      _vm._g(
        _vm._b(
          {
            ref: "textarea",
            staticClass: "textarea",
            attrs: { cols: _vm.columns, rows: _vm.rows },
            domProps: { value: _vm.value }
          },
          "textarea",
          _vm.$attrs,
          false
        ),
        _vm.inputListeners
      )
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-37ae325c", esExports)
  }
}

/***/ }),
/* 469 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    _vm._l(_vm.items, function(item, index) {
      return _c("li", { key: index, domProps: { innerHTML: _vm._s(item) } })
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4e0e40c0", esExports)
  }
}

/***/ }),
/* 470 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseVideo_vue__ = __webpack_require__(175);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4badcf6e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseVideo_vue__ = __webpack_require__(471);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BaseVideo_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4badcf6e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BaseVideo_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/base/BaseVideo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4badcf6e", Component.options)
  } else {
    hotAPI.reload("data-v-4badcf6e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 471 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "video",
    {
      ref: "video",
      attrs: {
        autoplay: _vm.autoplay,
        "data-loaded": _vm.isLoaded,
        "data-poster": _vm.posterUrl,
        loop: _vm.loop,
        playsinline: _vm.playsinline,
        poster: _vm.placeholderPoster,
        "data-object-fit": "cover"
      },
      domProps: { muted: _vm.muted }
    },
    [
      _vm.hasUrl
        ? [
            _c("source", {
              attrs: {
                "data-src": _vm.url,
                media: "(min-width: 641px)",
                type: "video/mp4"
              }
            }),
            _vm._v(" "),
            _c("source", {
              attrs: { "data-src": _vm.urlMobile, type: "video/mp4" }
            })
          ]
        : [
            _c("source", {
              attrs: { "data-src": _vm.webmUrl, type: "video/webm" }
            }),
            _vm._v(" "),
            _c("source", {
              attrs: { "data-src": _vm.mp4Url, type: "video/mp4" }
            })
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4badcf6e", esExports)
  }
}

/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./LegentAddressInputs.vue": 473,
	"./LegentBirthday.vue": 144,
	"./LegentBlockquote.vue": 479,
	"./LegentFieldWrapper.vue": 481,
	"./LegentInput.vue": 483,
	"./LegentLink.vue": 485,
	"./LegentList.vue": 487,
	"./LegentLoading.vue": 489,
	"./LegentNotification.vue": 491,
	"./LegentRadio.vue": 493,
	"./LegentSwitch.vue": 495,
	"./LegentSwitchWrapper.vue": 497,
	"./LegentTable.vue": 499,
	"./LegentVideoBackground.vue": 501
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 472;

/***/ }),
/* 473 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentAddressInputs_vue__ = __webpack_require__(176);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5dc76836_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentAddressInputs_vue__ = __webpack_require__(478);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentAddressInputs_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5dc76836_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentAddressInputs_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentAddressInputs.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5dc76836", Component.options)
  } else {
    hotAPI.reload("data-v-5dc76836", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 474 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeColumn_vue__ = __webpack_require__(177);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f40404e4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeColumn_vue__ = __webpack_require__(475);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeColumn_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f40404e4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeColumn_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/doe/DoeColumn.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f40404e4", Component.options)
  } else {
    hotAPI.reload("data-v-f40404e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 475 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.classNames }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f40404e4", esExports)
  }
}

/***/ }),
/* 476 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeColumns_vue__ = __webpack_require__(178);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d6d5555_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeColumns_vue__ = __webpack_require__(477);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoeColumns_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d6d5555_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoeColumns_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/doe/DoeColumns.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d6d5555", Component.options)
  } else {
    hotAPI.reload("data-v-3d6d5555", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 477 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.styleModifiers }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3d6d5555", esExports)
  }
}

/***/ }),
/* 478 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "address-fields" },
    [
      _c("legent-input", {
        attrs: {
          field: _vm.fieldNames.address1,
          address: "",
          label: "Address*",
          required: ""
        }
      }),
      _vm._v(" "),
      _c("legent-input", {
        attrs: {
          field: _vm.fieldNames.address2,
          address: "",
          label: "Address 2"
        }
      }),
      _vm._v(" "),
      _c(
        "doe-columns",
        { attrs: { "animate-in": false } },
        [
          _c(
            "doe-column",
            { attrs: { size: "4" } },
            [
              _c("legent-input", {
                attrs: {
                  field: _vm.fieldNames.city,
                  label: "City*",
                  required: ""
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "doe-column",
            { attrs: { size: "4" } },
            [
              _c(
                "legent-input",
                {
                  attrs: {
                    field: _vm.fieldNames.state,
                    label: _vm.stateLabel,
                    select: "",
                    required: ""
                  }
                },
                _vm._l(_vm.stateOptions, function(option) {
                  return _c("base-option", {
                    key: option.abbreviation,
                    attrs: { value: option.abbreviation, field: option.name }
                  })
                })
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "doe-column",
            { attrs: { size: "4" } },
            [
              _c("legent-input", {
                directives: [
                  {
                    name: "mask",
                    rawName: "v-mask",
                    value: _vm.postalCodeMask,
                    expression: "postalCodeMask"
                  }
                ],
                attrs: {
                  field: _vm.fieldNames.postalCode,
                  placeholder: _vm.postalCodePlaceholder,
                  "postal-code": _vm.postalCodeFormat,
                  label: "Postal code*",
                  required: ""
                }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5dc76836", esExports)
  }
}

/***/ }),
/* 479 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentBlockquote_vue__ = __webpack_require__(179);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23a31257_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentBlockquote_vue__ = __webpack_require__(480);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentBlockquote_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23a31257_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentBlockquote_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentBlockquote.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23a31257", Component.options)
  } else {
    hotAPI.reload("data-v-23a31257", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 480 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("base-blockquote", {
    class: [_vm.blockquoteModifiers, _vm.styleModifiers],
    attrs: { cite: _vm.cite, content: _vm.content }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-23a31257", esExports)
  }
}

/***/ }),
/* 481 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentFieldWrapper_vue__ = __webpack_require__(180);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f3ff34fe_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentFieldWrapper_vue__ = __webpack_require__(482);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentFieldWrapper_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f3ff34fe_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentFieldWrapper_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentFieldWrapper.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f3ff34fe", Component.options)
  } else {
    hotAPI.reload("data-v-f3ff34fe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 482 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.options.wrapperClasses }, [
    _c("label", { staticClass: "label", attrs: { for: _vm.options.name } }, [
      _vm._v("\n    " + _vm._s(_vm.options.label) + "\n  ")
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "control" },
      [
        _vm.options.hasIcon
          ? _c("span", { staticClass: "icon" }, [
              _c("span", { class: _vm.options.iconClass })
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    ),
    _vm._v(" "),
    _vm.options.showHelper
      ? _c("p", {
          staticClass: "helper",
          domProps: { innerHTML: _vm._s(_vm.options.helperText) }
        })
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f3ff34fe", esExports)
  }
}

/***/ }),
/* 483 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentInput_vue__ = __webpack_require__(181);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d3be232_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentInput_vue__ = __webpack_require__(484);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentInput_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d3be232_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentInput_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d3be232", Component.options)
  } else {
    hotAPI.reload("data-v-0d3be232", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 484 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.isSwitch
    ? _c(
        "legent-switch-wrapper",
        { attrs: { options: _vm.fieldModifiers } },
        [
          _c("base-input", {
            class: _vm.calculatedClass,
            attrs: {
              checked: _vm.isChecked,
              disabled: _vm.disabled,
              id: _vm.id,
              name: _vm.field,
              required: _vm.required,
              type: _vm.calculatedType,
              value: _vm.value
            },
            on: {
              input: _vm.handleInput,
              blur: _vm.handleBlur,
              focus: _vm.handleFocus,
              change: _vm.handleChange
            }
          })
        ],
        1
      )
    : _c(
        "legent-field-wrapper",
        { attrs: { options: _vm.fieldModifiers } },
        [
          _vm.textarea
            ? _c("base-textarea", {
                attrs: {
                  autocomplete: _vm.field,
                  disabled: _vm.disabled,
                  id: _vm.field,
                  name: _vm.field,
                  required: _vm.required,
                  value: _vm.value
                },
                on: {
                  input: _vm.handleInput,
                  blur: _vm.handleBlur,
                  focus: _vm.handleFocus
                }
              })
            : _vm.select
              ? _c(
                  "base-select",
                  {
                    attrs: {
                      autocomplete: _vm.field,
                      disabled: _vm.disabled,
                      id: _vm.field,
                      name: _vm.field,
                      "no-default": _vm.noDefault,
                      required: _vm.required,
                      "select-options": _vm.selectOptions,
                      value: _vm.value
                    },
                    on: {
                      blur: _vm.handleBlur,
                      change: _vm.handleChange,
                      focus: _vm.handleFocus
                    }
                  },
                  [_vm._t("default")],
                  2
                )
              : _c("base-input", {
                  attrs: {
                    autocomplete: _vm.field,
                    disabled: _vm.disabled,
                    id: _vm.field,
                    name: _vm.field,
                    placeholder: _vm.placeholder,
                    required: _vm.required,
                    value: _vm.value,
                    type: _vm.calculatedType
                  },
                  on: {
                    input: _vm.handleInput,
                    blur: _vm.handleBlur,
                    focus: _vm.handleFocus
                  }
                })
        ],
        1
      )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0d3be232", esExports)
  }
}

/***/ }),
/* 485 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentLink_vue__ = __webpack_require__(182);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c1cda27c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentLink_vue__ = __webpack_require__(486);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentLink_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c1cda27c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentLink_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentLink.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c1cda27c", Component.options)
  } else {
    hotAPI.reload("data-v-c1cda27c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 486 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.isButton
    ? _c(
        "base-button",
        {
          class: [_vm.linkModifiers, _vm.styleModifiers],
          attrs: {
            disabled: _vm.disabled,
            text: _vm.text,
            icon: _vm.icon,
            "is-submit": _vm.isSubmit
          }
        },
        [_vm._t("default")],
        2
      )
    : _vm.shouldUseRouterLink
      ? _c(
          "router-link",
          {
            class: [_vm.linkModifiers, _vm.styleModifiers],
            attrs: { disabled: _vm.disabled, to: _vm.href }
          },
          [
            _vm.icon
              ? _c("base-icon", { attrs: { icon: _vm.icon } })
              : _vm._e(),
            _vm._v(" "),
            _c(
              "span",
              [
                _vm._t("default", [
                  _vm._v("\n      " + _vm._s(_vm.text) + "\n    ")
                ])
              ],
              2
            ),
            _vm._v(" "),
            _vm.isAbstract
              ? _c("svg", [
                  _c("circle", { attrs: { cx: "31", cy: "29", r: "20" } })
                ])
              : _vm._e()
          ],
          1
        )
      : _c(
          "base-anchor",
          {
            class: [_vm.linkModifiers, _vm.styleModifiers],
            attrs: {
              disabled: _vm.disabled,
              href: _vm.href,
              text: _vm.text,
              icon: _vm.icon,
              "new-window": _vm.newWindow
            }
          },
          [_vm._t("default")],
          2
        )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c1cda27c", esExports)
  }
}

/***/ }),
/* 487 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentList_vue__ = __webpack_require__(183);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_afbf8534_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentList_vue__ = __webpack_require__(488);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_afbf8534_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-afbf8534", Component.options)
  } else {
    hotAPI.reload("data-v-afbf8534", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 488 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.isOrdered
    ? _c("base-ordered-list", {
        class: [_vm.listModifiers, _vm.styleModifiers],
        attrs: { items: _vm.items }
      })
    : _c("base-unordered-list", {
        class: [_vm.listModifiers, _vm.styleModifiers],
        attrs: { items: _vm.items }
      })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-afbf8534", esExports)
  }
}

/***/ }),
/* 489 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentLoading_vue__ = __webpack_require__(184);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1da922b8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentLoading_vue__ = __webpack_require__(490);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentLoading_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1da922b8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentLoading_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentLoading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1da922b8", Component.options)
  } else {
    hotAPI.reload("data-v-1da922b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 490 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.show404Page
    ? _c("the-404-page")
    : _c("div", { staticClass: "loading" }, [_vm._v("\n  Loading...\n")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1da922b8", esExports)
  }
}

/***/ }),
/* 491 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentNotification_vue__ = __webpack_require__(185);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d936119a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentNotification_vue__ = __webpack_require__(492);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentNotification_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d936119a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentNotification_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentNotification.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d936119a", Component.options)
  } else {
    hotAPI.reload("data-v-d936119a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 492 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.active
    ? _c(
        "div",
        {
          staticClass: "notification",
          class: [_vm.notificationModifiers, _vm.styleModifiers]
        },
        [
          _vm.hasClose
            ? _c("legent-link", {
                staticClass: "is-delete",
                attrs: {
                  "is-submit": false,
                  icon: "cancel",
                  type: "button",
                  "is-button": "",
                  "is-small": "",
                  "is-transparent": "",
                  "is-icon-only": ""
                },
                nativeOn: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.closeNotification($event)
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "notification-content" },
            [
              _vm.content
                ? _c("doe-content", {
                    attrs: { h6: _vm.content.h6, p: _vm.content.p }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _vm.cancel || _vm.accept
            ? _c("div", { staticClass: "notification-action" }, [
                _c(
                  "div",
                  { staticClass: "buttons is-right" },
                  [
                    _vm.cancel
                      ? _c(
                          "legent-link",
                          {
                            attrs: {
                              "is-submit": false,
                              "is-button": "",
                              "is-small": ""
                            },
                            nativeOn: {
                              click: function($event) {
                                return _vm.closeNotification($event)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n        " + _vm._s(_vm.cancel) + "\n      "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.accept
                      ? _c(
                          "legent-link",
                          {
                            attrs: {
                              "is-submit": false,
                              "is-button": "",
                              "is-small": ""
                            },
                            nativeOn: {
                              click: function($event) {
                                return _vm.confirmNotification($event)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n        " + _vm._s(_vm.accept) + "\n      "
                            )
                          ]
                        )
                      : _vm._e()
                  ],
                  1
                )
              ])
            : _vm._e()
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d936119a", esExports)
  }
}

/***/ }),
/* 493 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentRadio_vue__ = __webpack_require__(186);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6da91de3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentRadio_vue__ = __webpack_require__(494);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentRadio_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6da91de3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentRadio_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentRadio.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6da91de3", Component.options)
  } else {
    hotAPI.reload("data-v-6da91de3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 494 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.radioModifiers }, [
    _c(
      "label",
      { attrs: { for: _vm.id } },
      [
        _c("BaseRadio", {
          attrs: {
            text: _vm.text,
            id: _vm.id,
            value: _vm.value,
            name: _vm.name,
            required: _vm.required,
            disabled: _vm.disabled,
            checked: _vm.checked
          }
        }),
        _vm._v(" "),
        _c("span"),
        _vm._v("\n    " + _vm._s(_vm.text) + "\n  ")
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6da91de3", esExports)
  }
}

/***/ }),
/* 495 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentSwitch_vue__ = __webpack_require__(187);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_35867cfc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentSwitch_vue__ = __webpack_require__(496);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentSwitch_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_35867cfc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentSwitch_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentSwitch.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35867cfc", Component.options)
  } else {
    hotAPI.reload("data-v-35867cfc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 496 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.switchModifiers }, [
    _c(
      "label",
      { attrs: { for: _vm.id } },
      [
        _c("BaseCheckbox", {
          attrs: {
            text: _vm.text,
            id: _vm.id,
            value: _vm.value,
            name: _vm.name,
            required: _vm.required,
            disabled: _vm.disabled,
            checked: _vm.checked
          }
        }),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _vm.isToggle ? _c("span") : _vm._e(),
        _vm._v("\n    " + _vm._s(_vm.text) + "\n  ")
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-35867cfc", esExports)
  }
}

/***/ }),
/* 497 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentSwitchWrapper_vue__ = __webpack_require__(188);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_89444ab2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentSwitchWrapper_vue__ = __webpack_require__(498);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentSwitchWrapper_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_89444ab2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentSwitchWrapper_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentSwitchWrapper.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-89444ab2", Component.options)
  } else {
    hotAPI.reload("data-v-89444ab2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 498 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.options.wrapperClasses }, [
    _c(
      "label",
      { attrs: { for: _vm.options.id } },
      [
        _vm._t("default"),
        _vm._v(" "),
        _c("span"),
        _vm._v(" "),
        _vm.isToggle ? _c("span") : _vm._e(),
        _vm._v("\n    " + _vm._s(_vm.options.label) + "\n\n    "),
        _vm.hasLink
          ? _c(
              "legent-link",
              { attrs: { href: _vm.options.link.url, "is-transparent": "" } },
              [_vm._v("\n      " + _vm._s(_vm.options.link.text) + "\n    ")]
            )
          : _vm._e()
      ],
      2
    ),
    _vm._v(" "),
    _vm.options.showHelper
      ? _c("p", {
          staticClass: "helper",
          domProps: { innerHTML: _vm._s(_vm.options.helperText) }
        })
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-89444ab2", esExports)
  }
}

/***/ }),
/* 499 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentTable_vue__ = __webpack_require__(189);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30f72436_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentTable_vue__ = __webpack_require__(500);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30f72436_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30f72436", Component.options)
  } else {
    hotAPI.reload("data-v-30f72436", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 500 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("BaseTable", {
    class: _vm.classNames,
    attrs: { "header-rows": _vm.headerRows, "body-rows": _vm.bodyRows }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-30f72436", esExports)
  }
}

/***/ }),
/* 501 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentVideoBackground_vue__ = __webpack_require__(190);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4305b6f1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentVideoBackground_vue__ = __webpack_require__(502);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LegentVideoBackground_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4305b6f1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LegentVideoBackground_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/elements/LegentVideoBackground.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4305b6f1", Component.options)
  } else {
    hotAPI.reload("data-v-4305b6f1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 502 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "video-background", style: _vm.style },
    [
      !_vm.video.disableFilter
        ? _c("div", { staticClass: "filter" })
        : _vm._e(),
      _vm._v(" "),
      _c("base-video", {
        attrs: {
          file: _vm.file,
          "load-immediately": _vm.loadImmediately,
          "poster-url": _vm.computedPosterUrl,
          url: _vm.url,
          "url-mobile": _vm.urlMobile,
          video: _vm.video,
          autoplay: "",
          loop: "",
          muted: "",
          playsinline: ""
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4305b6f1", esExports)
  }
}

/***/ })
]),[191]);