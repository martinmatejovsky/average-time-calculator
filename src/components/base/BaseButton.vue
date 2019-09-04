<template>
    <div class="c-button" :class="this.classCustom">
        <button @click="buttonClickedEvent">{{label}}</button>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                default: "",
                type: String
            },
            classCustom: {
                default: "",
                type: String
            }
        },
        methods: {
            buttonClickedEvent: function () {
                this.$emit('emit-button-clicked');
            }
        }
    }
</script>