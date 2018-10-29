<template>
  <input
    type="radio"
    v-bind="bindings"
  />
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default() {
          return '';
        }
      },
      value: {
        type: [String, Number, Boolean],
        default() {
          return '';
        }
      },
      id: {
        type: String,
        default() {
          return '';
        }
      },
      name: {
        type: String,
        default() {
          return '';
        }
      },
      required: {
        type: Boolean,
        default() {
          return false;
        }
      },
      disabled: {
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
      }
    },
    computed: {
      bindings() {
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
  };
</script>
