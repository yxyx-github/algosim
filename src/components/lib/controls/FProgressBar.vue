<template>
    <FColumn :gap="0">
        <div v-if="$slots.default" class="text-center"><slot/></div>
        <div class="bg-gray-300">
            <div class="h-4 bg-blue-300" :style="`width: ${props.value}%;`"></div>
        </div>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'

const props = defineProps<{
    value: number
}>()
</script>

<style scoped>
</style>
