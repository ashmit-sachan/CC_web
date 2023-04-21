<script>
import TogglePasswordIcon from "@/components/icon/TogglePasswordIcon.vue";

export default {
    name: "TextInput",
    components: {TogglePasswordIcon},
    emits: ['update:inputValue'],
    props: {
        inputName: {default: "default_name"},
        inputValue: {default: "porn"},
        inputType: {default: "text"}
    },
    data() {
        return {
            currentInputType: this.inputType,
        }
    },
    methods: {
        inputEvent($event) {
            this.$emit('update:inputValue', $event.target.value)
        },
        updateType() {
            this.currentInputType = this.currentInputType === 'password' ? 'text' : 'password'
        }
    },
    watch: {}
}
</script>

<template>
    <div class="flex flex-col my-4">
        <label class="text-sm font-bold mb-1.5">{{ inputName }}</label>
        <div class="relative">
            <input
                  class="outline outline-1 rounded px-4 py-2.5 w-full
                    focus:outline-none focus:ring-2 focus:ring-black
                    transition duration-300 ease-in-out"

                  :type="currentInputType"
                  :placeholder="inputName"
                  :value="inputValue"
                  @input="inputEvent">

            <div v-if="inputType === 'password'" class="absolute right-2 top-2">
                <TogglePasswordIcon @update-input-type="updateType" :show-state="currentInputType"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>