<template>
    <FColumn class="pb-2 h-[3.125rem]" justifyItems="around" :gap="0" :grow="true">
        <label class="text-center">
            <slot name="label">{{ props.label ?? '' }}</slot>
        </label>
        <slot/>
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
