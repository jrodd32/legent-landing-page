<template>
  <div class="address-fields">
    <legent-input
      :field="fieldNames.address1"
      address
      label="Address*"
      required
    />

    <legent-input
      :field="fieldNames.address2"
      address
      label="Address 2"
    />

    <doe-columns
      :animate-in="false"
    >
      <doe-column size="4">
        <legent-input
          :field="fieldNames.city"
          label="City*"
          required
        />
      </doe-column>

      <doe-column size="4">
        <legent-input
          :field="fieldNames.state"
          :label="stateLabel"
          select
          required
        >
          <base-option
            v-for="option in stateOptions"
            :value="option.abbreviation"
            :field="option.name"
            :key="option.abbreviation"
          />
        </legent-input>
      </doe-column>

      <doe-column size="4">
        <legent-input
          v-mask="postalCodeMask"
          :field="fieldNames.postalCode"
          :placeholder="postalCodePlaceholder"
          :postal-code="postalCodeFormat"
          label="Postal code*"
          required
        />
      </doe-column>
    </doe-columns>
  </div>
</template>

<script>
  import { provinces, states } from '../core/data';
  import DoeColumn from '../doe/DoeColumn.vue';
  import DoeColumns from '../doe/DoeColumns.vue';

  export default {
    components: {
      DoeColumn,
      DoeColumns
    },
    props: {
      address: {
        type: Object,
        default() {
          return {
            country: 'United States'
          };
        }
      },
      prepend: {
        type: String,
        default() {
          return '';
        }
      }
    },
    computed: {
      fieldNames() {
        return {
          address1: `${this.getPrependText}address1`,
          address2: `${this.getPrependText}address2`,
          city: `${this.getPrependText}city`,
          state: `${this.getPrependText}${this.stateField}`,
          postalCode: `${this.getPrependText}postal_code`
        };
      },
      getPrependText() {
        return this.prepend !== '' ? `${this.prepend}_` : '';
      },
      inCanada() {
        return this.address.country === 'Canada';
      },
      postalCodeFormat() {
        return this.inCanada ? '### ###' : '#####';
      },
      postalCodeMask() {
        return this.inCanada ? 'A#A #A#' : '#####-####';
      },
      postalCodePlaceholder() {
        return this.inCanada ? 'A1A 1A1' : '12345-6789';
      },
      stateLabel() {
        return this.inCanada ? 'Province/Territory*' : 'State*';
      },
      stateField() {
        return this.inCanada ? 'province' : 'state';
      },
      stateOptions() {
        return this.inCanada ? provinces : states;
      }
    }
  };
</script>
