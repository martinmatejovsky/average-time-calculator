<template>
    <div class="c-button" :class="this.classCustom">
        <button :disabled="disabled" @click="buttonClickedEvent">{{label}}</button>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ""
            },
            classCustom: {
                type: String,
                default: ""
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            buttonClickedEvent: function () {
                this.$emit('emit-button-clicked');
            }
        }
    }
</script>