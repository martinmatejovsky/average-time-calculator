<template>
    <div class="c-input" :class="classObject">
        <input :type="type" :size="size" v-model="inputModel" />
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
            'inputModel': {}
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