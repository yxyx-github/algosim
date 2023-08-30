<template>
    <FColumn :gap="0">
        <label class="p-1"><slot name="label">{{ props.label || '' }}</slot></label>
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
