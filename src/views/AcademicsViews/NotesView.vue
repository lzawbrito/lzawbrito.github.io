<script>
  import notes from './notes.js'
  import Markdown from 'vue3-markdown-it';
  export default {
    components: {
      Markdown,
    },
    data() {
      return {
        notes: notes
      }
    }
  }
</script>

<template>
  <main>
    <h1>Notes (and other documents)</h1>
    <div v-for="n in notes" :key="n.category">
      <h2>{{n.category}}</h2>
      <Markdown v-if="n.description" :source="n.description"></Markdown>
      <ul>
        <li v-for="d in n.docs" :key="d.name">
        <span class="doc-name">
          {{ d.name }} 
        </span>
        <span class="notes-link">
          <span v-for="f in d.files.slice(0, -1)" :key="f.name">
          <a  :href="f.file" target="_blank">
            {{ f.extension }}
          </a>, 
          </span>
          <a :href="d.files.slice(-1)[0].file" target="_blank"> {{d.files.slice(-1)[0].extension}} </a>
        </span>
        <!-- <span style="width: 10px"> </span> -->
        <span style="padding-left: 10px;">{{ d.description }}</span>
        </li>
      </ul>
    </div>
  </main>
</template>


<style scoped>
.doc-name {
  font-family: var(--mono-font), monospace;
  font-style: italic;
}

.doc-name::after {
  content: " "
}

.notes-link {
 font-family: var(--mono-font), monospace;
}

.notes-link::before, .notes-link::after {
  content: "[";
  font-family: var(--mono-font), monospace;
  text-decoration: none;
}

.notes-link::after {
 content: "]";
}

li {
  padding-bottom: 0px;
}
</style>