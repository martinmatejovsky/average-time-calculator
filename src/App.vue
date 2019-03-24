<template>
    <div id="app">
        <TimeCalculator />
    </div>
</template>

<script>
    import TimeCalculator  from './components/TheTimeCalculator.vue'

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
