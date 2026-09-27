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
  <div>
    <h1 id="other" class="line-header" style="padding-bottom: 0;">
      Other
    </h1>
    <div class="other-list">
      <ul>
        <li>Drums for <a target="_blank" href="https://plasticmaryband.com/">Plastic Mary</a></li>
        <li>Drums for <a target="_blank" href="https://stevesmind.bandcamp.com/album/red-mud">Steve's Mind</a></li>
      </ul>
    </div>
    <h1 id="solo-music" class="line-header">
      Solo 
    </h1>
    <Transition>
      <div v-if="!releases" id="loading"></div>
      <div v-else class="album-list">
        <AlbumEntry v-for="r in releases.filter((a) => !a.hide)" :key="r.id"
          :title="r.title" 
          :year="r.year" 
          :artist="r.artist" 
          :role="r.role" 
          :img="r.img"
          :path="'/music/solo/' + r.id"
          />
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.other-list ul li {
  padding: 0px 0;
}

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
  font-family: var(--mono-font), monospace;
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