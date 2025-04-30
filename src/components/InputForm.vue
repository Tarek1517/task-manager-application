<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const storeData = useTaskStore();
const toast = useToast();

const form = ref({
  title: "",
});

const addData = () => {
  const taskTitle = form.value.title.trim();

  if (taskTitle) {
    storeData.addTask(taskTitle);
    toast.success("Task added successfully!");
    form.value.title = "";
  } else {
    toast.error("Task title cannot be empty");
  }
};
</script>

<template>
  <div class="greetings">
    <h1 class="mb-4 text-center text-2xl font-bold">Mini Task Manager</h1>

    <!-- Add Task -->
    <div class="mb-4 flex gap-2">
      <input
        v-model="form.title"
        type="text"
        placeholder="Enter task title"
        class="flex-1 rounded border px-3 py-2"
      />
      <button
        @click="addData"
        class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  </div>
</template>

<style scoped></style>
