<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import tinycolor from "tinycolor2";
  import { colors } from "../utilities";

  export let progress: Progress, n: number;
  const dispatch = createEventDispatcher();

  let color = colors[n];
  let tiny = tinycolor(color);
  let light = tiny.lighten(20).toHex8String();
  let dark = tiny.darken(20).toHex8String();
  let alpha = tiny.setAlpha(0.8).toHex8String();
  let moreAlpha = tiny.setAlpha(0.3).toHex8String();

  const progressTween = tweened(0, {
    duration: 1500,
    easing: cubicOut,
  });

  onMount(() => {
    progressTween.set(progress.percentage);
  });
</script>

<div class="progress">
  <div
    class="progress-title"
    on:click={() => dispatch("click", { title: progress.title })}
  >
    {progress.title}
  </div>
  <div class="progress-bar">
    <div
      class="progress-filled"
      style={`--percentage: ${$progressTween}%; --color: ${color}; --light: ${light}; --dark: ${dark}; --alpha: ${alpha}; --moreAlpha: ${moreAlpha}`}
    >
      <div class="progress-percentage">
        {$progressTween.toString().split(".")[0]}%
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .progress {
    > .progress-title {
      color: $fg-color;
      margin-bottom: 0.4rem;
      font-size: 1.1rem;
      font-weight: 500;
      cursor: pointer;
      @media (max-width: 500px) {
        font-size: 0.9rem;
      }
    }

    > .progress-bar {
      width: 100%;
      background-color: $progress-bg-color;
      height: $progress-height;
      @media (max-width: 500px) {
        height: $progress-height * 0.8;
      }
      > .progress-filled {
        background: var(--color);
        background: linear-gradient(90deg, var(--light) 0%, var(--dark) 100%);
        height: 100%;
        width: var(--percentage);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        box-shadow: 0px 0px 10px 1px var(--alpha),
          0px 0px 20px 5px var(--moreAlpha);

        > .progress-percentage {
          margin-right: 0.2rem;
          color: $fg-color;
          font-weight: 500;
          @media (max-width: 500px) {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
</style>
