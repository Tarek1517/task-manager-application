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
        class="flex items-center justify-between rounded border p-2"
      >
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleComplete(task.id)"
          />
          <span :class="{ ' text-gray-500': task.completed }">{{
            task.title
          }}</span>
        </div>
        <button
          @click="openModal(task.id)"
          class="text-sm text-red-600 cursor-pointer"
        >
          ❌
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
