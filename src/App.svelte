<script lang="ts">
  import { onMount } from "svelte";

  import Router from "svelte-spa-router";
  import routes from "./lib/routes";
  import "./styles/global.scss";

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  onMount(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  });
</script>

<Router {routes} />
