<script lang="ts">
  import Card from "../components/Card.svelte";
  import ProgressContainer from "../components/ProgressContainer.svelte";
  import ProgressBar from "../components/ProgressBar.svelte";
  import BottomButtons from "../components/BottomButtons.svelte";
  import Loading from "../components/Loading.svelte";
  import { db, messaging } from "../firebase";
  import { DateTime } from "luxon";
  import { push } from "svelte-spa-router";
  import { progressData } from "../stores";

  let loading: boolean = false;
  let progresses: Progress[];
  let lastChecked: string = null;

  if (messaging !== null)
    messaging.onMessage((payload) => {
      loadData();
    });

  const loadData = async () => {
    if (!loading) loading = true;
    else return;

    if ($progressData !== null) {
      console.log($progressData);
      progresses = $progressData[0].data as Progress[];
      lastChecked = DateTime.fromSeconds(
        $progressData[0].checkedOn.seconds
      ).toRelative();
      loading = false;
      return;
    }

    await db
      .collection("progressData")
      .orderBy("updatedOn", "desc")
      .limit(50)
      .get()
      .then((querySnapshot) => {
        progressData.set(querySnapshot.docs.map((value) => value.data()));
        const doc = querySnapshot.docs[0].data();
        progresses = doc.data as Progress[];
        lastChecked = DateTime.fromSeconds(doc.checkedOn.seconds).toRelative();
        loading = false;
      });
  };
  loadData();
</script>

<div class="page">
  {#if !loading}
    <Card>
      <ProgressContainer>
        {#each progresses as progress, n}
          <ProgressBar
            {progress}
            {n}
            on:click={(event) => {
              push(`/progress/${progress.title}`);
            }}
          />
        {/each}
      </ProgressContainer>
      <p class="last-checked">Last checked: {lastChecked}</p>
      <BottomButtons />
    </Card>
  {:else}
    <Loading />
  {/if}
</div>

<style lang="scss">
  .last-checked {
    font-weight: 500;
    color: rgba($fg-color, 0.8);
    font-size: 0.9rem;
  }
</style>
