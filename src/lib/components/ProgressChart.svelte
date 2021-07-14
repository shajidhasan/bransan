<script lang="ts">
  import { scale } from "svelte/transition";
  import Chart from "chart.js/auto";
  import "chartjs-adapter-luxon";
  import { onMount } from "svelte";
  export let datasets;

  let chartCanvas: HTMLCanvasElement;

  let myChart: Chart;

  onMount(() => {
    let ctx = chartCanvas.getContext("2d");
    myChart = new Chart(ctx, {
      type: "line",
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "white",
              font: { weight: "500", family: "Krub" },
            },
            title: {
              display: true,
              text: "Progress Over Time",
              color: "rgba(256, 256, 256, 0.8)",
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(256, 256, 256, 0.1)" },
            type: "time",
            time: {
              tooltipFormat: "DD",
              displayFormats: {
                millisecond: "LLL dd",
                second: "LLL dd",
                minute: "LLL dd",
                hour: "LLL dd",
                day: "LLL dd",
                week: "LLL dd",
                month: "LLL dd",
                quarter: "LLL dd",
                year: "LLL dd",
              },
              stepSize: 5,
            },
            title: {
              display: true,
              text: "Date",
              color: "white",
            },
            ticks: {
              color: "rgba(256, 256, 256, 0.8)",
            },
          },
          y: {
            grid: { color: "rgba(256, 256, 256, 0.1)" },
            title: {
              display: true,
              text: "Percent",
              color: "white",
            },
            min: 0,
            max: 100,
            ticks: {
              color: "rgba(256, 256, 256, 0.8)",
            },
          },
        },
      },
    });
  });
</script>

<div in:scale={{ duration: 500 }}>
  <canvas bind:this={chartCanvas} />
</div>

<style lang="scss">
  div {
    background-color: $bg-color-light;
    padding: 1rem;
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;

    @media (min-width: 500px) {
      height: 80%;
      width: 70%;
    }
    @media (min-width: 500px) {
      height: 70%;
      width: 70%;
    }
    @media (min-width: 1200px) {
      height: 70%;
      width: 60%;
    }
    @media (min-width: 1500px) {
      height: 600px;
      width: 1000px;
    }
  }
</style>
