<script>

  import Markdown from 'vue3-markdown-it';

  export default {
    props: ['title', 'lyrics', 'tab'],
    components: { Markdown },
    data() {
      return {
        show: false,
      }
    },
    computed: {
      arrow() {
        return this.show ? "&#8593" : "&#8595"
      }
    }
  }
</script>

<template>
  <div id="lyrics-wrapper">
    <h2><span id="title" @click="show = !show">{{ title }}</span> <span v-if="tab" id="tab-link"><a :href="tab" target="_blank">tab</a> </span><span v-html="arrow"></span></h2>
    <Markdown v-if="show" :source="lyrics"></Markdown>
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
  font-family: 'Computer Modern Typewriter', monospace;
  font-size: 18px;
 }

#tab-link::before, #tab-link::after {
  content: "[";
  font-family: "Computer Modern Typewriter", monospace;
  text-decoration: none;
}

#tab-link::after {
 content: "] ";
}
</style>