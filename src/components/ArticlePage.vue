<script>
import Markdown from 'vue3-markdown-it';
import markdownItTexMath from 'markdown-it-texmath';
import LoadingAnim from './LoadingAnim.vue';

export default {
    props: ['path'],
    components: {
    Markdown,
    LoadingAnim
},
    data() {
      return {
        plugins: [
          {
            plugin: markdownItTexMath
          }
        ],
        article: null,
        articleOpacity: 0
      }
  },
  methods: {
    getDate() {
      return new Date(this.article.date).toDateString()
    },
    async fetchData() {
      this.article = null
      const res = await fetch(
        `/docs/articles/index.json`
      )
      this.article = await res.json().then((data) => data.filter((a) => a.path === this.path)[0])
      // this.article.then(this.articleOpacity = 1)
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<template>
<main>
  <Transition>
      <!-- <div v-if="!(article)" id="loading">Loading...</div> -->
      <LoadingAnim v-if="!(article)"/>
      <div v-else id="article-wrapper">
        <div id="article-header">
          <span id="date">{{ getDate() }} {{ article.time }} // <a :href="article.link">Download .md</a> </span>
          <!-- <h1> {{ path }} </h1> -->
          <h1 :style="{ 'text-align': 'left' }"> {{ article.title }} </h1>
          <h2> 
            <Markdown :source="article.subtitle" :plugins="plugins"></Markdown>
          </h2>
        </div>
        <div class="article">
          <Markdown :source="article.content" :plugins="plugins"></Markdown>
        </div>
      </div>
    </Transition>
  </main>
</template>

<style scoped>

/* #article-wrapper {
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
} */

#loading {
  position: absolute;
  z-index: 2;
  font-family: 'Computer Modern Typewriter', monospace;
}

#article-header {
  margin-bottom: 10px;
}
#date a {
  font-style: italic;
}

h1 {
  padding-bottom: 0
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

table {
  /* background-color: var(--color-background-mute); */
  margin: auto;
  margin-bottom: 20px;
  border-collapse: collapse;
  padding: 10px;
  border: 1px solid var(--color-text);
}

th {
  font-weight: bold;
  background-color: var(--color-background-mute);
}

th, td {
  padding: 5px 10px;
}

tr:nth-child(even) {
  background-color: var(--color-background-mute);
}
</style>