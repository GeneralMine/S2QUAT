<script>
    import { onMount } from "svelte";
    import Chart from "chart.js";
    import Card from "./Card.svelte";

    let id = randomID();

    export let title = "Exzellenz in München";
    export let icon;
    export let labels = ["TUM", "LMU", "Hochschule München"];
    export let data = [50, 25, 10];

    export let colors = [
        "#1F82C0", // blau
        "#F7C137", // gelb
        "#A90013", // rot
        "#11755E", // grün
        "#C5F6EB", // hellblau
    ];

    $: if (chartContext) drawChart(chartContext, data, labels);

    let ref;
    let chartContext;
    let chartCanvas;

    onMount(() => {
        chartContext = chartCanvas.getContext("2d");
        drawChart(chartContext, data, labels);
    });

    function drawChart(chartContext, data, labels) {
        const myChart = new Chart(chartContext, {
            type: "pie",
            data: {
                labels: Array.isArray(labels) ? labels.map((el) => el.substring(0, 6)) : ["TUM", "LMU", "Hochschule München"],
                datasets: [
                    {
                        label: title,
                        data: Array.isArray(data) ? data : [50, 25, 10],
                        backgroundColor: colors,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: "left",
                },
            },
        });

        myChart.canvas.parentNode.style.height = ref.style.height;
        myChart.canvas.parentNode.style.width = ref.style.width;
    }

    function randomID() {
        return "chart-" + Math.floor(Math.random() * 1000);
    }
</script>

<Card {title} {icon}>
    <div bind:this={ref} class="chart">
        <canvas bind:this={chartCanvas} {id} />
    </div>
</Card>

<style>
    /* https://stackoverflow.com/questions/37621020/setting-width-and-height */
    div {
        height: 95px;
        width: 247px;
    }
</style>
