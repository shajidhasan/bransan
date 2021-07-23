<script lang="ts">
  import ProgressChart from "../components/ProgressChart.svelte";
  import Loading from "../components/Loading.svelte";
  import { progressData } from "../stores";
  import { processData } from "../utilities/utils";
  import { db } from "../firebase";

  export let params: { title: string };

  if (params === undefined) {
    params = { title: undefined };
  }

  let datasets = [];
  let loading: boolean = true;

  const loadStuff = async () => {
    loading = true;
    if ($progressData !== null) {
      datasets = processData($progressData, params.title);
    } else {
      const querySnapshot = await db
        .collection("progressData")
        .orderBy("updatedOn", "desc")
        .limit(50)
        .get();
      datasets = processData(
        querySnapshot.docs.map((value) => value.data() as ProgressData),
        params.title
      );
    }
    loading = false;
  };
  loadStuff();
</script>

<div class="page">
  {#if !loading}
    <ProgressChart {datasets} />
  {:else}
    <Loading />
  {/if}
</div>

<style>
</style>
