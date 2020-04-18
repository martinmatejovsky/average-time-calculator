<template>
    <div class="c-button" :class="this.classCustom">
        <button :type="type" :disabled="disabled" @click="buttonClickedEvent" @mousedown="buttonMouseDownEvent">
            <slot></slot>
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: "button"
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