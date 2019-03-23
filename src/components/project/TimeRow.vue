<template>
    <div class="c-time-row">
        <Input type="checkbox" :inputModel="rowIsAffectiongCaltulation"/>
        <Input class="is-mini" type="number" />
        <Input class="is-mini" type="number" />
        <Input class="is-mini" type="number" />
        <Button label="-" classCustom="button-row-controller is-minus"/>
        <Button label="+" classCustom="button-row-controller is-plus"/>
    </div>
</template>

<script>
    import Input from '../form/Input'
    import Button from "../form/Button";

    export default {
        components: {
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