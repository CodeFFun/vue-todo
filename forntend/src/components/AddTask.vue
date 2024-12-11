<script setup>
import { ref } from "vue";

const desc = ref("");
const date = ref("");

defineProps({
  changeTask: Function,
});

const addTask = async () => {
    console.log("task added")
  const response = await fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      desc: desc.value,
      endDate: Date.parse(date.value),
    }),
  });
    const data = await response.json();
    desc.value = "";
    date.value = "";
    changeTask;
};
</script>

<template>
  <div
    class="bg-black bg-opacity-55 w-screen h-screen flex justify-center items-center z-50"
    @click.stop="changeTask"
  >
      <form class="bg-white w-[700px] rounded-xl" @click.stop @submit.prevent="addTask">
          <textarea
          class="w-full h-[100px] p-5 outline-none border-b-2 border-gray-400 border-solid rounded-lg text-gray-600"
          placeholder="Add a new task"
            v-model="desc"
          ></textarea>
          <div class="w-full flex justify-between items-center px-5">
              <input type="date" class="text-gray-500 border-2 my-3 p-2 rounded-xl" v-model="date"/>
              <button
              type="submit"
              class="bg-blue-400 px-4 py-2 text-white rounded-xl"
              >
              Add task
            </button>
        </div>
    </form>
  </div>
</template>
