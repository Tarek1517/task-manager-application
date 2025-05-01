<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const storeData = useTaskStore();
const toast = useToast();

const toggleComplete = (id) => storeData.toggleComplete(id);
const setFilter = (filter) => storeData.setFilter(filter);

const tasks = computed(() => storeData.filteredTasks);

const buttonClass = (filter) =>
  `rounded border px-3 py-1 ${
    storeData.filter === filter ? "bg-blue-100" : "bg-white"
  }`;
</script>

<template>
  <!-- Filter Tasks -->
  <div class="mb-4">
    <h2 class="mb-2 text-lg font-semibold">Filter Tasks</h2>
    <div class="flex gap-2">
      <button @click="setFilter('all')" :class="buttonClass('all')" class="border-gray-400 cursor-pointer hover:bg-blue-100">All</button>
      <button @click="setFilter('completed')" :class="buttonClass('completed')" class="border-gray-400 cursor-pointer hover:bg-blue-100">
        Completed
      </button>
      <button
        @click="setFilter('incomplete')"
        :class="buttonClass('incomplete')"
        class="border-gray-400 cursor-pointer hover:bg-blue-100"
      >
        Incomplete
      </button>
    </div>
  </div>
</template>

<style scoped></style>
