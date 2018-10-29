<template>
  <legent-switch-wrapper
    v-if="isSwitch"
    :options="fieldModifiers">

    <base-input
      :checked="isChecked"
      :class="calculatedClass"
      :disabled="disabled"
      :id="id"
      :name="field"
      :required="required"
      :type="calculatedType"
      :value="value"

      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    />
  </legent-switch-wrapper>

  <legent-field-wrapper
    v-else
    :options="fieldModifiers"
  >

    <base-textarea
      v-if="textarea"
      :autocomplete="field"
      :disabled="disabled"
      :id="field"
      :name="field"
      :required="required"
      :value="value"

      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <base-select
      v-else-if="select"
      :autocomplete="field"
      :disabled="disabled"
      :id="field"
      :name="field"
      :no-default="noDefault"
      :required="required"
      :select-options="selectOptions"
      :value="value"

      @blur="handleBlur"
      @change="handleChange"
      @focus="handleFocus">
      <slot></slot>
    </base-select>

    <base-input
      v-else
      :autocomplete="field"
      :disabled="disabled"
      :id="field"
      :name="field"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      :type="calculatedType"

      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </legent-field-wrapper>
</template>

<script>
  import { inputProps } from '../core/inputs';

  export default {
    mixins: [
      inputProps
    ]
  };
</script>
