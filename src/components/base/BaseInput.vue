<template>
    <div class="c-input" :class="classObject">
        <input :type="type" :size="size" :name="name" :placeholder="placeholder" :readonly="readonly" v-model="componentModel" lang="cs"
               @change="emitValueChanged"
               @keydown="emitValueEntered"/>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: "text"
            },
            size: {
                type: Number,
                default: 16
            },
            name: {
                type: String,
                default: "",
                required: true
            },
            inputValue: {
                type: Number,
                default: null
            },
            placeholder: {
                type: String,
                default: ""
            },
            readonly: {
                type: Boolean,
                default: false
            },
            classCustom: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                componentModel: this.inputValue
            }
        },
        computed: {
            classObject: function () {
                return {
                    "is-number": this.type === "number"
                }
            }
        },
        methods: {
            emitValueChanged() {
                this.$emit("emit-value-changed", this.componentModel);
            },
            emitValueEntered() {
                this.$emit("emit-value-key-down", this.componentModel);
            }
        }
    }
</script>