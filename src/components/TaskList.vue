<template>
  <ul class="space-y-2">
    <Task
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle-complete="$emit('toggle-complete', task.id)"
      @delete-task="$emit('delete-task', task.id)"
    />
  </ul>
</template>

<script setup>
import Task from './Task.vue'
defineProps(['tasks'])
defineEmits(['toggle-complete', 'delete-task'])
</script>
