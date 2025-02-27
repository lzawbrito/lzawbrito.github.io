<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BouncingPages from './components/BouncingPages.vue';
import RouterParent from  './components/RouterParent.vue'
import TitleComponent from './components/TitleComponent.vue'
import { routes } from './router/index'
</script>

<script>
export default {
  data() {
    return  {
      routes: routes,
      sidebarOn: false
      // hljsStyle: hljsStyle
    }
  },
  computed: {
    home() {
      return this.$route.meta.home
    } 
  },
  methods: {
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
        <div v-for="r in routes" :key="r.name">
          <RouterLink v-if="!('redirect' in r) && !(r['hide'])" :to="r.path" v-on:click="handleSidebarClick()" >
            {{ r.name }}
          </RouterLink>
          <RouterParent v-else-if="'children' in r" class="router-parent" :name="r.name">
            <div v-for="c in r.children" :key="c.name" v-on:click="handleSidebarClick()">
              <RouterLink v-if="!c.hide" :to="r.path + '/' + c.path"  > {{c.name}} </RouterLink>
            </div>
          </RouterParent>
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
  font-family: "Computer Modern Typewriter", monospace;
}

nav a::before {
  white-space: pre;
  content: "  "
}

nav a:hover {
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active::before {
  white-space: pre;
  content: "> ";
}

nav a.router-link-exact-active:hover {
  text-decoration: none;
}

nav a:hover::before {
  white-space: pre;
  content: "> ";
}


nav a {
  display: inline-block;
  padding: 0;
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

main {
  display: flex;
  flex-direction: column;
  padding-left: calc(var(--header-width ) + var(--header-gap));
  padding-bottom: 100px; 
  /* width: calc(100vw - var(--side-padding) - var(--header-width)); */
  margin-right: calc(var(--header-width ) + var(--header-gap));
  max-width: 1300px;
  /* min-width: 800px; */
}

header {
  position: fixed;
  display: flex;
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
  }

  main {
    padding: 20px 20px; 
    padding-top: 50px;
    margin: 0;
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
