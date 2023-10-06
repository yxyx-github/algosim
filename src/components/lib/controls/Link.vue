<template>
</template>

<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router'

defineOptions({ inheritAttrs: false })

interface Props extends RouterLinkProps {

}

const props = defineProps<Props>()
</script>

<style scoped>
</style>
