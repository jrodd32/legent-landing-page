<template>
  <div class="age-gate">
    <div class="age-gate-header">
    </div>
    <div class="age-gate-body">
      <div class="age-gate-content">
        <transition
          name="fade"
          mode="out-in"
        >
          <age-gate-birthdate
            @success="handleSuccess"
          />
        </transition>
      </div>
    </div>
    <div class="age-gate-footer">
      <p>&copy;{{ copyrightYear }} Legent</p>
    </div>
  </div>
</template>

<script>
  import AgeGateBirthdate from '../components/forms/AgeGateBirthdate.vue';

  export default {
    components: {
      AgeGateBirthdate
    },
    data() {
      return {
        age: '',
        birthdate: '',
        country: 'United States',
        rememberMe: false
      };
    },
    computed: {
      copyrightYear() {
        return new Date().getFullYear();
      }
    },
    mounted() {
      this.$gtm.$emit('trackEvent', {
        event: 'e_ageGatePresented'
      });
    },
    methods: {
      handleSuccess(birthdate, country, rememberMe, age) {
        this.country = country;
        this.birthdate = birthdate;
        this.rememberMe = rememberMe;
        this.age = age;

        this.passedAgeGate();
      },
      passedAgeGate() {
        let duration = '0'; // session cookie, expires when browser is closed

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
  };
</script>
