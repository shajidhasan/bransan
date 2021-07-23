<script lang="ts">
  import { scale } from "svelte/transition";
  import { onMount } from "svelte";
  let shadow: boolean = false;

  onMount(() => {});
</script>

<div in:scale={{ duration: 500 }}>
  <slot />
</div>

<style lang="scss">
  div {
    background-color: $bg-color-light;
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    @media (min-width: 500px) {
      padding: 2rem;
      width: 70%;
    }
    @media (min-width: 500px) {
      padding: 2rem;
      width: 70%;
    }
    @media (min-width: 1200px) {
      padding: 2.5rem;
      width: 60%;
    }
    @media (min-width: 1500px) {
      padding: 3rem;
      width: 900px;
    }
  }
</style>
