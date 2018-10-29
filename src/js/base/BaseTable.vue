<template>
  <table v-if="showTable">
    <thead v-if="showHeader">
      <tr>
        <th v-for="headerRow in headerRows">
          {{ headerRow }}
        </th>
      </tr>
    </thead>
    <tbody v-if="showBody">
      <tr v-for="bodyRow in bodyRows">
        <td v-for="data in bodyRow">
          {{ data }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { tableProps } from '../core/mixins';

  export default {
    mixins: [ tableProps ],
    computed: {
      showTable() {
        return this.showHeader || this.showBody;
      },
      showHeader() {
        return this.headerRows && this.headerRows.length > 0;
      },
      showBody() {
        return this.bodyRows && this.bodyRows.length > 0;
      }
    }
  }
</script>
