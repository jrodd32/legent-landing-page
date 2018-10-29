<template>
  <main class="page elements">
    <h1>This is an h1 headline.</h1>
    <h2>This is an h2 headline.</h2>
    <h3>This is an h3 headline.</h3>
    <h4>This is an h4 headline.</h4>
    <h5>This is an h5 headline.</h5>
    <h6>This is an h6 headline.</h6>

    <p>This is a paragraph using ITC Legacy Sans Book at 18px, with a 30px line-height in the color black. It contains a sentence with bold and itatlic styling. Phasellus pharetra urna sit amet tellus elementum aliquet in et quam. In condimentum dui.</p>

    <legent-buttons>
      <legent-link
        is-blended
        text="Black"
        to="/"
      />

      <legent-link
        is-blended
        is-danger
        text="Danger"
        to="/"
      />

      <legent-link
        is-blended
        is-gold
        text="Gold"
        to="/"
      />

      <legent-link
        is-blended
        is-grey
        text="Grey"
        to="/"
      />

      <legent-link
        is-blended
        is-silver
        text="Silver"
        to="/"
      />

      <legent-link
        is-blended
        is-success
        text="Success"
        to="/"
      />

      <legent-link
        is-blended
        is-wave
        text="Wave"
        to="/"
      />

      <legent-link
        is-blended
        is-white
        text="White"
        to="/"
      />

      <legent-link
        is-transparent
        text="Transparent"
        to="/"
      />

      <button class="button is-abstract is-gold">
        <span>Button</span>
        <svg>
          <circle
            cx="31"
            cy="29"
            r="20"
          />
        </svg>
      </button>
    </legent-buttons>

    <legent-input
      label="Input"
    />

    <legent-input
      icon="mail"
      label="Input with icon"
      required
    />

    <legent-input
      icon="mail"
      label="Disabled input"
      disabled
    />

    <legent-input
      field="subject"
      no-default
      select
    >
      <base-option
        selected
        value="option"
      >
        Selected Option
      </base-option>
      <base-option value="option">Option 2</base-option>
      <base-option value="option">Option 3</base-option>
      <base-option value="option">Option 4</base-option>
      <base-option value="option">Option 5</base-option>
    </legent-input>

    <legent-input
      field="message"
      textarea
    />

    <legent-switch
      is-toggle
      text="This is a toggle"
    />

    <legent-switch
      is-toggle
      text="This is a checked toggle"
      checked
    />

    <legent-switch
      is-toggle
      text="This is a disabled toggle"
      disabled
      checked
    />

    <legent-switch
      text="This is a checkbox"
    />

    <legent-switch
      text="This is a disabled checkbox"
      disabled
    />

    <legent-switch
      text="This is a required checkbox"
      required
    />

    <legent-switch
      text="This is a checked checkbox"
      checked
    />

    <legent-radio
      text="This is a radio button"
    />

    <legent-radio
      text="This is a disabled radio button"
      disabled
    />

    <legent-radio
      text="This is a required radio button"
      required
    />

    <legent-radio
      text="This is a checked radio button"
      checked
    />

    <legent-radio
      text="This is radio 1"
      name="option"
    />

    <legent-radio
      text="This is radio 2"
      name="option"
    />

    <legent-radio
      text="This is radio 3"
      name="option"
    />

    <base-definition-list
      :list="[
        {term: 'Definition list', descriptions: ['It\'s another way to display text.']},
        {term: 'Often overlooked', descriptions: ['But not here at Doe-Anderson', 'Item with two definitions but one term']},
        {term: 'Final title', descriptions: ['Final description']}
      ]"
    />

    <legent-blockquote
      :cite="{
        title: 'Star Legent',
        content: 'Jeff Long, #1 fan'
      }"
      content="Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?"
    />

    <legent-blockquote
      :cite="{
        title: 'Star Legent',
        content: 'Jeff Long, #1 fan'
      }"
      content="Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?"
      is-danger
    />

    <legent-blockquote
      :cite="{
        title: 'Star Legent',
        content: 'Jeff Long, #1 fan'
      }"
      content="Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?"
      is-gold
    />

    <legent-blockquote
      :cite="{
        title: 'Star Legent',
        content: 'Jeff Long, #1 fan'
      }"
      content="Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?"
      is-grey
    />

    <legent-blockquote
      :cite="{
        title: 'Star Legent',
        content: 'Jeff Long, #1 fan'
      }"
      content="Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?"
      is-silver
    />

    <legent-blockquote
      :cite="{
        title: 'Star Legent',
        content: 'Jeff Long, #1 fan'
      }"
      content="Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?"
      is-success
    />

    <legent-blockquote
      :cite="{
        title: 'Star Legent',
        content: 'Jeff Long, #1 fan'
      }"
      content="Everything about Legent is perfect. Taste, profile, bottle, label. What more could you want?"
      is-wave
    />

    <legent-notification
      :content="{
        p: 'This is the default notification'
      }"
    />

    <legent-notification
      :content="{
        p: 'This is the default notification with close.'
      }"
      has-close
    />

    <legent-notification
      :content="{
        p: 'This is the red notification'
      }"
      is-danger
    />

    <legent-notification
      :content="{
        p: 'This is the gold notification'
      }"
      is-gold
    />

    <legent-notification
      :content="{
        p: 'This is the grey notification'
      }"
      is-grey
    />

    <legent-notification
      :content="{
        p: 'This is the silver notification'
      }"
      is-silver
    />

    <legent-notification
      :content="{
        p: 'This is the success notification'
      }"
      is-success
    />

    <legent-notification
      :content="{
        p: 'This is the wave notification'
      }"
      is-wave
    />

    <legent-notification
      :content="{
        p: 'This is the white notification'
      }"
      is-white
    />

    <legent-list
      :items="[
        'This is the first list item',
        'Second list item',
        'Third list item'
      ]"
      is-ordered
    />

    <legent-list
      :items="[
        'This is the first list item',
        'Second list item',
        'Third list item'
      ]"
    />

    <legent-list
      :items="[
        'This is the first list item',
        'Second list item',
        'Third list item'
      ]"
      is-danger
    />

    <legent-list
      :items="[
        'This is the first list item',
        'Second list item',
        'Third list item'
      ]"
      is-gold
    />

    <legent-list
      :items="[
        'This is the first list item',
        'Second list item',
        'Third list item'
      ]"
      is-grey
    />

    <legent-list
      :items="[
        'This is the first list item',
        'Second list item',
        'Third list item'
      ]"
      is-silver
    />

    <legent-list
      :items="[
        'This is the first list item',
        'Second list item',
        'Third list item'
      ]"
      is-success
    />

    <legent-list
      :items="[
        'This is the first list item',
        'Second list item',
        'Third list item'
      ]"
      is-wave
    />

    <legent-table
      :body-rows="[['John', 'Doe', 'john@example.com'], ['Mary', 'Moe', 'mary@example.com'], ['Julie', 'Dooley', 'julie@example.com']]"
      :header-rows="['First name', 'Last name', 'Email address']"
    />
  </main>
</template>

<script>
  import LegentButtons from '../components/LegentButtons.vue';

  export default {
    components: {
      LegentButtons
    }
  };
</script>

<style scoped lang="scss">
.elements {
  padding: 24px;
}

hr {
  margin: 48px 0;
  border-width: 0 0 1px;
  border-style: solid;
  border-color: rgba(0,0,0,.5);
}
</style>
