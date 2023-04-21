<script>
export default {
    name: "AppIcon",
    props: {
        size: {default: "w-12"},
        font: {default: "text-lg font-light"},
        inline: {default: true},
        name: {default: false}
    },
}
</script>

<template>
    <div class="" :class="[inline? 'flex items-center' : 'text-center']">
        <img class="h-full" :class="size"
             src="@/assets/logo.svg">
        <h1 v-if="name" class="font-normal" :class="font">MUSICO</h1>
    </div>
</template>

<style scoped>

</style>