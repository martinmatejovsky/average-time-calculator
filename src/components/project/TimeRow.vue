<template>
    <div class="c-time-row">

        <!-- checkbox indicating if this time row is active and is influencing calculations -->
        <div class="time-row-activity-switch">
            <BaseCheckbox v-if="role === 'input'" type="checkbox" :inputModel.sync="rowIsAffectingCalculation" />
            <div v-if="role === 'heading'">on/off</div>
        </div>

        <!-- headers for inputs or inputs for times -->
        <template v-for="inputUnit in timeUnits">
            <div :key="inputUnit.label" v-if="inputUnit.enabled" class="time-row-input-field">
                <BaseInput v-if="role === 'input'" type="number" :name="'input-' + inputUnit.machineLabel + '-' + timeRowID" :placeholder="inputUnit.label" @emit-value-key-up="inputUnit.quantity = $event" />
                <div v-if="role === 'heading'">{{inputUnit.label}}</div>
            </div>
        </template>

        <!-- button for removing row -->
        <div class="time-row-controller">
            <BaseButton v-if="role === 'input'"  classCustom="button-row-controller is-minus" :disabled="isTheOnlyTimeRow" @emit-button-clicked="emitButtonClickedRemove" />
            <div v-if="role === 'heading'" class="time-row-controller-heading">smaž</div>
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
            timeRowID: {
                type: Number,
                default: 0
            },
            initialEnabledState: {
                type: Boolean,
                default: true
            },
            isTheOnlyTimeRow: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                rowIsAffectingCalculation: this.initialEnabledState,
                timeUnits: {
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
        watch: {
            timeUnits: {
                deep: true,
                handler () {
                    this.emitNewTime(this.timeUnits);
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