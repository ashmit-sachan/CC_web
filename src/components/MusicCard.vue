<script>
export default {
  name: "MusicCard",
  emits: ['cardButtonClick'],
  props: ["id", "title", "artist", "year", "img", "type"],
  data() {
    return {
      isVisible: true
    }
  },
  methods: {
    cardButtonClick() {
      this.$emit('cardButtonClick', {
        id: this.id,
        title: this.title,
        artist: this.artist,
        release_year: this.year,
        img_url: this.img
      });

      this.isVisible = false;
    }
  }
}
</script>

<template>
  <div class="px-8 py-2 flex justify-between bg-green-50 my-4" v-if="isVisible">
    <div class="flex justify-center">
      <div class="h-24 w-24">
        <img :src="img" alt="">
      </div>
      <div class="flex flex-col justify-center h-24 px-6">
        <h1>{{ title }}</h1>
        <h1>{{ artist }}</h1>
        <h1>{{ year }}</h1>
      </div>
    </div>

    <button class="font-semibold px-3 my-7" :class="[type === 'remove'? 'bg-red-500' : 'bg-green-500']"
            @click="cardButtonClick">
      {{ type === "remove" ? "Remove" : "Subscribe" }}
    </button>
  </div>
</template>

<style scoped>

</style>