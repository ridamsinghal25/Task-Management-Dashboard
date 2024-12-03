import { createSlice } from "@reduxjs/toolkit";

// Helper functions to load from localstorage
const loadTasksFromLocalStorage = () => {
  try {
    const tasks = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];

    return tasks;
  } catch (error) {
    console.log("Error while loading tasks: ", error);
    return [];
  }
};

const saveTasksToLocalStorage = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.log("Error while saving tasks: ", error);
  }
};

const initialState = {
  tasks: loadTasksFromLocalStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
      // LocalStorage usage
      saveTasksToLocalStorage(state.tasks);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload?.id ? action.payload : task
      );
      // LocalStorage usage
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      // LocalStorage usage
      saveTasksToLocalStorage(state.tasks);
    },
    toggleTaskStatus: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      // LocalStorage usage
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;
