<script setup>
import InputForm from "./components/InputForm.vue";
import FilterTask from "./components/FilterTask.vue";
import TaskList from "./components/TaskList.vue";

import { onMounted } from "vue";
import { useTaskStore } from "@/stores/taskStore";

onMounted(() => {
  const store = useTaskStore();
  store.loadFromLocalStorage();
});
</script>

<template>
  <main class="w-full bg-white p-20">
    <div
      class="container mx-auto max-w-3xl rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-md"
    >
      <InputForm />
      <FilterTask />
      <TaskList />
    </div>
  </main>
</template>

<style scoped></style>
