<template>
    <div class="c-stopwatch">
        <BaseButton classCustom="button-row-controller is-stopwatch-start" @emit-button-mouse-down="startMeasuringTime" />

        <div v-if="stopwatchInterval" class="stopwatch-overlay-container">
            <div class="stopwatch-overlay" @mousedown="stopMeasuringTime">
                <div class="stopwatch-values-wrapper">
                    <span v-if="measuredTime.day" class="stopwatch-view-days">{{measuredTime.day}}</span>
                    <span v-if="measuredTime.hour || measuredTime.day" class="stopwatch-view-hours">{{measuredTime.hour}}{{hoursMinDivider}}</span>
                    <span class="stopwatch-view-minutes">{{measuredTime.minute}}{{minSecDivider}}</span>
                    <span class="stopwatch-view-seconds">{{measuredTime.second}}{{secCentisecDivider}}</span>
                    <span class="stopwatch-view-miliseconds">{{measuredTime.centisecond}}</span>
                </div>
                <div class="stopwatch-instruction">{{instructions}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Stopwatch",
        props: {
            instructions: {
                type: String,
                default: "STOP dotykem"
            },
            hoursMinDivider: {
                type: String,
                default: ":"
            },
            minSecDivider: {
                type: String,
                default: ":"
            },
            secCentisecDivider: {
                type: String,
                default: ","
            },
            // in milliseconds how fast is stopwatch refreshing viewed numbers
            interval: {
                type: Number,
                default: 10
            }
        },
        data: function() {
            return {
                stopwatchInterval: 0,
                startedOnDate: 0,
                measuredTime: {
                    total: 0,
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    centisecond: 0
                }
            }
        },
        methods: {
            updateStopwatch: function() {
                let now = new Date().getTime();
                let timeDif = this.measuredTime.total = now - this.startedOnDate;

                this.measuredTime.day = Math.floor(timeDif / (1000 * 60 * 60 * 24));
                this.measuredTime.hour = Math.floor(timeDif / (1000 * 60 * 60) % 24);
                this.measuredTime.minute = this.padToTwoDigits( Math.floor(timeDif / (1000 * 60) % 60) );
                this.measuredTime.second = this.padToTwoDigits( Math.floor(timeDif / 1000 % 60) );
                this.measuredTime.centisecond = this.padToTwoDigits( Math.floor(timeDif / 10 % 100) );
            },
            startMeasuringTime(interval) {
                if (!this.stopwatchInterval) {
                    this.startedOnDate = new Date().getTime();
                    this.stopwatchInterval = setInterval(this.updateStopwatch, interval);
                }
            },
            stopMeasuringTime() {
                clearInterval(this.stopwatchInterval);
                this.emitMeasuredTime();
                this.stopwatchInterval = 0;
                this.startedOnDate = 0;
            },
            padToTwoDigits(number) {
                return ("00" + number).substr(-2);
            },
            emitMeasuredTime() {
                this.$emit("emit-measured-time", this.measuredTime.total);
            },
        }
    }
</script>