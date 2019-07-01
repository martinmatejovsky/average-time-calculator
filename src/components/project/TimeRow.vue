<template>
    <div class="c-time-row">
        <BaseCheckbox type="checkbox" :inputModel="rowIsAffectiongCaltulation" />
        <BaseInput type="number" name="input-hours" />
        <BaseInput type="number" name="input-minutes" />
        <BaseInput type="number" name="input-seconds" />
        <div class="time-row-controller">
            <BaseButton label="-" classCustom="button-row-controller is-minus" @button-clicked-emit="buttonClickedRemove" />
            <BaseButton label="+" classCustom="button-row-controller is-plus" @button-clicked-emit="buttonClickedAdd" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rowIsAffectiongCaltulation: true
            }
        },
        methods: {
            buttonClickedRemove: function () {
                this.$emit('remove-time-row-emit')
            },
            buttonClickedAdd: function () {
                this.$emit('add-time-row-emit')
            }
        }
    }
</script>