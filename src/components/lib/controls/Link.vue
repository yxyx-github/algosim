<template>
    <RouterLink :="$props" custom v-slot="{ isActive, href, navigate }">
        <a :="$attrs" :href="href" @click="navigate" class="underline underline-offset-2">
            <slot/>
        </a>
    </RouterLink>
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
