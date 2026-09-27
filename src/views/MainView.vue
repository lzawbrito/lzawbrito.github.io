<script setup>
import AboutView from './AboutView.vue'
import AcademicsView from './AcademicsView.vue'
import SoloMusicView from './MusicViews/SoloMusicView.vue'
</script>

<template>
  <main>
    <section id="about">
      <h1 class="section-title">About</h1>
      <AboutView />
    </section>
    <section id="science">
      <h1 class="section-title">Science</h1>
      <AcademicsView />
    </section>
    <section id="music">
      <h1 class="section-title">Music</h1>
      <SoloMusicView />
    </section>
  </main>
</template>

<style scoped>
/* Boxes extend outward past the content column by their padding, so the
   content keeps its full width (two album covers per row still fit) */
section {
  --box-padding: 20px;
  border: 1px solid var(--color-border-hover);
  padding: var(--box-padding);
  margin: 0 calc(-1 * var(--box-padding));
}

/* About is unboxed; it keeps the padding so its text lines up with the rest */
#about {
  border-color: transparent;
}

section + section {
  margin-top: 30px;
}

.section-title {
  font-family: var(--serif-font), Garamond, serif;
  font-weight: bold;
  font-size: 32px;
  line-height: 1.2;
  margin-bottom: 6px;
}

/* The first subsection header sits right under the section title */
.section-title + :deep(*) > .line-header:first-child {
  margin-top: 0;
  padding-top: 0;
}

@media (max-width: 1024px) {
  section {
    --box-padding: 12px;
    margin: 0;
  }
}
</style>
