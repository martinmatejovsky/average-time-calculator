<template>
    <div class="c-time-row">
        <Checkbox type="checkbox" :inputModel="rowIsAffectiongCaltulation" />
        <Input class="is-mini" type="number" />
        <Input class="is-mini" type="number" />
        <Input class="is-mini" type="number" />
        <Button label="-" classCustom="button-row-controller is-minus" />
        <Button label="+" classCustom="button-row-controller is-plus" />
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