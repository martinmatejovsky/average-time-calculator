<template>
    <div class="c-checkbox" :class="this.classCustom">
        <label class="checkbox-container">{{label}}
            <input type="checkbox" v-model="inputModel">
            <span class="checkbox-decorator"></span>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                default: "",
                type: String
            },
            inputModel: {
                default: false,
                type: Boolean
            },
            classCustom: {
                default: "",
                type: String
            }
        }
    }
</script>