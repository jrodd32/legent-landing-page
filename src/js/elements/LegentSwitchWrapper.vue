<template>
  <div :class="options.wrapperClasses">
    <label :for="options.id">
      <slot></slot>

      <span />
      <span v-if="isToggle" />
      {{ options.label }}

      <legent-link
        v-if="hasLink"
        :href="options.link.url"
        is-transparent
      >
        {{ options.link.text }}
      </legent-link>
    </label>

    <p
      v-if="options.showHelper"
      class="helper"
      v-html="options.helperText"
    />
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      options: {
        type: Object,
        default() {
          return {
            wrapperClasses: {},
            name: '',
            label: '',

            hasIcon: false,
            iconClass: '',

            hasHelper: false,
            helperText: '',

            disabled: false,
            required: false,
            validated: false,

            link: {
              name: '',
              url: ''
            }
          };
        }
      }
    },
    computed: {
      isToggle() {
        return this.options.wrapperClasses.toggle === 'true';
      },
      hasLink() {
        // TODO: add a true toggle / functionality
        return false;
      }

    }
  };
</script>
