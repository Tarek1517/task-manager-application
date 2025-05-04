<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import TaskList from "@/components/TaskList.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const newTask = ref("");
const taskStore = useTaskStore();
const toast = useToast();

const form = ref({
  title: "",
});

const addData = () => {
  const taskTitle = form.value.title.trim();

  if (taskTitle) {
    taskStore.addTask(taskTitle);
    toast.success("Task added successfully!");
    form.value.title = "";
  } else {
    toast.error("Task title cannot be empty");
  }
};

const deleteTask = (id) => taskStore.deleteTask(id);
const toggleComplete = (id) => taskStore.toggleComplete(id);
const setFilter = (filter) => taskStore.setFilter(filter);

const tasks = computed(() => taskStore.filteredTasks);

const buttonClass = (filter) =>
  `rounded border px-3 py-1 ${
    taskStore.filter === filter ? "bg-blue-100" : "bg-white"
  }`;
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-4xl border border-amber-100 shadow-xl rounded p-5">
      <h1 class="mb-4 text-center text-2xl font-bold">Mini Task Manager</h1>

      <div class="mb-4 flex gap-2">
      <input
        v-model="form.title"
        @keydown.enter="addData"
        type="text"
        placeholder="Enter task title"
        class="flex-1 rounded border border-gray-300 px-3 py-2"
      />
      <button
        @click="addData"
        class="rounded bg-green-600 px-4 py-2 text-white hover:bg-black cursor-pointer"
      >
        Add
      </button>
    </div>

      <div class="mb-4">
        <h2 class="mb-2 text-lg font-semibold">Filter Tasks</h2>
        <div class="flex gap-2">
          <button @click="setFilter('all')" :class="buttonClass('all')" class="border-gray-400 cursor-pointer hover:bg-blue-100">
            All
          </button>
          <button
            @click="setFilter('completed')"
            :class="buttonClass('completed')" class="border-gray-400 cursor-pointer hover:bg-blue-100"
          >
            Completed
          </button>
          <button
            @click="setFilter('incomplete')"
            :class="buttonClass('incomplete')" class="border-gray-400 cursor-pointer hover:bg-blue-100"
          >
            Incomplete
          </button>
        </div>
      </div>

      <TaskList
        :tasks="tasks"
        @toggle-complete="toggleComplete"
        @delete-task="deleteTask"
      />
    </div>
  </div>
</template>

<style scoped></style>
