<template>
    <div class="c-time-row">
        <CheckboxComponent type="checkbox" :inputModel="rowIsAffectiongCaltulation" />
        <InputComponent type="number" />
        <InputComponent type="number" />
        <InputComponent type="number" />
        <div class="time-row-controller">
            <ButtonComponent label="-" classCustom="button-row-controller is-minus" />
            <ButtonComponent label="+" classCustom="button-row-controller is-plus" />
        </div>
    </div>
</template>

<script>
    import InputComponent from '../form/InputComponent'
    import ButtonComponent from "../form/ButtonComponent";
    import CheckboxComponent from "../form/CheckboxComponent";

    export default {
        components: {
            CheckboxComponent,
            ButtonComponent,
            InputComponent
        },
        data() {
            return {
                rowIsAffectiongCaltulation: "true"
            }
        }
    }
</script>