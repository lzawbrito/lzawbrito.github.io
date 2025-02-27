<script setup>
import AlbumEntry from '../../components/AlbumEntry.vue';
</script>

<script>
  export default {
    data() {
      return {
        releases: null
      }
    },
    methods: {
      getDate(str) {
        return new Date(str).toDateString()
      },
      async fetchData() {
        this.releases = null
        const res = await fetch(
          `/assets/music/solo/index.json`
        )
        this.releases = await res.json()
      }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<template>
  <main>
    <h1>
      Solo Music
    </h1>
    <Transition>
      <div v-if="!releases" id="loading"></div>
      <div v-else class="album-list">
        <AlbumEntry v-for="r in releases" :key="r.id"
          :title="r.title" 
          :year="r.year" 
          :artist="r.artist" 
          :role="r.role" 
          :img="r.img"
          :path="'solo/' + r.id"
          />
      </div>
    </Transition>
  </main>
</template>

<style scoped>
h1 {
  padding-bottom: 10px;
}

.album-list {
  gap: 20px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#loading {
  font-family: 'Computer Modern Typewriter', monospace;
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .album-list {
    justify-content: center;
  }

  h1 {
    margin-bottom: 20px;
  }
}
</style>