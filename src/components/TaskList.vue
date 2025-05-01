<script setup>
import Modal from "@/components/Modal.vue";
import { ref, computed } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const storeData = useTaskStore();
const toast = useToast();

const tasks = computed(() => storeData.filteredTasks);

const toggleComplete = (id) => {
  storeData.toggleComplete(id);
  const task = storeData.tasks.find((t) => t.id === id);
  if (task?.completed) {
    toast.success("Task completed");
  } else {
    toast.info("Task incomplete");
  }
};

const deleteId = ref(null);
const isModalOpened = ref(false);

const openModal = (id) => {
  deleteId.value = id;
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = false;
};

const deleteTask = (id) => {
  storeData.deleteTask(deleteId.value);
  closeModal();
  toast.error("Task deleted successfully!");
};
</script>

<template>
  <div class="greetings">
    <ul class="space-y-2">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center justify-between rounded border border-gray-300 p-2"
      >
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleComplete(task.id)"
          />
          <span
            :class="{ 'line-through text-gray-500': task.completed }"
            class="break-all"
            >{{ task.title }}</span
          >
        </div>
        <button
          @click="openModal(task.id)"
          class="text-sm text-red-600 cursor-pointer relative flex flex-col items-center group ml-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
            />
          </svg>
          <div
            class="absolute bottom-0 flex-col items-center hidden mb-5 group-hover:flex"
          >
            <span
              class="relative rounded-md z-10 p-4 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
              >Delete</span
            >
            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
          </div>
        </button>
      </li>
    </ul>
  </div>

  <Modal :isOpen="isModalOpened">
    <div class="flex flex-col items-center justify-center gap-4">
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-lg font-semibold text-gray-900" id="modal-title">
          Are You Sure You want to Delete this Item?
        </h3>
      </div>
      <div class="flex items-center py-3 gap-4">
        <button
          @click="closeModal()"
          type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>

        <button
          @click="deleteTask()"
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped></style>
