<template>
    <div class="m-average-time">
        <h1>Výpočet průměrného času</h1>

        <!-- header -->
        <TimeRow role="heading" />

        <!-- rows with inputs -->
        <transition-group name="slide-to-side" tag="div">
            <template v-for="(timeRow, index) in timeRowsList">
                <TimeRow :key="timeRow.rowID" :initialEnabledState="timeRow.enabled" role="input"
                         :timeRowID="timeRow.rowID"
                         :initialTime="timeRow.totalTimeInMsec"
                         :isTheOnlyTimeRow="timeRowsList.length === 1" ref="timeRow"
                         @emit-remove-time-row="removeTimeRow(index)"
                         @emit-time-changed="timeRow.totalTimeInMsec = $event"
                         @emit-row-activity-status-changed="timeRow.enabled = $event"
                />
            </template>
        </transition-group>

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
            addTimeRow(customSettings) {
                let defaultSettings = {
                    enabled: true,
                    totalTimeInMsec: 0,
                    rowID: this.lastUsedRowID
                };
                let settings = Object.assign({}, defaultSettings, customSettings);

                this.timeRowsList.push(settings);
                this.lastUsedRowID++;
            },
            removeTimeRow(index) {
                this.timeRowsList.splice(index, 1);
            },
            parseTimeByUnits(timeInMs) {
                // TODO - this code is duplicated in TimeRow.vue
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
                this.addTimeRow({totalTimeInMsec: stopwatchTime});
            }
        },
        created() {
            this.addTimeRow();
        }
    }
</script>

<style scoped>
</style>
