<template>
    <FColumn :gap="0">
        <div v-for="(fragment, index) in props.text" :key="index">{{ fragment }}</div>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'

const props = defineProps<{
    text: string[]
}>()
</script>

<style scoped>
</style>
