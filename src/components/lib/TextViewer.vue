<template>
    <FColumn :gap="0">
        <div class="textBox">
            <div v-for="(fragment, index) in props.text" :key="index" class="text">{{ fragment }}</div>
        </div>
    </FColumn>
</template>

<script setup lang="ts">
import FColumn from '@/components/lib/layout/FColumn.vue'

const props = defineProps<{
    text: string[]
}>()
</script>

<style scoped>
.textBox{
    padding: 2%;
    margin-left: 5%;
    margin-right: 5%;
    border: 0.8rem solid #3B82F6;
    border-radius: 0.625rem;
    
}

.textBox:empty{
    border: none;
}

.text{
    font-size: 20px;
}
</style>
