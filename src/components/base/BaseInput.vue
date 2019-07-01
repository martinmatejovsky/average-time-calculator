<template>
    <div class="c-input" :class="classObject">
        <input :type="type" :size="size" name="name"/>
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
            'name': {
                default: "",
                type: String,
                required: true
            }
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