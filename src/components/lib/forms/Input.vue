<template>
    <FColumn :gap="1">
        <label><slot name="label">{{ props.label ?? '' }}</slot></label>
        <slot name="default"/>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'

const props = defineProps<{
    label?: string
}>()
</script>

<style scoped>
</style>
