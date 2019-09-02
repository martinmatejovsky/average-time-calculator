<template>
    <div class="c-time-row">
        <div class="time-row-activity-switch">
            <BaseCheckbox v-if="role === 'input'" type="checkbox" :inputModel="rowIsAffectingCaltulation" />
            <span v-if="role === 'heading'">on/off</span>
        </div>

        <div class="time-row-input-field">
            <BaseInput v-if="role === 'input'" type="number" name="input-hours" placeholder="hodiny" />
            <span v-if="role === 'heading'">hodiny</span>
        </div>

        <div class="time-row-input-field">
            <BaseInput v-if="role === 'input'" type="number" name="input-minutes" placeholder="minuty" />
            <span v-if="role === 'heading'">minuty</span>
        </div>

        <div class="time-row-input-field">
            <BaseInput v-if="role === 'input'" type="number" name="input-seconds" placeholder="sekundy" />
            <span v-if="role === 'heading'">sekundy</span>
        </div>

        <div class="time-row-controller">
            <BaseButton v-if="role === 'input'" classCustom="button-row-controller is-minus" @button-clicked-emit="buttonClickedRemove" />
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
            }
        },
        methods: {
            buttonClickedRemove: function () {
                this.$emit('remove-time-row-emit')
            }
        }
    }
</script>