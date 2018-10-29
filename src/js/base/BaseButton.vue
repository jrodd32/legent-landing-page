<template>
  <button
    :disabled="disabled"
    :title="title"
    :type="type"
  >
    <base-icon
      v-if="icon"
      :icon="icon"
    />
    <span>
      <slot>
        {{ text }}
      </slot>
    </span>
  </button>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      },
      icon: {
        type: String,
        default() {
          return '';
        }
      },
      isSubmit: {
        type: Boolean,
        default() {
          return '';
        }
      },
      text: {
        type: String,
        default() {
          return '';
        }
      },
      title: {
        type: String,
        default() {
          return null;
        }
      }
    },
    computed: {
      type() {
        return this.isSubmit ? 'submit' : 'button';
      }
    }
  };
</script>
