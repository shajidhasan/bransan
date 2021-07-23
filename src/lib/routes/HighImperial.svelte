<script lang="ts">
  import Card from "../components/Card.svelte";
  import { translate } from "../utilities/translate";

  let english: string;
  let highImperial: string;

  const onTranslate = (): void => {
    let sentences = english.match(/[^\.!\?]+[\.!\?]+/g);
    if (sentences === null) {
      sentences = [english];
    }
    let translated = [];
    for (let sentence of sentences) {
      translated.push(translate(sentence).replace(/  +/g, " "));
    }
    highImperial = translated.join(" ");
  };
</script>

<svelte:head>
  <title>English to High Imperial</title>
</svelte:head>

<div class="page">
  <Card>
    <textarea
      rows="4"
      bind:value={english}
      placeholder="Type English here"
      spellcheck="false"
    />
    <button on:click|preventDefault={onTranslate}>Translate</button>
    <textarea
      rows="4"
      bind:value={highImperial}
      placeholder="High Imperial translation will appear here"
      spellcheck="false"
    />
    <div class="credit">
      Credit: <a
        href="https://github.com/richardkopelow/HighImperialTranslator"
        target="_blank">richardkopelow</a
      >
    </div>
  </Card>
</div>

<style lang="scss">
  textarea {
    width: 100%;
    background-color: lighten($bg-color, 2%);
    color: $fg-color;
    font-family: "Krub", sans-serif;
    padding: 0.4rem;
    font-size: 1rem;
    border: none;
  }

  textarea:focus {
    outline: 2px solid $primary-color;
  }
  button {
    margin: 0.8rem 0;
    padding: 0.2rem 1rem;
    font-family: "Krub", sans-serif;
    color: $fg-color;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.08rem;
    background-color: $primary-color;
    border: none;
    transition: all 200ms ease-in;
    cursor: pointer;
  }
  button:hover {
    background-color: lighten($primary-color, 10%);
  }
  button:active {
    transform: translateY(4px);
  }
  .credit {
    margin-top: 1rem;
    color: $fg-color;
    a {
      color: $primary-color;
      text-decoration: none;
    }
  }
</style>
