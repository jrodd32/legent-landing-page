<template>
  <div :class="radioModifiers">
    <label :for="id">
      <BaseRadio
        :text="text"
        :id="id"
        :value="value"
        :name="name"
        :required="required"
        :disabled="disabled"
        :checked="checked"
      />
      <span></span>
      {{ text }}
    </label>
  </div>
</template>

<script>
  import BaseRadio from '../base/BaseRadio';
  import { randomId } from '../core/utilities';

  export default {
    components: {
      BaseRadio
    },
    props: {
      text: {
        type: String,
        required: true,
        default() {
          return 'Radio';
        }
      },
      id: {
        type: String,
        default() {
          return `radio-${randomId()}`;
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
      radioModifiers() {
        return {
          radio: true,
          'is-disabled': this.disabled
        };
      }
    }
  };
</script>
