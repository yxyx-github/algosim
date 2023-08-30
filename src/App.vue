<template>
    <FColumn class="relative z-0 bg-bg h-screen">
        <MainNavigation/>
        <FColumn :is="ContentBox" :grow="true">
            <RouterView/>
        </FColumn>
    </FColumn>
<!--        <div class="border-2 border-red-600 @container/outer">
            <div class="border-2 border-green-600 m-10 p-10 @xl/outer:bg-purple-400">
                <div class="border-2 border-blue-600 m-10 p-10">content</div>
            </div>
        </div>
        <div class="border-2 border-red-600">
            <div class="border-2 border-green-600 m-10 p-10 @container/inner">
                <div class="border-2 border-blue-600 m-10 p-10 @xs/inner:bg-amber-400">content</div>
            </div>
        </div>
        <div class="border-2 border-red-600 @container">
            <div class="border-2 border-green-600 m-10 p-10 @xl:bg-purple-400">
                <div class="border-2 border-blue-600 m-10 p-10 @container">
                    <div class="border-2 border-orange-600 m-10 p-10 @xs:bg-amber-400">content</div>
                </div>
            </div>
        </div>
        <div class="border-2 border-red-600 @container/outer">
            <div class="border-2 border-green-600 m-10 p-10 @container/inner @xl/outer:bg-purple-400">
                <div class="border-2 border-blue-600 m-10 p-10 @xs/inner:bg-amber-400">content</div>
            </div>
        </div>-->
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import FColumn from '@/components/lib/layout/FColumn.vue'
import MainNavigation from '@/components/app/MainNavigation.vue'
import ContentBox from '@/components/lib/layout/ContentBox.vue'
</script>
