<template>
  <form
    :action="action"
    :method="method"
    accept-charset="UTF-8"
    class="form"
    role="form"
    @input="handleInput"
  >
    <!-- TODO: add color props -->
    <legent-notification
      v-if="showNotification"
      :content="{ p: notification.message }"
      :has-close="notification.withClose"
      @close="handleClose" />

    <slot></slot>
  </form>
</template>

<script>
  export default {
    props: {
      action: {
        type: String,
        default() {
          return '';
        }
      },
      method: {
        type: String,
        default() {
          return 'post';
        }
      },
      notification: {
        type: Object,
        default() {
          return {
            status: 200,
            message: '',
            withClose: true
          };
        }
      }
    },
    computed: {
      hasErrors() {
        return this.notification.status && this.notification.status !== 200;
      },
      showNotification() {
        return this.notification.message && this.notification.message.length > 0;
      }
    },
    methods: {
      handleClose() {
        this.$emit('form-close');
      },
      handleInput() {
        this.$emit('input-changed', this);
      }
    }
  };
</script>
