<script>

  export default {
    props: ['title', 'lyrics', 'tab'],
    data() {
      return {
        show: false,
      }
    },
    computed: {
      arrow() {
        return this.show ? "&#8593" : "&#8595"
      },
      formattedLyrics() {
        const escapeHtml = (s) => s
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
        return this.lyrics
          .split(/\n[ \t]*\n/)
          .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
          .join('')
      }
    }
  }
</script>

<template>
  <div id="lyrics-wrapper">
    <h2><span id="title" @click="show = !show">{{ title }}</span> <span v-if="tab" id="tab-link"><a :href="tab" target="_blank">tab</a> </span><span v-html="arrow"></span></h2>
    <div v-if="show" id="lyrics" v-html="formattedLyrics"></div>
  </div>
</template>

<style scoped>
  #lyrics-wrapper {
    margin-bottom: 10px;
  }

  #title:hover {
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    #title:hover {
      text-decoration: underline;
    }
 }
 
 #tab-link {
  font-family: var(--mono-font), monospace;
  font-size: 18px;
 }

#tab-link::before, #tab-link::after {
  content: "[";
  font-family: var(--mono-font), monospace;
  text-decoration: none;
}

#tab-link::after {
 content: "] ";
}
</style>