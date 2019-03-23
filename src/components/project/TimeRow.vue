<template>
    <div class="c-time-row">
        <Checkbox type="checkbox" :inputModel="rowIsAffectiongCaltulation" />
        <Input type="number" />
        <Input type="number" />
        <Input type="number" />
        <div class="time-row-controller">
            <Button label="-" classCustom="button-row-controller is-minus" />
            <Button label="+" classCustom="button-row-controller is-plus" />
        </div>
    </div>
</template>

<script>
    import Input from '../form/Input'
    import Button from "../form/Button";
    import Checkbox from "../form/Checkbox";

    export default {
        components: {
            Checkbox,
            Button,
            Input
        },
        data() {
            return {
                rowIsAffectiongCaltulation: "true"
            }
        }
    }
</script>