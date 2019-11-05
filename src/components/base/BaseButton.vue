<template>
    <div class="c-button" :class="this.classCustom">
        <button :disabled="disabled" @click="buttonClickedEvent" @mousedown="buttonMouseDownEvent">{{label}}</button>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ""
            },
            disabled: {
                type: Boolean,
                default: false
            },
            classCustom: {
                type: String,
                default: ""
            }
        },
        methods: {
            buttonClickedEvent: function () {
                this.$emit('emit-button-clicked');
            },
            buttonMouseDownEvent: function () {
                this.$emit('emit-button-mouse-down');
            }
        }
    }
</script>