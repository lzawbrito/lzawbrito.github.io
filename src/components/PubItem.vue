<script setup>
defineProps(['title', 'authors', 'journal', 'arxivurl', 'arxiv', 'doi', 'doiurl'])

function formatAuthors(namelist) {
  let formNames = namelist.map((n) => {
    let name = n.split(', ').reverse().join(' ')
    if (name === 'Lucas Z. Brito') {
      return '<b>Lucas Z. Brito</b>'
    }
    return name
  })
  return formNames.join(', ')
}
</script>

<template>
  <p>
  <p id="title">{{ title }}</p>
  <p id="authors" v-html="formatAuthors(authors)"></p>
  <span id="journal"> {{ journal }}</span>
  <span id="arxiv-link">
    [<span v-if="doi"><a v-bind:href="doiurl" target="_blank">{{ doi }}</a>, </span>
    <a v-bind:href="arxivurl" target="_blank">{{ arxiv }}</a>]
  </span>
  <hr />
  </p>
</template>

<style scoped>
#year {
  margin-top: 5px;
}

#title {
  font-style: italic;
  font-weight: bold;
  padding-bottom: 0px;
  /* color: rgb(118, 101, 165); */
}

#authors {
  padding-bottom: 0px;
  color: var(--color-text-soft);
}

#journal {
  color: var(--color-text-soft);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#arxiv-link {
  font-family: var(--mono-font), monospace;
}

span {
  /* white-space: pre-wrap; */
}

hr {
  border: 0px;
  height: 1px;
  margin: 0px;
  margin-top: 8px;
  margin-bottom: 0px;
  background-color: var(--color-background-soft);
}
</style>