<template>
    <div class="m-average-time">
        <h1>Výpočet průměrného času</h1>

        <!-- header -->
        <TimeRow role="heading" />

        <!-- rows with inputs -->
        <!-- TODO - if possible remove wrapping div and use <template> instead -->
        <div v-for="(timeRow, index) in timeRowsList" :key="index">
            <TimeRow :key="index" :initialEnabledState="timeRow.enabled" role="input" :timeRowID="index"
                     :isTheOnlyTimeRow="timeRowsList.length === 1"
                     @emit-remove-time-row="removeTimeRow(index)"
                     @emit-time-changed="timeRow.totalTimeInMsec = $event"
                     @emit-row-activity-status-changed="timeRow.enabled = $event"
            />
            <div @click="myRemove(timeRow)">Remove</div>
        </div>

        <!-- add rows controller -->
        <div class="average-time-add-time-row">
            <BaseButton classCustom="button-row-controller is-plus" @emit-button-clicked="emitButtonClickedAdd" />
        </div>

        <!-- result container -->
        <div class="average-time-calc-result">
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
                    }
                ],
                // TODO: to have this duplicated in <timeRow> is a bad idea
                timeRowTemplate: {
                    day: {
                        enabled: false,
                        quantity: 0,
                        label: "dny",
                        machineLabel: "days"
                    },
                    hour: {
                        enabled: true,
                        quantity: 0,
                        label: "hodiny",
                        machineLabel: "hours"
                    },
                    minute: {
                        enabled: true,
                        quantity: 0,
                        label: "minuty",
                        machineLabel: "minutes"
                    },
                    second: {
                        enabled: true,
                        quantity: 0,
                        label: "sekundy",
                        machineLabel: "seconds"
                    }
                }
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
                    return Math.floor(totalTimeSum / rowsInCount);
                } else {
                    return 0;
                }
            }
        },
        methods: {
            removeTimeRow(index) {
                // TODO - incorrectly removes always last Vue element regardless of index
                this.timeRowsList.splice(index, 1);
            },
            emitButtonClickedAdd() {
                this.timeRowsList.push(
                    {
                        enabled: true,
                        totalTimeInMsec: 0
                    }
                )
            }
        }
    }
</script>

<style scoped>
</style>
