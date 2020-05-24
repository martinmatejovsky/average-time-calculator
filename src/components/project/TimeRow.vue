<template>
    <div class="c-time-row" :class="{'is-not-affecting-calculation' : !rowIsAffectingCalculation}">

        <!-- checkbox indicating if this time row is active and is influencing calculations -->
        <div class="time-row-activity-switch">
            <BaseCheckbox v-if="role === 'input'" type="checkbox" :inputModel.sync="rowIsAffectingCalculation" />
            <div v-if="role === 'heading'">skrýt</div>
        </div>

        <!-- headers for inputs or inputs for times -->
        <template v-for="inputUnit in timeUnits">
            <div :key="inputUnit.label" v-if="inputUnit.enabled" class="time-row-input-field">
                <BaseInput v-if="role === 'input'" type="number" :name="'input-' + inputUnit.machineLabel + '-' + timeRowID"
                           :placeholder="inputUnit.placeholder"
                           :inputValue.sync="inputUnit.quantity"
                           @emit-value-key-up="inputUnit.quantity = $event" />
                <div v-if="role === 'heading'">{{inputUnit.label}}</div>
            </div>
        </template>

        <!-- button for removing row -->
        <div class="time-row-controller">
            <BaseButton v-if="role === 'input'"  classCustom="button-row-controller is-minus" :disabled="isTheOnlyTimeRow"
                        @emit-button-clicked="overlayRemovalVisible = true" />
            <div v-if="role === 'heading'" class="time-row-controller-heading">smaž</div>
        </div>

        <!-- overlay to confirm row removal -->
        <BaseOverlay v-if="overlayRemovalVisible">
            <div class="time-row-confirm-message">Opravdu chcete odstranit řádek?</div>
            <div class="time-row-confirm-controls">
                <BaseButton classCustom="is-major is-confirm" @emit-button-clicked="emitButtonClickedRemove">
                    Odstranit
                </BaseButton>
                <BaseButton classCustom="is-major" @emit-button-clicked="overlayRemovalVisible = false">
                    Zpět
                </BaseButton>
            </div>
        </BaseOverlay>
    </div>
</template>


<script>
    import BaseOverlay from "../base/BaseOverlay";
    import BaseButton from "../base/BaseButton";
    export default {
        name: "TimeRow",
        components: {BaseButton, BaseOverlay},
        props: {
            // ROLE: component can be presented in two states - either as a row with inputs,
            // or as a row with names. Row with names is intended as table header: only names
            // for enabled inputs are shown.
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
            },
            parentTime: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                rowIsAffectingCalculation: this.initialEnabledState,
                overlayRemovalVisible: false,
                timeUnits: {
                    day: {
                        enabled: false,
                        quantity: null,
                        label: "dny",
                        machineLabel: "days",
                        placeholder: "dny"
                    },
                    hour: {
                        enabled: false,
                        quantity: null,
                        label: "hodiny",
                        machineLabel: "hours",
                        placeholder: "h"
                    },
                    minute: {
                        enabled: true,
                        quantity: null,
                        label: "minuty",
                        machineLabel: "minutes",
                        placeholder: "min"
                    },
                    second: {
                        enabled: true,
                        quantity: null,
                        label: "sekundy",
                        machineLabel: "seconds",
                        placeholder: "s"
                    },
                    centisecond: {
                        enabled: true,
                        quantity: null,
                        label: "setiny",
                        machineLabel: "hundredths",
                        placeholder: "set"
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
                        (this.timeUnits.second.quantity * 1000) +
                        (this.timeUnits.centisecond.quantity * 10);

                    this.emitNewTime(totalTime);
                }
            },
            parentTime() {
                this.parseTotalTimeIntoValues();
            },
            rowIsAffectingCalculation() {
                this.emitActivityStatusChanged();
            }
        },
        methods: {
            emitButtonClickedRemove() {
                this.overlayRemovalVisible = false;
                this.$destroy();
            },
            emitNewTime(totalTime) {
                this.$emit("emit-time-changed", totalTime);
            },
            emitActivityStatusChanged() {
                this.$emit("emit-row-activity-status-changed", this.rowIsAffectingCalculation)
            },
            parseTotalTimeIntoValues() {
                // TODO - this code is duplicated in AverageTimeCalculator.vue
                // TODO - simplify somehow
                if (this.timeUnits.centisecond.enabled){
                    if (this.timeUnits.second.enabled) {
                        this.timeUnits.centisecond.quantity =  Math.floor((this.parentTime / 10) % 100)
                    } else {this.timeUnits.centisecond.quantity =  Math.floor(this.parentTime / 10)}
                }

                if (this.timeUnits.second.enabled) {
                    if (this.timeUnits.minute.enabled) {
                        this.timeUnits.second.quantity = Math.floor((this.parentTime / 1000) % 60)
                    } else {
                        this.timeUnits.second.quantity = Math.floor(this.parentTime / 1000)
                    }
                }

                if (this.timeUnits.minute.enabled) {
                    if (this.timeUnits.hour.enabled) {
                        this.timeUnits.minute.quantity = Math.floor((this.parentTime / 60000) % 60)
                    } else {this.timeUnits.minute.quantity = Math.floor(this.parentTime / 60000)}
                }

                if (this.timeUnits.hour.enabled) {
                    if (this.timeUnits.day.enabled) {
                        this.timeUnits.hour.quantity =  Math.floor((this.parentTime / 3600000) % 24);
                    } else {this.timeUnits.hour.quantity = Math.floor(this.parentTime / 3600000)}
                }

                if (this.timeUnits.day.enabled) {
                    this.timeUnits.day.quantity = Math.floor(this.parentTime / 86400000);
                }
            }
        },
        created() {
            if (this.parentTime) {
                this.parseTotalTimeIntoValues();
            }
        },
        destroyed() {
            this.$emit('emit-remove-time-row');
        }
    }
</script>