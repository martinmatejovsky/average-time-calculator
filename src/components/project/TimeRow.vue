<template>
    <div class="c-time-row">
        <div class="time-row-activity-switch">
            <BaseCheckbox v-if="role === 'input'" type="checkbox" :inputModel="rowIsAffectingCaltulation" />
            <span v-if="role === 'heading'">on/off</span>
        </div>

        <div class="time-row-input-field">
            <BaseInput v-if="role === 'input'" type="number" name="input-hours" placeholder="hodiny" @emit-value-changed="updateTimeValue($event, 'hour')" />
            <span v-if="role === 'heading'">hodiny</span>
        </div>

        <div class="time-row-input-field">
            <BaseInput v-if="role === 'input'" type="number" name="input-minutes" placeholder="minuty" @emit-value-changed="updateTimeValue($event, 'min')" />
            <span v-if="role === 'heading'">minuty</span>
        </div>

        <div class="time-row-input-field">
            <BaseInput v-if="role === 'input'" type="number" name="input-seconds" placeholder="sekundy" @emit-value-changed="updateTimeValue($event, 'sec')" />
            <span v-if="role === 'heading'">sekundy</span>
        </div>

        <div class="time-row-controller">
            <BaseButton v-if="role === 'input'" classCustom="button-row-controller is-minus" @emit-button-clicked="buttonClickedRemove" />
            <span v-if="role === 'heading'" class="time-row-controller-heading">smaž</span>
        </div>
    </div>
</template>


<script>
    export default {
        name: "TimeRow",
        props: {
            // ROLE: component can be presented in multiple states - either as a row with inputs,
            // or as a row with names of each input instead of input fields. Row with names
            // is intended as table header thad reacts on actual list of inputs inside component
            role: {
                type: String,
                validator: (type) => ["heading", "input"].includes(type),
                default: "input"
            }
        },
        data() {
            return {
                rowIsAffectingCaltulation: true,
                timeInRow: {
                    // TODO: keep as number. Now it is receiving from input strings
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                }
            }
        },
        watch: {
            timeInRow: {
                deep: true,
                handler () {
                    console.log(this.timeInRow);
                }
            }
        },
        methods: {
            buttonClickedRemove: function () {
                this.$emit('remove-time-row-emit')
            },
            updateTimeValue: function (quantity, unit) {
                switch (unit) {
                    case 'hour':
                        // TODO: validator for numbers only
                        this.timeInRow.hours = quantity;
                        break;
                    case 'min':
                        this.timeInRow.minutes = quantity;
                        break;
                    case 'sec':
                        this.timeInRow.seconds = quantity;
                        break;
                }
            },
            emitNewTime () {
                this.$emit("emit-time-changed", this.timeInRow);
            }
        }
    }
</script>