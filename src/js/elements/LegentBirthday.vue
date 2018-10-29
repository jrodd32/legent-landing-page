<template>
  <div :class="classNames">
    <label class="label">Birthday*</label>
    <div class="control">
      <input
        ref="month"
        v-model.number="month"
        type="tel"
        class="input as-text"
        name="month"
        placeholder="MM"
        maxlength="2"
        @keyup="handleKeyUp"
        @keydown="handleKeyDown"
      />
    </div>
    <div class="control">
      <input
        ref="day"
        v-model.number="day"
        type="tel"
        class="input as-text"
        name="day"
        placeholder="DD"
        maxlength="2"
        @keyup="handleKeyUp"
        @keydown="handleKeyDown"
      />
    </div>
    <div class="control">
      <input
        ref="year"
        v-model.number="year"
        type="tel"
        class="input as-text"
        name="year"
        placeholder="YYYY"
        maxlength="4"
        @keyup="handleKeyUp"
        @keydown="handleKeyDown"
      />
    </div>
    <p
      v-if="showHelperText && hasError"
      class="helper"
      v-html="helperText"
    />
  </div>
</template>

<script>
  export default {
    props: {
      country: {
        type: Object,
        required: true
      },
      currentBirthday: {
        type: String,
        default() {
          return '';
        }
      },
      dynamicHelperText: {
        type: String,
        default() {
          return '';
        }
      },
      reset: {
        type: Boolean,
        default() {
          return false;
        }
      },
      showHelperText: {
        type: Boolean,
        default() {
          return true;
        }
      }
    },
    data() {
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
      classNames() {
        return {
          field: true,
          'has-multiple': true,
          'has-placeholder': true,
          'is-birthday': true,
          'is-success': this.hasSuccess,
          'is-danger': this.hasError
        };
      },
      helperText() {
        if (this.dynamicHelperText.length > 0) {
          return this.dynamicHelperText;
        }

        return 'Invalid birthday';
      }
    },
    watch: {
      dynamicHelperText(value) {
        if (value.length > 0) {
          this.hasSuccess = false;
          this.hasError = true;
        }
      },
      reset(shouldReset) {
        if (shouldReset) {
          this.age = '';
          this.day = '';
          this.month = '';
          this.year = '';
        }
      },
      country() {
        this.validateBirthdate();
      }
    },
    created() {
      if (this.currentBirthday.length > 0) {
        const [year, month, day] = this.currentBirthday.split('/'); // 1979/01/01

        this.year = year;
        this.month = month;
        this.day = day;
      }
    },
    mounted() {
      if (this.currentBirthday.length > 0) {
        [this.$refs.month, this.$refs.day, this.$refs.year].forEach(el => this.validateField(el, false));
      }
    },
    methods: {
      isOfAge(minAge) {
        const { year, month, day } = this;

        if (year.length === 0 || month.length === 0 || day.length === 0) {
          return false;
        }

        const oneYear = 1000 * 60 * 60 * 24 * 365.25;
        const birthdate = new Date(year, month, day);

        this.age = Math.floor((new Date() - birthdate) / oneYear);

        return this.age > minAge;
      },
      handleKeyUp(e) {
        const el = e.target;

        this.hasError = true;
        this.hasSuccess = false;
        this.$emit('birthdayInvalid');

        this.validateField(el);
      },
      validateBirthdate() {
        // only validate if year is present
        if (this.year.toString().length === 4) {
          // passed
          if (this.isOfAge(this.country.drinkingAge)) {
            let formattedDay = this.day.toString();
            let formattedMonth = this.month.toString();

            if (formattedDay.length === 1) {
              formattedDay = `0${formattedDay}`;
            }

            if (formattedMonth.length === 1) {
              formattedMonth = `0${formattedMonth}`;
            }

            this.$emit('birthdayValid', `${this.year}/${formattedMonth}/${formattedDay}`, this.age);
            this.hasError = false;
            this.hasSuccess = true;
            return;
          }

          // failed
          this.$emit('birthdayInvalid');
          this.hasError = true;
          this.hasSuccess = false;
        }
      },
      validateField(el, focusNext = true) {
        const parentEl = el.parentNode;

        if (focusNext && (el.name === 'month' || el.name === 'day') && el.value.length === 2) {
          parentEl.nextElementSibling.querySelector('input').focus();
        }

        this.validateBirthdate();
      },
      handleKeyDown(e) {
        const el = e.target;
        const parentEl = el.parentNode;

        // keycodes: 8 -> delete, 37 -> left arrow
        if (el.name !== 'month' && ((e.keyCode === 8 && el.selectionStart === 0) || (e.keyCode === 37 && el.selectionStart === 0))) {
          parentEl.previousElementSibling.querySelector('input').focus();
        }

        // keycodes: 39 -> right arrow
        if (el.name !== 'year' && e.keyCode === 39 && el.selectionStart === el.value.length) {
          parentEl.nextElementSibling.querySelector('input').focus();
        }
      }
    }
  };
</script>
