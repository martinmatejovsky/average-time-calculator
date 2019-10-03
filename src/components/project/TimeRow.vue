<template>
    <div class="c-time-row">

        <!-- checkbox indicating if this time row is active and is influencing calculations -->
        <div class="time-row-activity-switch">
            <BaseCheckbox v-if="role === 'input'" type="checkbox" :inputModel.sync="rowIsAffectingCalculation" />
            <span v-if="role === 'heading'">on/off</span>
        </div>

        <!-- headers for inputs or inputs for times -->
        <template v-for="input in timeUnits">
            <div :key="input.label" v-if="input.enabled" class="time-row-input-field">
                <BaseInput v-if="role === 'input'" type="number" name="input-minutes" :placeholder="input.label" @emit-value-key-up="input.quantity = $event" />
                <span v-if="role === 'heading'">minuty</span>
            </div>
        </template>

        <!-- button for removing row -->
        <div class="time-row-controller">
            <BaseButton v-if="role === 'input'" classCustom="button-row-controller is-minus" @emit-button-clicked="emitButtonClickedRemove" />
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
            },
            initialEnabledState: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                rowIsAffectingCalculation: this.initialEnabledState,
                timeUnits: {
                    day: {
                        enabled: false,
                        quantity: 0,
                        label: "dny"
                    },
                    hour: {
                        enabled: true,
                        quantity: 0,
                        label: "hodiny"
                    },
                    minute: {
                        enabled: true,
                        quantity: 0,
                        label: "minuty"
                    },
                    second: {
                        enabled: true,
                        quantity: 0,
                        label: "sekundy"
                    }
                }
            }
        },
        watch: {
            timeUnits: {
                deep: true,
                handler () {
                    let totalTime =
                        (this.timeUnits.day.quantity * 1000 * 60 * 60 * 24) +
                        (this.timeUnits.hour.quantity * 1000 * 60 * 60) +
                        (this.timeUnits.minute.quantity * 1000 * 60) +
                        (this.timeUnits.second.quantity * 1000);

                    this.emitNewTime(totalTime);
                }
            },
            rowIsAffectingCalculation() {
                this.emitActivityStatusChanged();
            }
        },
        methods: {
            emitButtonClickedRemove() {
                this.$emit('emit-remove-time-row')
            },
            emitNewTime(totalTime) {
                this.$emit("emit-time-changed", totalTime);
            },
            emitActivityStatusChanged() {
                this.$emit("emit-row-activity-status-changed", this.rowIsAffectingCalculation)
            }
        }
    }
</script>