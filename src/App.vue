<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BouncingPages from './components/BouncingPages.vue';
import TitleComponent from './components/TitleComponent.vue'
import { sections, MAIN_PATH } from './router/index'
</script>

<script>
export default {
  data() {
    return  {
      sections: sections,
      mainPath: MAIN_PATH,
      activeHash: null,
      sidebarOn: false
      // hljsStyle: hljsStyle
    }
  },
  computed: {
    home() {
      return this.$route.meta.home
    },
    onMain() {
      return this.$route.path === MAIN_PATH
    },
    // Top-level hash of whichever section the active hash belongs to
    activeParent() {
      const parent = this.sections.find((s) => s.hash === this.activeHash
        || (s.children || []).some((c) => c.hash === this.activeHash))
      return parent ? parent.hash : null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateActiveHash, { passive: true })
    this.updateActiveHash()
  },
  unmounted() {
    window.removeEventListener('scroll', this.updateActiveHash)
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) this.sidebarOn = false
      this.$nextTick(this.updateActiveHash)
    }
  },
  methods: {
    sectionTo(hash) {
      return { path: MAIN_PATH, hash: '#' + hash }
    },
    // Scroll spy: the active section is the last one whose top has passed
    // the upper part of the viewport
    updateActiveHash() {
      if (!this.onMain) {
        this.activeHash = null
        return
      }
      const hashes = this.sections.flatMap((s) => [s.hash, ...(s.children || []).map((c) => c.hash)])
      let active = hashes[0]
      let activeTop = -Infinity
      for (const h of hashes) {
        const el = document.getElementById(h)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= window.innerHeight / 3 && top >= activeTop) {
          active = h
          activeTop = top
        }
      }
      // At the very bottom, the last section can't scroll far enough up
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        const last = this.sections[this.sections.length - 1]
        const lastChildren = last.children || []
        active = lastChildren.length ? lastChildren[lastChildren.length - 1].hash : last.hash
      }
      this.activeHash = active
    },
    darkMode() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    mediaWidth() {
      return (window.innerWidth > 0) ? window.innerWidth : screen.width
    },
    handleSidebarClick() {
      this.sidebarOn = !this.sidebarOn
    }
  }
}
</script>

<template>
  <!-- <link v-else rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/a11y-light.min.css" integrity="sha512-WDk6RzwygsN9KecRHAfm9HTN87LQjqdygDmkHSJxVkVI7ErCZ8ZWxP6T8RvBujY1n2/E4Ac+bn2ChXnp5rnnHA==" crossorigin="anonymous" referrerpolicy="no-referrer" /> -->
  <!-- <link v-if = "darkMode()" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/androidstudio.min.css" integrity="sha512-1XN5rnQ4rhaGEfX3nlDJ4Hb7kKNMAi0+DWQ/cNf54tuuTGSs0Wyw6mbgzVxLUCQ+vxSpmzr4j87ROim2ChrYnA==" crossorigin="anonymous" referrerpolicy="no-referrer" /> -->
  <BouncingPages v-if="home"/>
  <div class="app-wrapper" v-else>
  <div className="side-nav-button" v-on:click="handleSidebarClick()" >
    {{ sidebarOn ? '\u2190' : '\u2630' }}
  </div>
  <div className="side-nav-button-bg" :style="{ opacity: sidebarOn ? '0' : '1' }"></div>
  <header :style="mediaWidth() < 1025 ? { zIndex: sidebarOn ? '1': '-1'} : {}">
    <div class="wrapper" :style="(mediaWidth() < 1024) ? { width: sidebarOn ? '80%' : '0%', opacity: sidebarOn ? '1' : '0'} : {}" >
      <TitleComponent/>
      <nav>
        <div v-for="s in sections" :key="s.hash">
          <RouterLink :to="sectionTo(s.hash)" :class="{ active: activeParent === s.hash }"
            v-on:click="handleSidebarClick()">{{ s.name }}</RouterLink>
          <div v-if="s.children" class="subsections">
            <RouterLink v-for="c in s.children" :key="c.hash" :to="sectionTo(c.hash)"
              :class="{ active: activeHash === c.hash }"
              v-on:click="handleSidebarClick()">{{ c.name }}</RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView v-bind:class="view"/>
  <div id="gradient-footer"></div>
