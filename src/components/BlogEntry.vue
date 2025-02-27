<script>
  import Markdown from 'vue3-markdown-it';
  import markdownItTexMath from 'markdown-it-texmath';

  export default {
    props: ['title', 'date', 'time', 'content', 'subtitle', 'to'],
    components: {
      Markdown,
    },
    data() {
      return {
        plugins: [
          {
            plugin: markdownItTexMath
          }
        ]
      }
    }
  }
</script>

<template>
  <div id="wrapper">
    <div id="date">{{ date }} {{ time }}</div>
    <h1 :style="{'text-align': 'left'}"> {{ title }} </h1>
    <h2> 
      <Markdown :source="subtitle" :plugins="plugins"></Markdown>
    </h2>
    <Markdown :source="content" :plugins="plugins"></Markdown>
    <div id="entry-footer"></div>
    <RouterLink id="read-more" :to="'blog/' + to">
      Read...
    </RouterLink>
  </div>
</template>

<style>
#date {
  font-size: 10x;
  font-family: var(--mono-font), monospace;
}

#wrapper {
  border: 1px solid var(--color-background-soft);
  padding: 15px 20px;
  max-height: 350px;
  overflow-y: hidden;
  margin-bottom: 20px;
}

#entry-footer {
  /* display: flex;
  flex-direction: row; */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* box-sizing: border-box;
  overflow: hidden; */
  background: rgb(2, 0, 36);
  height: 100px;
  /* padding: 10px; */
  background: linear-gradient(0deg, var(--color-background) 50%, rgba(0,212,255,0) 100%);
}

#read-more {
  font-family: var(--mono-font), monospace;
  font-size: 18px;
  font-style: italic;
  padding: inherit;
  /* box-sizing: content-box; */
  position: absolute; 
  bottom: 0;
  right: 0;
}

h1 {
  padding-bottom: 0;
  /* text-align: left; */
}

.footnotes-list {
  font-size: 15px;
  list-style-position: inside;
  padding-left: 0;
}

.footnote-item {
  padding-bottom: 0px;
}

.footnote-item p {
  padding-bottom: 0px;
  display: inline;
}
</style>