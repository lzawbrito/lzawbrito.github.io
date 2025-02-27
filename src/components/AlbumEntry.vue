
<script>
  export default {
    props: ['title', 'year', 'artist', 'role', 'img', 'path'],
    computed: {
      // abbrTitle() {
      //   return (this.title.length > 25) ? this.title.substring(0, 22) + "..." : this.title
      // }
    }
  }
</script>

<template>
<RouterLink :to="path">
	<div class="album-entry">
		<img width="275" :src="`${img}`" onload="this.style.opacity=1" />
    <div id="album-label">
      <div id="spread-container">
        <span id="title">{{ title }}</span>
        <span id="year">({{year}})</span>
      </div>
      <div id="spread-container" class="credits">
        <span>{{ artist }}</span>
        <span>{{ role }}</span>
      </div>
    </div>
	</div>
</RouterLink>
</template>

<style scoped>
.credits {
  font-size: 13px;
  color: var(--color-text-soft);
}

img {
  opacity: 0;
  transition: 0.5s;
  /* padding:1px; */
  padding-right:1px;
  z-index: -1;
}

.album-entry {
	display: flex;
	flex-direction: column;;
  width: 275px;
	border: 1px solid var(--color-background-soft);
}

.album-entry:hover { 
  border: 1px solid var(--link);
}


#album-label {
  font-family: var(--mono-font), monospace;
  padding: 5px;
  color: var(--color-text);
}

#spread-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


.album-entry #title {
  font-style: italic;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

a:hover {
  text-decoration: none;
}
</style>





