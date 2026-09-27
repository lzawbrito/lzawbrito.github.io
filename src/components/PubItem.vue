<script setup>
defineProps(['title', 'authors', 'journal', 'arxivurl', 'arxiv', 'doi', 'doiurl'])

function formatAuthors(namelist) {
  let formNames = namelist.map((n) => {
    let name = n.split(', ').reverse().join(' ')
    if (name === 'Lucas Z. Brito') {
      return '<b>LZB</b>'
    }
    return name
  })
  return formNames.join(', ')
}
</script>

<template>
  <div class="pub-item">
    <p class="pub-title">{{ title }}</p>
    <p class="pub-authors" v-html="formatAuthors(authors)"></p>
    <p class="pub-links">
      <span v-if="journal" class="pub-journal">{{ journal }}&ensp;</span>
      <span class="pub-ids">
        [<span v-if="doi"><a v-bind:href="doiurl" target="_blank">{{ doi }}</a>, </span>
        <a v-bind:href="arxivurl" target="_blank">{{ arxiv }}</a>]
      </span>
    </p>
  </div>
</template>

<style scoped>
.pub-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: #f6f6f6;
  padding: 10px 14px;
  margin-bottom: 8px;
}

.pub-item p {
  padding-bottom: 0;
  text-align: left;
}

.pub-title {
  font-style: italic;
  line-height: 1.3;
}

.pub-authors,
.pub-journal {
  color: var(--color-text-soft);
}

.pub-ids {
  font-family: var(--mono-font), monospace;
  font-size: 0.9em;
}
</style>