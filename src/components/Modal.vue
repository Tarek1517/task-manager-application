<script setup>
import { defineProps, defineEmits, ref } from "vue";
const props = defineProps({
    isOpen: Boolean,
    title:String,
});
const emit = defineEmits(["modal-close"]);
</script>
<template>
    <div v-if="isOpen" class="z-40 fixed top-0 left-0 bottom-0 right-0 bg-black/70 w-full h-screen flex items-center justify-center">
        <div class="w-full flex items-center justify-center max-w-lg min-h-48 bg-white p-4 shadow-lg z-50">
            <div class="flex items-center justify-between">
                <h3 class="font-medium text-lg">{{ title }}</h3>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
