<script>
import AppIcon from "@/components/icon/AppIcon.vue";
import MusicCard from "@/components/MusicCard.vue";
import router from "@/router";
import api from "@/services/api";
import TextInput from "@/components/form_components/TextInput.vue";

export default {
    name: "HomeView",
    components: {AppIcon, MusicCard, TextInput},
    data() {
        return {
            subscriptions: [],
            query: [],
            title: "",
            artist: "",
            year: ""
        }
    },
    computed: {
        user_name: {
            get: () => {
                return localStorage.getItem("user_name")
            }
        }
    },
    created() {
        if (!localStorage.getItem("login")) {
            router.push("/login")
        }
        this.getSubscriptions()
    },
    methods: {
        logout() {
            localStorage.clear();
            router.push("/login")
        },
        async removeSubscription(data) {
            this.subscriptions.filter(record => record.id !== data.id)
            await api.post('/subscription/remove/' + encodeURIComponent(localStorage.getItem("login")) + '/' + encodeURIComponent(data.id))
        },
        async subscribe(data) {
            if (!this.subscriptions.some(record => 'id' in record && record['id'] === data.id)) {
                this.subscriptions.push(data);
                await api.post('/subscribe/' + encodeURIComponent(localStorage.getItem("login")) + '/' + encodeURIComponent(data.id))
            }
        },
        async getSubscriptions() {
            const response = await api.post('/subscriptions/' + encodeURIComponent(localStorage.getItem("login")));
            this.subscriptions = response.data.result;
        },
        async searchMusic() {
            let params = {};
            if (this.title.length > 0)
                params.title = this.title;
            if (this.artist.length > 0)
                params.artist = this.artist;
            if (this.year.length > 0)
                params.release_year = this.year;

            const response = await api.get('/music', {params});
            this.query = response.data.result;
        }
    }
}
</script>

<template>
    <main class="h-screen">
        <div class="px-5 py-2" id="nav">
            <div class="flex justify-between">
                <AppIcon font="text-2xl" :name="true"/>

                <div class="flex items-center">
                    <p class="text-sm font-semibold px-3">Hi {{ user_name }}</p>
                    <button class="bg-green-500 px-4 py-2 rounded font-semibold" @click="logout">Logout</button>
                </div>

            </div>
        </div>

        <div id="subscriptions" class="px-12 py-4">
            <h1 class="text-xl font-semibold">Your Subscriptions:</h1>
            <template v-for="record in subscriptions" :key="record.id">
                <MusicCard :id="record.id" :title="record.title"
                           :artist="record.artist" :year="record.release_year"
                           :img="record.img_url" type="remove" @card-button-click="removeSubscription"/>
            </template>
        </div>

        <div id="query_area" class="px-12 py-4 bg-gray-100">
            <h1 class="text-xl font-semibold pb-3">Find More Music:</h1>

            <div class="flex justify-around">
                <TextInput v-model:input-value="title" input-name="Title"/>
                <TextInput v-model:input-value="artist" input-name="Artist"/>
                <TextInput v-model:input-value="year" input-name="Year"/>
                <button class="bg-green-500 my-8 px-4 py-2 rounded rounded-lg" @click="searchMusic">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                         clip-rule="evenodd">
                        <path
                              d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/>
                    </svg>
                </button>
            </div>

            <h1 v-if="query.length === 0" class="text-md pb-3">No result is retrieved. Please query again.</h1>
            <div v-else>
                <template v-for="record in query" :key="record.id">
                    <MusicCard :id="record.id" :title="record.title"
                               :artist="record.artist" :year="record.release_year"
                               :img="record.img_url" @card-button-click="subscribe"/>
                </template>
            </div>
        </div>
    </main>
</template>
