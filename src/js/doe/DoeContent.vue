<template>
  <div class="content">
    <template v-if="h1">
      <h1 v-if="headlineLink">
        <router-link
          v-if="headlineLink"
          :to="button.href"
          v-html="h1"
        />
      </h1>

      <h1
        v-else
        v-html="h1"
      />
    </template>

    <template v-if="h2">
      <h2 v-if="headlineLink">
        <router-link
          v-if="headlineLink"
          :to="button.href"
          v-html="h2"
        />
      </h2>

      <h2
        v-else
        v-html="h2"
      />
    </template>

    <template v-if="h3">
      <h3 v-if="headlineLink">
        <router-link
          v-if="headlineLink"
          :to="button.href"
          v-html="h3"
        />
      </h3>

      <h3
        v-else
        v-html="h3"
      />
    </template>

    <template v-if="h4">
      <h4 v-if="headlineLink">
        <router-link
          v-if="headlineLink"
          :to="button.href"
          v-html="h4"
        />
      </h4>

      <h4
        v-else
        v-html="h4"
      />
    </template>

    <template v-if="h5">
      <h5 v-if="headlineLink">
        <router-link
          v-if="headlineLink"
          :to="button.href"
          v-html="h5"
        />
      </h5>

      <h5
        v-else
        v-html="h5"
      />
    </template>

    <template v-if="h6">
      <h6 v-if="headlineLink">
        <router-link
          v-if="headlineLink"
          :to="button.href"
          v-html="h6"
        />
      </h6>

      <h6
        v-else
        v-html="h6"
      />
    </template>

    <p
      v-if="isSingleParagraph"
      v-html="p"
    />

    <template v-if="hasMultipleParagraphs">
      <p
        v-for="(text, index) in p"
        :key="index"
        v-html="text"
      />
    </template>

    <base-unordered-list
      v-if="hasUl"
      :items="ul"
    />

    <base-ordered-list
      v-if="hasOl"
      :items="ol"
    />

    <base-definition-list
      v-if="hasDl"
      :list="dl"
    />

    <template v-if="hasHtml">
      <div
        ref="html"
        v-html="html"
      />
    </template>

    <legent-link
      v-if="hasButton"

      :href="button.href"
      :is-anchor="button.isAnchor"
      :is-full-width="button.isFullWidth"
      :is-gold="button.isGold"
      :is-line="button.isLine"
      :is-transparent="button.isTransparent"
      :text="button.text"
      class="content-button"
    />

    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      h1: {
        type: String,
        default() {
          return '';
        }
      },
      h2: {
        type: String,
        default() {
          return '';
        }
      },
      h3: {
        type: String,
        default() {
          return '';
        }
      },
      h4: {
        type: String,
        default() {
          return '';
        }
      },
      h5: {
        type: String,
        default() {
          return '';
        }
      },
      h6: {
        type: String,
        default() {
          return '';
        }
      },
      headlineLink: {
        type: Boolean,
        default() {
          return false;
        }
      },
      html: {
        type: String,
        default() {
          return '';
        }
      },
      p: {
        type: [String, Array],
        default() {
          return '';
        }
      },
      ul: {
        type: [Array, Object],
        default() {
          return [];
        }
      },
      ol: {
        type: [Array, Object],
        default() {
          return [];
        }
      },
      dl: {
        type: Array,
        default() {
          return [];
        }
      },
      button: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      hasButton() {
        return Object.keys(this.button).length > 0 && this.button.text;
      },
      hasDl() {
        return this.dl.length > 0;
      },
      hasHtml() {
        return this.html && this.html.length > 0;
      },
      hasMultipleParagraphs() {
        return this.p instanceof Array;
      },
      hasOl() {
        if (this.ol instanceof Array) {
          return this.ol.length > 0;
        }

        if (this.ol instanceof Object) {
          return Object.keys(this.ol).length > 0;
        }

        return false;
      },
      hasUl() {
        if (this.ul instanceof Array) {
          return this.ul.length > 0;
        }

        if (this.ul instanceof Object) {
          return Object.keys(this.ul).length > 0;
        }

        return false;
      },
      isSingleParagraph() {
        return this.p && !this.hasMultipleParagraphs;
      }
    },
    mounted() {
      if (this.hasHtml) {
        this.$nextTick(() => {
          this.unWrapHtmlDiv();
        });
      }
    },
    activated() {
      this.bindLinks();
    },
    deactivated() {
      this.unbindLinks();
    },
    beforeDestroy() {
      this.unbindLinks();
    },
    methods: {
      bindLink(e) {
        e.preventDefault();
        let path = e.target.href.replace(/^.*\/\/[^/]+/, '');

        if (this.$site !== 'en') {
          path = `/${this.$site.replace(/_/g, '-')}${path}`;
        }

        this.$router.push({ path });
      },
      bindLinks() {
        // NOTE: IE11 can't handle forEach over a nodeList, so convert to an array first
        Array.from(this.$el.querySelectorAll('a:not(.content-button):not([target])')).forEach(el => el.addEventListener('click', this.bindLink));
      },
      unbindLinks() {
        // NOTE: IE11 can't handle forEach over a nodeList, so convert to an array first
        Array.from(this.$el.querySelectorAll('a:not(.content-button):not([target])')).forEach(el => el.removeEventListener('click', this.bindLink));
      },
      unWrapHtmlDiv() {
        // In Vue, you can only render raw
        // HTML on an element like div, but we
        // don't want our HTML wrapped in
        // superfluous markup. This "unwraps"
        // the HTML blob and puts it in the root
        // div.
        const { html } = this.$refs;
        const parent = html.parentNode;

        while (html.firstChild) {
          parent.insertBefore(html.firstChild, html);
        }

        parent.removeChild(html);

        // hook anchors into vue router after we've
        // moved around the HTML
        this.bindLinks();
      }
    }
  };
</script>
