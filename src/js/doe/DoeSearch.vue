<template>
  <div
    class="search-bar"
    data-theme="dark"
  >
    <base-form
      ref="form"
      @submit.native.prevent="handleSubmit"
      @input-changed="handleInputChanged"
    >
      <legent-input
        field="query"
        icon="search"
        placeholder="Search Legent"
        role="search"
        skip-validation
      />
    </base-form>

    <div
      v-if="isSearching"
      class="search-results"
    >
      <ais-index
        :app-id="appId"
        :api-key="apiKey"
        :index-name="index"
        :query="query"
      >

        <ais-results>
          <div slot="header">
            <ais-stats />
          </div>

          <template slot-scope="{ result }">
            <doe-search-result :result="result" />
          </template>

        </ais-results>

        <ais-no-results />
      </ais-index>
    </div>
  </div>
</template>

<script>
  import { form } from '../core/forms';
  import DoeSearchResult from './DoeSearchResult.vue';

  export default {
    components: {
      DoeSearchResult
    },
    mixins: [
      form
    ],
    data() {
      return {
        // FIXME: Look into a refactor, not sure what's possible though
        // Don't love putting these hear but they are both
        // not sensitive data. The apiKey var is the
        // search only key. No CRUD actions are possible
        apiKey: '',
        appId: '',
        env: '',
        query: ''
      };
    },
    computed: {
      index() {
        return `${this.env}_${this.$site}`;
      },
      isSearching() {
        return this.query.length > 0;
      }
    },
    created() {
      this.env = document.head.querySelector('meta[name="env"]').content;
    },
    methods: {
      handleInputChanged() {
        this.$nextTick(() => {
          this.query = this.findField('query').value;
        });
      },
      handleSubmit() {
        this.$refs.form.$el.querySelector('input').blur();
      }
    }
  };
</script>

