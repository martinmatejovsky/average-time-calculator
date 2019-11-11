<template>
    <div class="m-average-time">
        <h1>Výpočet průměrného času</h1>

        <!-- header -->
        <TimeRow role="heading" />

        <!-- rows with inputs -->
        <template v-for="(timeRow, index) in timeRowsList">
            <TimeRow :key="timeRow.rowID" :initialEnabledState="timeRow.enabled" role="input" :timeRowID="timeRow.rowID"
                     :isTheOnlyTimeRow="timeRowsList.length === 1" ref="timeRow"
                     @emit-remove-time-row="removeTimeRow(index)"
                     @emit-time-changed="timeRow.totalTimeInMsec = $event"
                     @emit-row-activity-status-changed="timeRow.enabled = $event"
            />
        </template>

        <!-- add rows controller -->
        <div class="average-time-add-time-row">
            <BaseButton classCustom="button-row-controller is-plus" @emit-button-clicked="addTimeRow" />
            <Stopwatch @emit-measured-time="addRowFromStopwatch"/>
        </div>

        <!-- result container -->
        <div class="average-time-result">
            <div class="average-time-result-label">Průměrný čas:</div>
            <div class="average-time-result-value">{{averageTime}}</div>
        </div>
    </div>

</template>

<script>
    import TimeRow from "./project/TimeRow";
    import Stopwatch from "./project/Stopwatch";

    export default {
        name: "AverageTimeCalculator",
        components: {
            TimeRow,
            Stopwatch
        },
        data() {
            return {
                timeRowsList: [],
                lastUsedRowID: 1
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
                    return this.parseTimeByUnits(Math.floor(totalTimeSum / rowsInCount));
                } else {
                    return 0;
                }
            }
        },
        methods: {
            addTimeRow() {
                this.timeRowsList.push({
                    enabled: true,
                    totalTimeInMsec: 0,
                    rowID: this.lastUsedRowID
                });
                this.lastUsedRowID++;
            },
            removeTimeRow(index) {
                this.timeRowsList.splice(index, 1);
            },
            parseTimeByUnits(timeInMs) {
                let wholeDays =  Math.floor(timeInMs / 86400000);
                let wholeHours =  Math.floor((timeInMs / 3600000) % 24);
                let wholeMinuted =  Math.floor((timeInMs / 60000) % 60);
                let seconds =  parseFloat(((timeInMs / 1000) % 60).toFixed(2));

                let dayString = wholeDays ? wholeDays + " d " : "";
                let hourString = wholeHours ? wholeHours + " h " : "";
                let minuteString = wholeMinuted ? wholeMinuted + " m " : "";
                let secondString = seconds ? seconds + " s " : "";

                return dayString + hourString + minuteString + secondString;
            },
            addRowFromStopwatch(stopwatchTime) {
                this.addTimeRow();
                this.$nextTick( () => {
                        // TODO - how to run internal method only in specified timeRow?
                        let lastIndex = this.$refs.timeRow.length - 1;
                        this.$refs.timeRow[lastIndex].fillTimeRow(stopwatchTime);
                    }
                );
            }
        },
        created() {
            this.addTimeRow();
        }
    }
</script>

<style scoped>
</style>
