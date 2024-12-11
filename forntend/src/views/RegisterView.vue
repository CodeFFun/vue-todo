<script setup>
import {ref} from 'vue'
import {FcGoogle} from 'vue-icons-plus/fc'
import {AiFillApple} from 'vue-icons-plus/ai'


const email = ref('')
const name = ref('')
const password = ref('')

const onSubmit = async () => {
    const data = {
        name: name.value,
        email: email.value,
        password: password.value
    }

    const res = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()
    localStorage.setItem('token', result[0]._id)
    email.value = ''
    password.value = ''
    name.value = ''
}
</script>

<template>
  <main class="w-screen h-screen bg-blue-400 flex justify-center items-center">
        <div class="bg-white  rounded-xl p-10">
            <p class="w-full text-right text-gray-400">Already Member?<span class="text-black">Sign In</span></p>
            <div class="mt-20">
                <h1 class="font-bold text-4xl">Register</h1>
                <p class="my-5 font-semibold text-sm">Register with open account</p>
                <div class="border-b-2 border-b-gray-300 py-5 flex justify-between">
                    <button disabled class="flex gap-2"><FcGoogle /> Google</button>
                    <button disabled class="flex gap-2"><AiFillApple />Apple</button>
                </div>
                <p class="my-5 font-semibold text-sm">Or continue with email address</p>
                <form class="flex flex-col gap-4 items-center justify-center" @submit.prevent="onSubmit">
                    <input type="text" placeholder="Name" v-model="name" class="px-5 py-2 bg-gray-300 outline-none rounded-xl placeholder:text-gray-500">
                    <input type="email" placeholder="Email Address" v-model="email" class="px-5 py-2 bg-gray-300 outline-none rounded-xl placeholder:text-gray-500">
                    <input type="password" placeholder="Password" v-model="password" class="px-5 py-2 bg-gray-300 outline-none rounded-xl placeholder:text-gray-500">
                    <button class="px-5 py-2 bg-blue-500 outline-none rounded-xl w-full text-white" >Register</button>
                </form>
            </div>
        </div>
  </main>
  </template>