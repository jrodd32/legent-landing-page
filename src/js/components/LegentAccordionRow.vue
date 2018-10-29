<template>
  <div :class="[accordionRowModifiers]">
    <div
      class="accordion-row-title"
      @click="handleClick"
    >
      {{ title }}
    </div>
    <div
      ref="content"
      class="accordion-row-content"
    >
      <slot>
        <p>{{ content }}</p>
      </slot>

      <div class="accordion-row-footer">
        <legent-link
          :is-submit="false"
          class="accordion-row-close"
          is-button
          is-icon-only
          icon="cancel"
          @click.native.prevent="hide"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import DoeContent from '../doe/DoeContent.vue';

  export default {
    components: {
      DoeContent
    },
    props: {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        default() {
          return '';
        }
      }
    },
    data() {
      return {
        opened: false
      };
    },
    computed: {
      accordionRowModifiers() {
        return {
          'accordion-row': true,
          'is-active': this.opened
        };
      }
    },
    methods: {
      handleClick() {
        return this.opened ? this.hide() : this.show();
      },
      hide(uid = null) {
        if (!uid || uid !== this._uid) {
          const { content } = this.$refs;
          content.style.maxHeight = '0px';
          this.opened = false;
          setTimeout(() => {
            content.removeAttribute('style');
            content.classList.remove('is-visible');
          }, 501); // Timeout equals transition time
        }
      },
      show() {
        if (this.opened) {
          this.hide();
          return;
        }

        this.$parent.$emit('rowOpened', this._uid);
        this.opened = true;

        const { content } = this.$refs;
        content.classList.add('is-invisible');
        const maxHeight = content.offsetHeight;
        content.classList.remove('is-invisible');
        content.classList.add('is-visible');

        setTimeout(() => {
          content.style.maxHeight = `${maxHeight}px`;
        }, 10);
      }
    }
  };
</script>
