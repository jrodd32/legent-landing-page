<template>
  <div
    v-if="active"

    :class="[notificationModifiers, styleModifiers]"

    class="notification"
  >
    <legent-link
      v-if="hasClose"

      :is-submit="false"

      class="is-delete"
      icon="cancel"
      type="button"

      is-button
      is-small
      is-transparent
      is-icon-only

      @click.native.prevent="closeNotification"
    />
    <div class="notification-content">
      <doe-content
        v-if="content"
        :h6="content.h6"
        :p="content.p"
      />
    </div>
    <div
      v-if="(cancel || accept)"

      class="notification-action"
    >
      <div class="buttons is-right">
        <legent-link
          v-if="cancel"

          :is-submit="false"

          is-button
          is-small

          @click.native="closeNotification"
        >
          {{ cancel }}
        </legent-link>
        <legent-link
          v-if="accept"

          :is-submit="false"

          is-button
          is-small

          @click.native="confirmNotification"
        >
          {{ accept }}
        </legent-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { styleProps } from '../core/mixins';
  import DoeContent from '../doe/DoeContent.vue';

  export default {
    components: {
      DoeContent
    },
    mixins: [styleProps],
    props: {
      content: {
        type: Object,
        required: true
      },
      cancel: {
        type: String,
        default() {
          return '';
        }
      },
      accept: {
        type: String,
        default() {
          return '';
        }
      },
      hasClose: {
        type: Boolean,
        default() {
          return false;
        }
      },
      isActive: {
        type: Boolean,
        default() {
          return true;
        }
      }
    },
    data() {
      return {
        active: this.isActive
      };
    },
    computed: {
      notificationModifiers() {
        return {
          'has-close': this.hasClose
        };
      }
    },
    methods: {
      closeNotification() {
        this.active = !this.active;
        this.$emit('close');
      },
      confirmNotification() {
        this.active = !this.active;
        this.$emit('accept');
      }
    }
  };
</script>
