<script setup>
import { ref, onBeforeMount, computed} from "vue";
import {useRouter} from 'vue-router'
import SidebarComponent from "@/components/SidebarComponent.vue";
import AddTask from "@/components/AddTask.vue";
import { FaSearch } from "vue-icons-plus/fa";

const tasks = ref([]);
const loading = ref(false);
const router = useRouter()
const desc = ref('')
const endDate = ref('')
const identity = ref('')
const update = ref(false)
const addTask = ref(false);

onBeforeMount(() => {
  const getTasks = async () => {
    const token = JSON.stringify(localStorage.getItem("token"));
    const response = await fetch(`http://localhost:3000/todo/${token}`);
    const data = await response.json();
    tasks.value = data;
    loading.value = true;
    console.log(data);
  };
  getTasks();
});

const changeTask = () => {
  addTask.value = !addTask.value;
};


const updateTodo = (description, date, iden) => {
    desc.value = description;
    endDate.value = date
    identity.value = iden
    update.value = true
    changeTask()
}


const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
    router.push('/login')
}

const inProgress = computed(() => {
  if (!loading.value) {
    console.log("loading");
    return -1; 
  }
  return tasks.value.filter(
    (task) => task.completed === false && Date.parse(task.endDate) > Date.now()
  );
});
const completed = computed(() => {
  if (!loading.value) {
    console.log("loading");
    return -1; 
  }
  return tasks.value.filter((task) => task.completed === true);
});

const delayed = computed(() => {
  if (!loading.value) {
    console.log("loading");
    return -1; 
  }
  return tasks.value.filter(
    (task) => task.completed === false && Date.parse(task.endDate) < Date.now()
  );
});

const updateComplete = async (id) => {
  console.log(id);
  const response = await fetch(`http://localhost:3000/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: true,
    }),
  });
  window.location.reload()
};
</script>

<template>
  <main v-if="!addTask" class="w-screen h-screen bg-gray-300 flex">
    <SidebarComponent />
    <div class="w-[90vw]">
      <nav
        class="w-[90vw] p-5 flex justify-between items-center border-b-2 border-solid border-b-gray-500"
      >
        <div class="flex gap-2 items-center">
          <FaSearch class="text-gray-100" />
          <input
            type="text"
            class="w-[300px] px-5 py-2 outline-none rounded-xl bg-transparent"
            placeholder="Search"
          />
        </div>
        <button class="px-3 h-[40px] text-white bg-red-500 rounded-md" @click.prevent = "logout">
          Sign Out
        </button>
      </nav>

      <main class="px-32">
        <div class="my-16 w-full flex justify-between items-center">
          <div>
            <p></p>
            <h1 class="text-3xl font-bold p-5">My Tasks</h1>
          </div>
          <button
            class="px-3 h-[40px] text-white bg-purple-500 rounded-md"
            @click.prevent="changeTask"
          >
            Add New Task
          </button>
        </div>
        <div class="flex gap-5">
          <div class="w-[500px]">
            <div
              class="text-purple-400 font-bold text-xl pb-3 border-solid border-b-2 border-purple-400"
            >
              IN PROGRESS
            </div>
            <div class="w-full" v-for="item in inProgress" :key="item._id">
              <div
                class="bg-white w-[400px] p-5 my-5 flex flex-col items-center border-2 border-solid border-gray-400 rounded-xl border-l-purple-600 border-l-4"
              >
                <div class="flex justify-between items-center w-full">
                  <p class="font-semibold text-md">{{item.desc}}</p>
                  <p class="text-gray-400 text-sm">{{ item.endDate }}</p>
                </div>
                <div class="flex justify-between items-center w-full mt-5">
                  <button class="bg-blue-200 p-2 rounded-md text-gray-500" @click="updateTodo(item.desc, item.endDate, item._id)">
                    Update
                  </button>
                  <button class="bg-purple-200 p-2 rounded-md text-gray-500" @click="updateComplete(item._id)">
                    Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-[500px]">
            <div
              class="text-blue-400 font-bold text-xl pb-3 border-solid border-b-2 border-blue-400"
            >
              COMPLETED
            </div>
            <div v-for="item in completed" :key="item.id">
              <div
                class="bg-white w-[400px] p-5 my-5 flex flex-col items-center border-2 border-solid border-gray-400 rounded-xl border-l-blue-600 border-l-4"
              >
                  <div class="flex justify-between items-center w-full">
                    <p class="font-semibold text-md">{{ item.desc }}</p>
                    <p class="text-gray-400 text-sm">{{ item.endDate }}</p>
                  </div> 
              </div>
            </div>
          </div>
          <div class="w-[500px]">
            <div
              class="text-red-600 font-bold text-xl pb-3 border-solid border-b-2 border-red-600"
            >
              DELAYED
            </div>
            <div class="w-full" v-for="item in delayed" :key="item.id">
              <div
                class="bg-white w-[400px] p-5 my-5 flex flex-col items-center border-2 border-solid border-gray-400 rounded-xl border-l-red-600 border-l-4"
              >
                <div class="flex justify-between items-center w-full">
                  <p class="font-semibold text-md">{{item.desc}}</p>
                  <p class="text-gray-400 text-sm">{{ item.endDate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </main>
  <AddTask v-else :change-task="changeTask" :description="desc" :end-date="endDate" :update="update" :identity="identity"/>
</template>
