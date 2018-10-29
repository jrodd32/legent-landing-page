<template>
  <div class="age-gate-birthdate">
    <h1 class="text-center">Welcome</h1>
    <p class="text-center">You must be 21 to enter.</p>

    <base-form
      ref="form"
      @input-changed="handleChange"
      @submit.native.prevent="handleSubmit"
    >
      <div class="fields is-center">
        <legent-birthday
          :country="currentCountry"
          @birthdayInvalid="handlebirthdateInvalid"
          @birthdayValid="handlebirthdateValid"
        />

        <legent-input
          :icon="currentCountry.abbreviation"
          has-flag
          field="country"
          select
          skip-validation
        >
          <base-option
            v-for="countryOption in activeCountries"
            :key="countryOption.abbreviation"
            :selected="countryOption.name === country"
            :value="countryOption.name"
          >
            {{ countryOption.name }}
          </base-option>
        </legent-input>
      </div>

      <div class="field-with-button">
        <legent-input
          field="remember_me"
          checkbox
        />
        <legent-link
          is-button
          text="Enter"
        />
      </div>

      <small class="block text-center">
        By entering you agree to our
        <a
          href="/terms-conditions?tos=ok"
          target="_blank"
          rel="noopener"
        >
          Terms and Conditions
        </a>
        &amp;
        <a
          href="/privacy-policy?tos=ok"
          target="_blank"
          rel="noopener"
        >
          Privacy Policy
        </a>.
      </small>
    </base-form>
  </div>
</template>

<script>
  import { countries } from '../../core/data';
  import { form } from '../../core/forms';
  import LegentBirthday from '../../elements/LegentBirthday.vue';

  export default {
    components: {
      LegentBirthday
    },
    mixins: [
      form
    ],
    data() {
      return {
        age: '',
        birthdate: '',
        country: 'United States',
        validBirthdate: false
      };
    },
    computed: {
      activeCountries() {
        return countries.filter(country => country.active);
      },
      canSubmit() {
        // override mixin method to account for birthdate
        return this.hasValidFields && this.requiredFieldsCount === this.validatedFieldsCount && this.validBirthdate;
      },
      currentCountry() {
        return this.activeCountries.filter(country => country.name === this.country)[0];
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.checkValidation();
      });
    },
    methods: {
      handlebirthdateInvalid() {
        this.birthdate = '';
        this.validBirthdate = false;
        this.checkValidation();
      },
      handlebirthdateValid(birthdate, age) {
        this.birthdate = birthdate;
        this.age = age;
        this.validBirthdate = true;
        this.checkValidation();
      },
      handleChange() {
        this.$nextTick(() => {
          this.country = this.findField('country').value;
          this.checkValidation();
        });
      },
      handleSubmit() {
        this.$gtm.$emit('trackEvent', {
          event: 'e_formSubmit',
          formName: 'age gate birthdate'
        });

        if (this.validBirthdate) {
          const formData = this.getFormData();

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
  };
</script>
