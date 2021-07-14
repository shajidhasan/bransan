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
    padding: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    @media (min-width: 500px) {
      padding: 2.5rem;
      width: 70%;
    }
    @media (min-width: 500px) {
      padding: 2.5rem;
      width: 70%;
    }
    @media (min-width: 1200px) {
      padding: 3rem;
      width: 60%;
    }
    @media (min-width: 1500px) {
      padding: 4rem;
      width: 900px;
    }
  }
</style>
