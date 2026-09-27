<script setup>
// links: array of { label, url }, e.g. [{ label: 'slides', url: '...' }]
defineProps(['title', 'location', 'date', 'links'])
</script>

<template>
  <div class="talk-item">
    <p class="talk-title">{{ title }}</p>
    <p class="talk-location">{{ location }}<span v-if="date">, {{ date }}</span></p>
    <p v-if="links && links.length" class="talk-links">
      [<span v-for="(l, i) in links" :key="l.url"><a v-bind:href="l.url" target="_blank">{{ l.label }}</a><span v-if="i < links.length - 1">, </span></span>]
    </p>
  </div>
</template>

<style scoped>
.talk-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: #f6f6f6;
  padding: 10px 14px;
  margin-bottom: 8px;
}

.talk-item p {
  padding-bottom: 0;
  text-align: left;
}

.talk-title {
  font-style: italic;
  line-height: 1.3;
}

.talk-location {
  color: var(--color-text-soft);
}

.talk-links {
  font-family: var(--mono-font), monospace;
  font-size: 0.9em;
}
</style>
