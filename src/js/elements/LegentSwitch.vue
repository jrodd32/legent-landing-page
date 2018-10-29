<template>
  <div :class="switchModifiers">
    <label :for="id">
      <BaseCheckbox
        :text="text"
        :id="id"
        :value="value"
        :name="name"
        :required="required"
        :disabled="disabled"
        :checked="checked"
      />
      <span></span>
      <span v-if="isToggle"></span>
      {{ text }}
    </label>
  </div>
</template>

<script>
  import { randomId } from '../core/utilities';
  import BaseCheckbox from '../base/BaseCheckbox.vue';

  export default {
    components: {
      BaseCheckbox
    },
    props: {
      isToggle: {
        type: Boolean,
        default() {
          return false;
        }
      },
      text: {
        type: String,
        required: true,
        default() {
          return 'Checkbox';
        }
      },
      id: {
        type: String,
        default() {
          return `checkbox-${randomId()}`;
        }
      },
      value: {
        type: [String, Number, Boolean],
        default() {
          return null;
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
      switchModifiers() {
        return {
          toggle: this.isToggle,
          checkbox: !this.isToggle,
          'is-disabled': this.disabled
        };
      }
    }
  };
</script>
