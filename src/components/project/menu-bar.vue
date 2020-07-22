<template>
    <div class="c-menu-bar">
        <router-link :to="{name: 'settings'}" tag="div" class="menu-bar-control is-settings"/>
    </div>
</template>

<script>
    export default {
        name: "MenuBar",
    }
</script>
