<template>
    <FColumn :gap="0">
        <div v-if="$slots.default" class="text-center"><slot/></div>
        <div class="bg-gray-200 rounded-md overflow-hidden relative">
            <div class="h-6 bg-blue-500 relative" :style="`width: ${props.value}%;`"></div>
            <div class="w-full absolute top-0 left-0 text-center whitespace-nowrap" v-if="props.label">{{ props.label }}</div>
        </div>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'

const props = defineProps<{
    value: number
    label?: string
}>()
</script>

<style scoped>
</style>
