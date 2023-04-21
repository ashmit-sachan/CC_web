<script>
import TextInput from "@/components/form_components/TextInput.vue";
import AppIcon from "@/components/icon/AppIcon.vue";
import api from "@/services/api";
import router from "@/router";

export default {
    name: "RegisterView",
    components: {
        TextInput,
        AppIcon
    },
    data() {
        return {
            email: "",
            username: "",
            password: "",
            error: false
        }
    },
    methods: {
        async register() {
            try {
                const response = await api.post('/register', {
                    email: this.email,
                    user_name: this.username,
                    password: this.password
                });

                if (response.data.result) {
                    this.registerSuccess();
                } else {
                    this.error = true;
                }

            } catch (err) {
                console.log(err);
            }
        },
        registerSuccess() {
            router.push("/login");
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
            <TextInput v-model:input-value="username" input-name="Username"/>
            <TextInput v-model:input-value="password" input-name="Password" input-type="password"/>
            <p v-if="error" class="text-red-500 font-semibold mb-4">The Email already exists</p>
            <div
                  class="relative w-full text-center h-12 bg-green-500 flex items-center justify-center rounded-full cursor-pointer"
                  @click="register">
                <p class="font-bold">
                    REGISTER
                </p>
            </div>

            <div class="w-full h-px bg-gray-300 w-[80%] max-w-lg my-8"></div>

            <div class="w-full text-center">
                <p class="font-bold text-lg">
                    Already have an account?
                    <a href="/login" class="px-2 py-1 bg-gray-200 rounded">Login</a>
                </p>
            </div>
        </div>
    </div>
</template>