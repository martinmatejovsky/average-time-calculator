<template>
    <div class="c-stopwatch">
        <BaseButton classCustom="button-row-controller is-stopwatch-start" @emit-button-mouse-down="startMeasuringTime" />

        <div v-if="stopwatchInterval" class="stopwatch-overlay-container">
            <div class="stopwatch-overlay" @mousedown="stopMeasuringTime">
                <div class="stopwatch-values-wrapper">
                    <span v-if="days" class="stopwatch-view-days">{{days}}</span>
                    <span v-if="hours || days" class="stopwatch-view-hours">{{hours}}&nbsp;{{hoursMinDivider}}&nbsp;</span>
                    <span class="stopwatch-view-minutes">{{minutes}}&nbsp;{{minSecDivider}}&nbsp;</span>
                    <span class="stopwatch-view-seconds">{{seconds}}{{secCentisecDivider}}</span>
                    <span class="stopwatch-view-miliseconds">{{milliseconds}}</span>
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
            }
        },
        data: function() {
            return {
                stopwatchInterval: 0,
                startedOnDate: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        },
        methods: {
            updateStopwatch: function() {
                let now = new Date().getTime();
                let timeDif = now - this.startedOnDate;

                this.days = Math.floor(timeDif / (1000 * 60 * 60 * 24));
                this.hours = Math.floor(timeDif / (1000 * 60 * 60) % 24);
                this.minutes = this.padToTwoDigits( Math.floor(timeDif / (1000 * 60) % 60) );
                this.seconds = this.padToTwoDigits( Math.floor(timeDif / 1000 % 60) );
                this.milliseconds = this.padToTwoDigits( Math.floor(timeDif / 10 % 100) );
            },
            startMeasuringTime() {
                if (!this.stopwatchInterval) {
                    this.startedOnDate = new Date().getTime();

                    this.stopwatchInterval = setInterval(this.updateStopwatch, 10);
                }
            },
            stopMeasuringTime() {
                clearInterval(this.stopwatchInterval);
                this.stopwatchInterval = 0;
                this.startedOnDate = 0;
            },
            padToTwoDigits(number) {
                return ("00" + number).substr(-2);
            }
        }
    }
</script>