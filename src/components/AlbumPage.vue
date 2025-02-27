<script>
import LoadingAnim from '../components/LoadingAnim.vue'
import SongLyrics from '../components/SongLyrics.vue'


export default {
    props: ['path', 'index'],
    components: { LoadingAnim, SongLyrics },
    data() {
      return {
        release: null,
      }
  },
  methods: {
    async fetchData() {
      this.article = null
      const res = await fetch(
        this.albumIndex
      )
      this.release = await res.json().then((data) => data.filter((a) => a.id === this.path)[0])
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    albumIndex() {
      return this.$route.meta.albumIndex
    } 
  },
}
</script>

<template>
  <main>
    <Transition>
        <LoadingAnim v-if="!(release)" />
        <div v-else id="article-wrapper">
          <div id="cover-wrapper">
            <div>
              <img id="cover" :src="`${release.img}`" onload="this.style.opacity=1" />
            </div>
            <div>
              <h1>{{ release.title }}</h1>
              <h2 v-if="!release.artist">{{ release.year }}</h2>
              <h2 v-else>{{ release.artist }} // {{release.year}}</h2>
              <div id="links-wrapper">
                <a v-for="l in release.links" :key="l.id" :id="l.id" :href="l.link" target="_blank">{{ l.name }}</a>
              </div>
            </div>
          </div>
          <hr/>
          <SongLyrics v-for="l in release.tracks" :tab="l.tab" :key="l.title" :title="l.title" :lyrics="l.lyrics"></SongLyrics>
        </div>
      </Transition>
  </main>
</template>

<style scoped>


#cover {
  opacity: 0;
  transition: 0.5s;
  height: 150px;
}

#cover-wrapper {
  display: flex; 
  flex-direction: row;
  gap: 20px;
}

#article-header {
  margin-bottom: 10px;
}

#date a {
  font-style: italic;
}

h1 {
  padding-bottom: 0;
  text-align: left;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#spotify {
  color: rgb(51, 130, 81)
}

#bandcamp {
  color: #5b8692; 
}

#apple-music {
  color: #bf575c;
}

#vimeo {
  color: #3ba0c2 
}

#youtube {
  color: #b92727
}

#links-wrapper a {
  font-family: "Computer Modern Typewriter", monospace;
  border: 1px solid var(--color-background-soft);
  padding: 7px;
  font-size: 18px
}

#links-wrapper {
  padding-top: 10px;
  display: flex; 
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
}

@media (max-width: 1024px) {
  #cover-wrapper {
    flex-direction: column;
    align-items: center;
  }

  #links-wrapper {
    justify-content: center;
  }

  #cover {
    height: 250px;
  }
}
</style>