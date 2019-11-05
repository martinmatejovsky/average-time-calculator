<template>
    <div class="c-checkbox" :class="this.classCustom">
        <label class="checkbox-container">{{label}}
            <input type="checkbox" v-model="componentModel" @change="emitCheckboxModelChanged">
            <span class="checkbox-decorator"></span>
        </label>
    </div>
</template>

<script>
    export default {
        name: "BaseButton",
        props: {
            label: {
                type: String,
                default: ""
            },
            inputModel: {
                type: Boolean,
                default: false
            },
            classCustom: {
                type: String,
                default: ""
            }
        },
        data: function () {
            return {
                componentModel: this.inputModel
            }
        },
        methods: {
            emitCheckboxModelChanged() {
                this.$emit("update:inputModel", this.componentModel);
            }
        }
    }
</script>