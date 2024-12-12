<script setup>
import { ref,onUnmounted, onMounted } from "vue";

const desc = ref("");
const date = ref("");

onUnmounted(() => {
    window.location.reload()
})

 const {endDate, changeTask, description, update, identity} = defineProps({
  changeTask: Function,
  description : String,
  endDate : String,
  update: Boolean,
  identity: String,
});


onMounted(() => {
    if(update){
        desc.value = description
        console.log(identity)
    }else {
        console.log("No update")
    }
})

const addTask = async () => {
    const response = await fetch(`http://localhost:3000/todo`, {
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
    window.location.reload()
};

const updateTask = async () => {
    console.log(identity)
    const response = await fetch(`http://localhost:3000/todo/${identity}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      desc: desc.value,
    }),
  });
    const data = await response.json()
    console.log(data)
  window.location.reload()

}

const handleSubmit = () => {
    if(!update){
    addTask()
    } else {
    updateTask()
    }
}
</script>

<template>
  <div
    class="bg-black bg-opacity-55 w-screen h-screen flex justify-center items-center z-50"
    @click.stop="changeTask"
  >
      <form class="bg-white w-[700px] rounded-xl" @click.stop @submit.prevent="handleSubmit">
          <textarea
          class="w-full h-[100px] p-5 outline-none border-b-2 border-gray-400 border-solid rounded-lg text-gray-600"
          placeholder="Add a new task"
            v-model="desc"
          ></textarea>
          <div class="w-full flex justify-between items-center px-5">
              <input type="date" class="text-gray-500 border-2 my-3 p-2 rounded-xl" v-model="date"/>
              <button
              v-if="!update"
              type="submit"
              class="bg-blue-400 px-4 py-2 text-white rounded-xl"
              >
              Add task
            </button>
            <button
              v-else 
              type="submit"
              class="bg-blue-400 px-4 py-2 text-white rounded-xl"
              >
              Update Task
            </button>

        </div>
    </form>
  </div>
</template>