</div>
</template>

<style scoped>
/* #rect {
  width: 100vw; 
  height: 100vh;
  color: blue;
  z-index: 100;
  position: absolute;
} */


header {
  display: flex;
  height: calc(100vh - 50px - var(--top-padding));
  flex-direction: column;
  line-height: 1.5;
  max-height: 100vh;
  z-index: 1;
}

header .wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

nav {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: var(--mono-font), monospace;
}

nav a::before {
  white-space: pre;
  content: "  "
}

nav a:hover {
  text-decoration: none;
}

nav a.active {
  color: var(--color-text);
}
nav a.active::before {
  white-space: pre;
  content: "> ";
}

nav .subsections {
  display: flex;
  flex-direction: column;
  padding-left: 2ch;
}

nav a:hover::before {
  white-space: pre;
  content: "> ";
}


nav a {
  display: inline-block;
  padding: 0;
  width: fit-content;
}

nav a:first-of-type {
  border: 0;
}


#gradient-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgb(2,0,36);
  height: var(--footer-height);
  background: linear-gradient(0deg, var(--color-background) 33%, rgba(0,212,255,0) 100%);
}

/* The content column is centered in the viewport (but never closer to the
   left edge than it originally sat), and the sidebar sits at its original
   distance to the left of it */
.app-wrapper {
  --content-width: 570px;
  --content-left: max(
    calc(var(--side-padding) + var(--header-width) + var(--header-gap)),
    calc((100vw - var(--content-width)) / 2)
  );
}

main {
  display: flex;
  flex-direction: column;
  /* #app already provides --side-padding on the left */
  margin-left: calc(var(--content-left) - var(--side-padding));
  padding-bottom: 100px; 
  width: var(--content-width);
  /* margin-right: clamp(10px, calc(10 *var(--header-width ) + var(--header-gap) + var(--side-padding)), 40vw); */
  max-width: 1300px;
  /* min-width: 800px; */
}

header {
  position: fixed;
  display: flex;
  left: calc(var(--content-left) - var(--header-width) - var(--header-gap));
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  /* opacity: 1; */
}

nav {
  text-align: left;
}

.side-nav-button, .side-nav-button-bg {
  display: none;
}

@media (max-width: 1024px) {
  header {
    position: fixed;
    display: flex;
    left: auto;
  }

  main {
    padding: 20px 20px; 
    padding-top: 50px;
    margin: 0;
    width: 100%;
    padding-bottom: 100px; 
  }
  
  .side-nav-button {
    font-size: 30px;
    float: left;
    z-index: 2;
    position: fixed;
    left: 10px;
    top: 1px;
    display: inline;
  }
  .side-nav-button-bg {
    /* transition: opacity 0.2s; */
    /* background-color: var(--color-background-trans); */
    width: 0;
    height: 0;
    border-left: 0px solid transparent;
    border-right: 85px solid transparent;
    border-top: 70px solid var(--color-background-trans);
    position: fixed;
    left: 0;
    top: 0;
    display: inline;
    z-index: 1;
  }

  .title {
    font-size: 32px;
  }

  header .wrapper {
    font-size: 20px;
    display: flex;
    place-items: flex-start;
    text-align: left;
    height: 100%;
    position: fixed;
    top: 0;
    left:0 ;
    background-color: var(--color-background-trans);
    /* transition: .2s ease; */
    overflow-x: hidden;
    padding-top: 50px;
    flex-direction: column;
    padding-left: 17px;
    z-index: 10;
    border-right: 1px solid var(--color-background-mute);
  }
}
</style>
