<script>
import AppIcon from "@/components/icon/AppIcon.vue";
import TextInput from "@/components/form_components/TextInput.vue";
import api from "@/services/api";
import router from "@/router";

export default {
    name: "LoginView",
    components: {
        TextInput,
        AppIcon
    },
    data() {
        return {
            email: "",
            password: "",
            error: false,
        }
    },
    methods: {
        async login() {
            try {
                const response = await api.post('/login', {
                    email: this.email,
                    password: this.password
                });

                if (response.data.result) {
                    this.loginSuccess(response.data.result);
                } else {
                    this.error = true;
                }

            } catch (err) {
                console.log(err);
            }
        },
        loginSuccess(data) {
            localStorage.setItem("login", data.email)
            localStorage.setItem("user_name", data.user_name)
            router.push("/");
        }
    }
}
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <div class="my-3">
            <AppIcon font="text-2xl" :name="true"/>
        </div>

        <div class="w-full h-px bg-gray-300 w-[80%] max-w-lg"></div>

        <div class="w-[80%] max-w-lg">
            <TextInput v-model:input-value="email" input-name="Email"/>
            <TextInput v-model:input-value="password" input-name="Password" input-type="password"/>
            <p v-if="error" class="text-red-500 font-semibold mb-4">Email or Password is invalid</p>
            <div
                  class="relative w-full text-center h-12 bg-green-500 flex items-center justify-center rounded-full cursor-pointer"
                  @click="login">
                <p class="font-bold">
                    LOG IN
                </p>
            </div>

            <div class="w-full h-px bg-gray-300 w-[80%] max-w-lg my-8"></div>

            <div class="w-full text-center">
                <p class="font-bold text-lg">
                    Don't have an account?
                    <a href="/register" class="px-2 py-1 bg-gray-200 rounded">Register</a>
                </p>
            </div>
        </div>


    </div>
</template>