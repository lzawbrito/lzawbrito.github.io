
<script>
  export default {
    props: ['title', 'year', 'artist', 'role', 'img', 'path'],
    computed: {
      abbrTitle() {
        return (this.title.length > 25) ? this.title.substring(0, 22) + "..." : this.title
      }
    }
  }
</script>

<template>
<RouterLink :to="path">
	<div class="album-entry">
		<img width="275" :src="`${img}`" onload="this.style.opacity=1" />
    <div id="album-label">
      <div id="spread-container">
        <span id="title">{{ abbrTitle }}</span>
        <span id="year">({{year}})</span>
      </div>
      <div id="spread-container">
        <span>{{ artist }}</span>
        <span>{{ role }}</span>
      </div>
    </div>
	</div>
</RouterLink>
</template>

<style scoped>
img {
  opacity: 0;
  transition: 0.5s;
}

.album-entry {
	display: flex;
	flex-direction: column;;
	border: 1px solid var(--color-background-soft);
}

#album-label {
  font-family: 'Computer Modern Typewriter', monospace;
  padding: 5px;
  color: var(--color-text);
}

#spread-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.album-entry #title {
  /* text-decoration: none; */
  font-style: italic;
}

#year {
  /* color: var(--color-background-soft) */
}

a:hover {
  text-decoration: none;
}
</style>





