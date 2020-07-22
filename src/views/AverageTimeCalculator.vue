<template>
    <div class="m-average-time">
        <MenuBar></MenuBar>

        <h1>Výpočet průměrného času</h1>

        <!-- header -->
        <TimeRow role="heading" />

        <!-- rows with inputs -->
        <transition-group name="slide-to-side" tag="div">
            <template v-for="(timeRow, index) in timeRowsList">
                <TimeRow :key="timeRow.rowID" :initialEnabledState="timeRow.enabled" role="input"
                         :timeRowID="timeRow.rowID"
                         :parentTime="timeRow.totalTimeInMsec"
                         :isTheOnlyTimeRow="timeRowsList.length === 1" ref="timeRow"
                         @emit-remove-time-row="removeTimeRow(index)"
                         @emit-time-changed="timeRow.totalTimeInMsec = $event"
                         @emit-row-activity-status-changed="timeRow.enabled = $event"
                />
            </template>
        </transition-group>

        <!-- add rows controller -->
        <div class="average-time-add-time-row">
            <BaseButton classCustom="button-row-controller is-plus is-major" @emit-button-clicked="addTimeRow" />
            <Stopwatch @emit-measured-time="addRowFromStopwatch"/>
        </div>

        <!-- result container -->
        <div class="average-time-result">
            <div class="average-time-result-label">Průměrný čas:</div>
            <div class="average-time-result-value">{{averageTime.toLocaleString('cs-CZ')}}</div>
        </div>
    </div>

</template>

<script>
    import MenuBar from "../components/project/menu-bar";
    import TimeRow from "../components/project/TimeRow";
    import Stopwatch from "../components/project/Stopwatch";

    export default {
        name: "AverageTimeCalculator",
        components: {
            MenuBar,
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
            },
            localeLang() {
                return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
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

                seconds = seconds.toLocaleString(this.localeLang);

                let dayString = wholeDays ? wholeDays + " d " : "";
                let hourString = wholeHours ? wholeHours + " h " : "";
                let minuteString = wholeMinuted ? wholeMinuted + " m " : "";
                let secondString = seconds ? seconds + " s " : "";

                return dayString + hourString + minuteString + secondString;
            },
            addRowFromStopwatch(stopwatchTime) {
                if (this.timeRowsList[this.timeRowsList.length - 1].totalTimeInMsec === 0) {
                    this.timeRowsList[this.timeRowsList.length - 1].totalTimeInMsec = stopwatchTime;
                } else {
                    this.addTimeRow({totalTimeInMsec: stopwatchTime});
                }
            }
        },
        created() {
            this.addTimeRow();
        }
    }
</script>