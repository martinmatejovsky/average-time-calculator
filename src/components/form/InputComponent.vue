<template>
    <div class="c-input" :class="classObject">
        <input :type="type" :size="size" />
    </div>
</template>

<script>
    export default {
        props: {
            'type': {
                default: "text",
                type: String
            },
            'size': {
                default: 16,
                type: Number
            },
        },
        computed: {
            classObject: function () {
                return {
                    "is-number": this.type === "number"
                }
            }
        }
    }
</script>