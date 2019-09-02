<template>
    <div id="app">
        <TimeCalculator />
    </div>
</template>

<script>
    import TimeCalculator  from './components/AverageTimeCalculator.vue'

    export default {
        name: 'app',
        components: {
            TimeCalculator
        }
    }
</script>

<style>
    @import './css/style.css';
</style>
