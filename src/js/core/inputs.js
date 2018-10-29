import { randomId } from './utilities';

const inputProps = {
  computed: {
    calculatedClass() {
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
    calculatedLabel() {
      // If passed a label return that.
      // Otherwise check to see if field is required to return
      // label with appended *
      return this.label.length > 0 ?
              this.label :
              this.setLabel(this.humanName, this.required);
    },
    calculatedType() {
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
    fieldModifiers() {
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
    hasIcon() {
      return this.icon.length;
    },
    hasLink() {
      return this.link.url.length > 0 && this.link.name.length > 0;
    },
    helperId() {
      return `field-${this.field}-helper`;
    },
    humanName() {
      return this.setHumanName(this.field);
    },
    iconClass() {
      return this.hasIcon ? `icon-${this.icon}` : '';
    },
    isInvalid() {
      return !this.skipValidation && !this.validated && !this.initialState;
    },
    isPostalCode() {
      return this.postalCode && this.postalCode.length > 0;
    },
    isSelect() {
      return this.select;
    },
    isSwitch() {
      return this.checkbox || this.radio || this.toggle;
    }
  },
  watch: {
    defaultValue(newValue) {
      this.value = newValue;
      this.validateField();
    }
  },
  data() {
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
    handleBlur() {
      this.setInitialState(false);
      this.toggleFocus();
      this.validateField();
    },
    handleChange(event) {
      this.setInitialState(false);
      this.setValue(event.target.value);
      this.validateField();

      if (this.isSwitch) {
        this.isChecked = event.target.checked;
        this.value = this.setDefaultValue();
      }
    },
    handleFocus() {
      // method is called every time the base input
      // is focused / emits a "focus" event
      this.isFocused = true;
    },
    handleInput(event) {
      this.setInitialState(false);
      this.setValue(event.target.value);
      this.validateField();

      if (this.hasNoForm) {
        this.$emit('input', event);
      }
    },
    removeFocus() {
      this.isFocused = false;
    },
    resetField(value = '') {
      this.value = value;
      this.setInitialState(true);
      this.calculatedHelper = this.helper;
      this.showHelper = this.helper.length > 0;
    },
    setDefaultValue() {
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
    setError(text) {
      this.calculatedHelper = text;
      this.validated = false;
      this.hasError = true;
      this.showHelper = true;
    },
    setFocus() {
      // call focus after 251ms because the element
      // has its 'visibility' changed and that will change
      // by 250ms
      setTimeout(() => {
        this.$el.querySelector('.input').focus();
      }, 251);
    },
    setHumanName(value) {
      // return supplied custom name
      if (this.customHumanName.length > 0) {
        return this.customHumanName;
      }

      // return supplied label
      if (this.label.length > 0) {
        return this.label.replace(/\*/g, ' ');
      }

      if (value.includes('_')) {
        value = value.replace(/_/g, ' ');
      }

      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    setInitialState(state) {
      this.initialState = state;
      this.hasError = false;
      this.validated = false;
    },
    setLabel(value, required) {
      // Append the * to required fields
      const label = required ? value += '*' : value;
      return label;
    },
    setValue(value) {
      this.initialState = false;
      this.value = value;
    },
    toggleFocus() {
      this.isFocused = !this.isFocused;
    },
    validateField() {
      if (this.skipValidation) {
        return;
      }

      const helperMessages = [];
      const validationFailures = [];

      // validation = required
      if (this.required && this.value.length === 0) {
        validationFailures.push('required');
        helperMessages.push(`${this.humanName} is required.`);
      }

      // validation = email format
      if (this.email && !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.value))) {
        validationFailures.push('email');
        helperMessages.push(`${this.humanName} must be a valid format.`);
      }

      // password
      // at least 7 alphanumeric characters and 1+ number
      if (this.validatePasswordFormat &&
          (!this.value.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/) ||
          ['WHEAT123', 'password', 'changeme'].includes(this.value))
      ) {
        validationFailures.push('password');
        helperMessages.push(`${this.humanName} should be at least 7 characters and contain both letters and numbers.`);
      }

      // validation = date format mm/dd/yyyy
      if (this.date && !(/^\d{1,2}\/\d{1,2}\/\d{4}$/).test(this.value)) {
        validationFailures.push('date');
        helperMessages.push(`${this.humanName} must be in a MM/DD/YYYY format.`);
      }

      // validation = date format mm/dd/yyyy-mm/dd/yyyy
      if (this.multiDate && !(/^\d{1,2}\/\d{1,2}\/\d{4}-\d{1,2}\/\d{1,2}\/\d{4}$/).test(this.value)) {
        validationFailures.push('multidate');
        helperMessages.push(`${this.humanName} must be in a MM/DD/YYYY-MM/DD/YYYY format.`);
      }

      // validation = is a number
      if (this.number && isNaN(this.value)) {
        validationFailures.push('number');
        helperMessages.push(`${this.humanName} must be number.`);
      }

      // validation = minimum value
      if (this.min && this.value < this.min) {
        validationFailures.push('min-value');
        helperMessages.push(`${this.humanName} must be greater than the minimum value of ${this.min}.`);
      }

      // validation = maximum value
      if (this.max && this.value > this.max) {
        validationFailures.push('max-value');
        helperMessages.push(`${this.humanName} must be less than the maximum value of ${this.max}.`);
      }

      // validation = within range of min and max values
      if (this.min && this.max && (this.value < this.min || this.value > this.max)) {
        validationFailures.push('out-of-range');
        helperMessages.push(`${this.humanName} must be greater than the minimum value of ${this.min} and less than the maximum value of ${this.max}.`);
      }

      if (this.minLength && this.value.length < this.minLength) {
        validationFailures.push('min-minLength');
        helperMessages.push(`${this.humanName} must be longer than ${this.minLength} characters.`);
      }

      // validation = phone number in:
      // XXX-XXX-XXXX OR
      // XXX.XXX.XXXX OR
      // XXX XXX XXXX Formats
      if (this.phone && !(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).test(this.value)) {
        validationFailures.push('phone');
        helperMessages.push(`${this.humanName} must be formatted XXX-XXX-XXXX OR XXX.XXX.XXXX OR XXX XXX XXXX.`);
      }

      // validation = postal code
      if (this.isPostalCode) {
        let postalCodeValid = false;

        // Canada
        if (this.postalCode === '### ###') {
          postalCodeValid = (/^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ] [0-9][ABCEFGHJKLMNPRSTVWXYZ][0-9]$/).test(this.value);
        }

        // US
        if (this.postalCode === '#####') {
          postalCodeValid = (/^[0-9]{5}(?:-[0-9]{4})?$/).test(this.value);
        }

        if (!postalCodeValid) {
          validationFailures.push('postal-code');
          helperMessages.push(`${this.humanName} must be a valid format`);
        }
      }

      // Stop special chars on non-email/password/date/address/username fields
      if (!(this.email || this.password || this.date || this.textarea || this.address || this.username || this.isPostalCode) && !(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/).test(this.value)) {
        validationFailures.push('special');
        helperMessages.push('Special characters such as @, !, etc are not allowed.');
      }

      // show error helper if validation fails
      if (validationFailures.length > 0 && helperMessages.length > 0) {
        this.validated = false;
        this.calculatedHelper = helperMessages.join('<br />');
        this.showHelper = true;
      } else { // reset helper based on helper prop
        this.validated = true;
        this.calculatedHelper = this.helper;
        this.showHelper = this.helper.length > 0;
      }
    }
  },
  created() {
    if (this.checked) {
      this.isChecked = true;
    }
  },
  mounted() {
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
      default() {
        return false;
      }
    },
    autocomplete: {
      type: Boolean,
      default() {
        return true;
      }
    },
    checkbox: {
      type: Boolean,
      default() {
        return false;
      }
    },
    checked: {
      type: Boolean,
      default() {
        return false;
      }
    },
    customHumanName: {
      type: String,
      default() {
        return '';
      }
    },
    date: {
      type: Boolean,
      default() {
        return false;
      }
    },
    defaultValue: {
      type: String,
      default() {
        return '';
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    email: {
      type: Boolean,
      default() {
        return false;
      }
    },
    field: {
      type: String,
      default() {
        return '';
      }
    },
    hasFlag: {
      type: Boolean,
      default() {
        return false;
      }
    },
    hasNoForm: {
      type: Boolean,
      default() {
        return false;
      }
    },
    helper: {
      type: String,
      default() {
        return '';
      }
    },
    icon: {
      type: String,
      default() {
        return '';
      }
    },
    id: {
      type: String,
      default() {
        return `${this.field}-${randomId()}`;
      }
    },
    isCentered: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isStartDateOnly: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isSmall: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isMedium: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isLarge: {
      type: Boolean,
      default() {
        return false;
      }
    },
    label: {
      type: String,
      default() {
        return '';
      }
    },
    link: {
      type: Object,
      default() {
        return {
          name: '',
          url: ''
        };
      }
    },
    match: {
      type: Boolean,
      default() {
        return false;
      }
    },
    max: {
      type: String,
      default() {
        return null;
      }
    },
    maxDate: {
      type: String,
      default() {
        return '';
      }
    },
    min: {
      type: String,
      default() {
        return null;
      }
    },
    minLength: {
      type: String,
      default() {
        return null;
      }
    },
    multiDate: {
      type: Boolean,
      default() {
        return false;
      }
    },
    noDefault: {
      type: Boolean,
      default() {
        return false;
      }
    },
    number: {
      type: Boolean,
      default() {
        return false;
      }
    },
    password: {
      type: Boolean,
      default() {
        return false;
      }
    },
    placeholder: {
      type: String,
      default() {
        return '';
      }
    },
    phone: {
      type: Boolean,
      default() {
        return false;
      }
    },
    postalCode: {
      type: String,
      default() {
        return '';
      }
    },
    radio: {
      type: Boolean,
      default() {
        return false;
      }
    },
    required: {
      type: Boolean,
      default() {
        return false;
      }
    },
    selectableDates: {
      type: Array,
      default() {
        return [];
      }
    },
    showPlaceholder: {
      type: Boolean,
      default() {
        return false;
      }
    },
    select: {
      type: Boolean,
      default() {
        return false;
      }
    },
    selected: {
      type: Boolean,
      default() {
        return false;
      }
    },
    selectOptions: {
      type: String,
      default() {
        return '';
      }
    },
    skipValidation: {
      type: Boolean,
      default() {
        return false;
      }
    },
    target: {
      type: Boolean,
      default() {
        return false;
      }
    },
    textarea: {
      type: Boolean,
      default() {
        return false;
      }
    },
    toggle: {
      type: Boolean,
      default() {
        return false;
      }
    },
    username: {
      type: Boolean,
      default() {
        return false;
      }
    },
    validatePasswordFormat: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
};

const baseInputProps = {
  computed: {
    inputListeners() {
      const vm = this;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        { },
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input(event) {
            if (event.target.nodeName !== 'SELECT' || (event.target.type && (event.target.type !== 'checkbox' || event.target.type !== 'radio'))) {
              vm.$emit('input', event);
            }
          },
          focus() {
            vm.$emit('focus');
          },
          blur(event) {
            vm.$emit('blur', event);
          },
          change(event) {
            vm.$emit('change', event);
          },
          mounted(event) {
            vm.$emit('mounted', event);
          }
        }
      );
    }
  },
  props: {
    checked: {
      type: Boolean,
      default() {
        return false;
      }
    },
    field: {
      type: String,
      default() {
        return '';
      }
    },
    selected: {
      type: Boolean,
      default() {
        return false;
      }
    },
    selectOptions: {
      type: String,
      default() {
        return '';
      }
    },
    type: {
      type: String,
      default() {
        return '';
      }
    },
    value: {
      type: [Number, String, Boolean],
      default() {
        return '';
      }
    }
  }
};

export {
  baseInputProps,
  inputProps
};
