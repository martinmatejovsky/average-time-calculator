<template>
    <div class="m-average-time">
        <h1>Výpočet průměrného času</h1>

        <!-- header -->
        <TimeRow role="heading" />

        <!-- rows with inputs -->
        <template v-for="(timeRow, index) in timeRowsList">
            <TimeRow :key="index" :is-enabled="timeRow.enabled" role="input"
                     @emit-remove-time-row="removeTimeRow"
                     @emit-time-changed="timeRow.totalTimeInMsec = $event"
                     @emitActivityStatusChanged="timeRow.enabled = $event"
            />
        </template>
        <!-- result container -->
        <div class="time-calc-result">
            <div class="average-time-result-label">Průměrný čas:</div>
            <div class="average-time-result-value">{{averageTime}}</div>
        </div>
    </div>

</template>

<script>
    import TimeRow from "./project/TimeRow";

    export default {
        name: 'AverageTimeCalculator',
        components: {
            TimeRow
        },
        data() {
            return {
                timeRowsList: [
                    {
                        enabled: true,
                        totalTimeInMsec: 0
                    },
                    {
                        enabled: true,
                        totalTimeInMsec: 0
                    }
                ]
            }
        },
        computed: {
            averageTime() {
                let totalTimeSum = 0;
                let rowsInCount = 0;
                for (let i = 0; i < this.timeRowsList.length; i++) {
                    let tRow = this.timeRowsList[i];

                    if (tRow.enabled && tRow.totalTimeInMsec > 0) {
                        rowsInCount += 1;
                        totalTimeSum += this.timeRowsList[i].totalTimeInMsec;
                    }
                }
                return totalTimeSum / rowsInCount;
            }
        },
        methods: {
            removeTimeRow() {
                // TODO - do something beautiful
            },
            saveTimeRowPayload(rowIndex, newTime) {
                this.timeRowsList[rowIndex].totalTimeInMsec = newTime;
            },
            updateState() {

            }
        }
    }
</script>

<style scoped>
</style>
