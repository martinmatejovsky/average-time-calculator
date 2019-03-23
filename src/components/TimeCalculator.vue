<template>
    <div>
        <h1>Výpočet průměrného času</h1>

        <TimeRow />
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
        }
    }
</script>

<style scoped>
</style>
