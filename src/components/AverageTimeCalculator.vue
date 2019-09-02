<template>
    <div class="m-average-time">
        <h1>Výpočet průměrného času</h1>

        <!-- header -->
        <TimeRow role="heading" />

        <!-- rows with inputs -->
        <TimeRow role="input" @remove-time-row-emit="removeTimeRow" />

        <!-- result container -->
        <div class="time-calc-result">
            <div class="average-time-result-label">Průměrný čas:</div>
            <div class="average-time-result-value">{{averageTime}}</div>
        </div>
    </div>

</template>

<script>
    import TimeRow from "./project/TimeRow";
    import store from "../store/index";

    export default {
        name: 'HelloWorld',
        components: {
            TimeRow
        },
        computed: {
            averageTime() {
                return store.state.averageTime;
            }
        },
        methods: {
            removeTimeRow: () => {
                store.commit("mutateAverageTime", 20)
            }
        }
    }
</script>

<style scoped>
</style>
