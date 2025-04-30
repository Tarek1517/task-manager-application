import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    filter: "all",
    nextId: 1,
  }),

  getters: {
    filteredTasks(state) {
      if (state.filter === "completed") {
        return state.tasks.filter((task) => task.completed);
      } else if (state.filter === "incomplete") {
        return state.tasks.filter((task) => !task.completed);
      }
      return state.tasks;
    },
  },

  actions: {
    addTask(title) {
      if (title.trim()) {
        this.tasks.push({ id: this.nextId++, title, completed: false });
        this.saveToLocalStorage();
      }
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveToLocalStorage();
    },

    toggleComplete(id) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.saveToLocalStorage();
      }
    },

    setFilter(filter) {
      this.filter = filter;
    },

    saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("nextId", this.nextId.toString());
    },

    loadFromLocalStorage() {
      const storedTasks = localStorage.getItem("tasks");
      const storedId = localStorage.getItem("nextId");

      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
      if (storedId) {
        this.nextId = parseInt(storedId, 10);
      }
    },
  },
});

