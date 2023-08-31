<template>
    <FContainer direction="col" :="props">
        <slot/>
    </FContainer>
</template>

<script lang="ts" setup>
import FContainer from '@/components/lib/layout/FContainer.vue'
import type { FlexProps } from '@/components/lib/layout/FContainer.vue'

const props = defineProps<Omit<FlexProps, 'direction'>>()
</script>

<style scoped>
</style>
