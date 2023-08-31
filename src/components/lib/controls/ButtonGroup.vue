<template>
    <FRow :gap="0" class="p-buttonset">
        <slot/>
    </FRow>
</template>

<script setup lang="ts">
import FRow from '@/components/lib/layout/FRow.vue'
</script>

<style scoped>
</style>
