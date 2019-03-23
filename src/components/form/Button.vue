<template>
    <div class="c-button" :class="this.classCustom">
        <button>{{label}}</button>
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
        }
    }
</script>