<script setup>
import { onMounted } from "vue";
import { useTaskStore } from "@/stores/taskStore";

onMounted(() => {
  const store = useTaskStore();
  store.loadFromLocalStorage();
});
</script>

<template>
  <router-view :key="routeKey"></router-view>
</template>

<style scoped></style>
