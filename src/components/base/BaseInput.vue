<template>
    <div class="c-input" :class="classObject">
        <input :type="type" :size="size" name="name" :placeholder="placeholder" :readonly="readonly" />
    </div>
</template>

<script>
    export default {
        props: {
            'type': {
                type: String,
                default: "text"
            },
            'size': {
                type: Number,
                default: 16
            },
            'name': {
                type: String,
                default: "",
                required: true
            },
            'placeholder': {
                type: String,
                default: ""
            },
            'readonly': {
                type: Boolean,
                default: false
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