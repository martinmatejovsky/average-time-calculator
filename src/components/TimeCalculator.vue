<template>
    <div>
        <h1>Výpočet průměrného času</h1>

        <TimeRow @remove-time-row-emit="removeTimeRow"/>
    </div>
</template>

<script>
    import TimeRow from "./project/TimeRow";

    export default {
        name: 'HelloWorld',
        components: {
            TimeRow
        },
        props: {
            msg: String
        },
        methods: {
            removeTimeRow: () => {}
        }
    }
</script>

<style scoped>
</style>
