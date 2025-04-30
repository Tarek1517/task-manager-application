<script setup>
import InputForm from './components/InputForm.vue'
import FilterTask from './components/FilterTask.vue'
import TaskList from './components/TaskList.vue'

import { onMounted } from "vue";
import { useTaskStore } from "@/stores/taskStore";

onMounted(() => {
  const store = useTaskStore();
  store.loadFromLocalStorage();
});
</script>

<template>
  <main class="w-full bg-white p-20">
    <div>
    <InputForm />
    <FilterTask />
    <TaskList />
  </div>
  </main>
  
</template>

<style scoped>

</style>
