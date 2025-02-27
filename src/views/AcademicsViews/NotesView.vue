<script>
  import notes from './notes.js'
  export default {
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
        </li>
      </ul>
    </div>
  </main>
</template>


<style scoped>
.doc-name {
  font-family: "Computer Modern Typewriter", monospace;
  font-style: italic;
}

.doc-name::after {
  content: " "
}

.notes-link {
 font-family: "Computer Modern Typewriter", monospace;
}

.notes-link::before, .notes-link::after {
  content: "[";
  font-family: "Computer Modern Typewriter", monospace;
  text-decoration: none;
}

.notes-link::after {
 content: "]";
}

li {
  padding-bottom: 0px;
}
</style>