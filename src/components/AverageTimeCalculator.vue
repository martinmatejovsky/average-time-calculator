<template>
    <div class="m-average-time">
        <h1>Výpočet průměrného času</h1>

        <!-- header -->
        <TimeRow role="heading" />

        <!-- rows with inputs -->
        <template v-for="(timeRow, index) in timeRowsList">
            <TimeRow :key="index" :initialEnabledState="timeRow.enabled" role="input"
                     :isTheOnlyTimeRow="timeRowsList.length === 1"
                     @emit-remove-time-row="removeTimeRow(index)"
                     @emit-time-changed="timeRow.totalTimeInMsec = $event"
                     @emit-row-activity-status-changed="timeRow.enabled = $event"
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
                // TODO: timeTowList should be an Array. Now it is an Object type
                timeRowsList: [
                    {
                        enabled: true,
                        totalTimeInMsec: 0
                    },
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
                if (totalTimeSum && rowsInCount) {
                    return totalTimeSum / rowsInCount;
                } else {
                    return 0;
                }
            }
        },
        methods: {
            removeTimeRow(index) {
                // TODO - removes always last Vue element regardless of index
                this.timeRowsList.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
</style>
