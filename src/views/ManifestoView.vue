<script>
import Markdown from 'vue3-markdown-it';
import GoodReadsShelfVue from '../components/GoodReadsShelf.vue';
  export default {
    components: {
      Markdown,
      GoodReadsShelfVue,
    },
    data() {
      return {
        friendsSites: [
          { link: "https://www.liv-victorino.com/", name: 'liv-victorino.com' },
          { link: "https://cyrawirth.neocities.org/", name: 'Cyra Wirth' },
          { link: "https://docs.google.com/document/d/1ihhjBqN-A3uWAM3TDq7199GBuF2t5mH1Hx-8o47WFSE/edit?usp=sharing", name: "Grace's Personal Link Directory"}
        ],
        miscSites: [
        { link: "http://plaza.ufl.edu/tasker87/entertainment8.htm", name: "Navidson Record" },
        { link: "https://simone.computer/#/", name: "simone.computer" },
        { link: "https://www.mit.edu/~elake/index.html", name: "Ethan Lake" },
        { link: "https://world4jack.neocities.org/section/blog.html", name: "world4jack" },
        { link: "http://despize.net/?i=2", name: "Despize" },
        { link: "https://castel.dev/", name: "Gilles Castel" },
        { link: "http://inflorescence.city/", name: "Inflorescence City" },
        { link: "https://everest-pipkin.com/", name: "Everest Pipkin" },
        { link: "https://ascii.town/explore.html", name: "ascii.town Torus"},
        { link: "https://www.cameronsworld.net/", name: "cameronsworld.net" },
        { link: "https://laboriacuboniks.net/", name: "Laboria Cuboniks" },

      ],
      manifesto: `Thanks for visiting my site. In the contemporary
      internet, it's a privilege to still be able to hold your own virtual space,
      and an even bigger privilege to have your space visited by others. This
      site serves primarily as an archive for things that I have worked on that
      I will likely want to access easily in the future and think others might
      enjoy or find useful. 

The philosophy with which I put this site together is a marriage of two
approaches: 
- simplicity and organization (see [here](https://motherfuckingwebsite.com/));
avoiding a SPA, excessive CSS transitions and reactivity, favoring well-partitioned 
content, readability, performance...
- expressiveness, creativity, experimentation, individuality... every craft can
also be seen as an art; web design/development is no different.

Above you can find my friends' sites or projects (go visit them!), and other
sites I like.
      `
    }
  }
}
</script>


<template>
  <main>
    <div id="links-container">
      <div>
        <h2>Friends (freeware folk webring?)</h2>
        <div id="links-wrapper">
          <a v-for="p in friendsSites" :key="p.link" :href="p.link"> {{p.name}} </a>
          <!-- <a href="https://www.liv-victorino.com/">liv-victorino.com</a> -->
        </div>
        <ul>
        </ul>
      </div>
      <div></div>
      <div>
        <h2>Other Places</h2>
          <div id="links-wrapper">
          <a v-for="p in miscSites" :key="p.link" :href="p.link"> {{ p.name }} </a>
          </div>
      </div>
    </div>
    <hr/>
    <h1>Manifesto?</h1>
    <blockquote>
      <i>Some of us have a special nostalgia for old-web aesthetics, but our purpose runs deeper than this. The renewed interest in these trends also signify a need for change.</i>
      <span class="quote-src"><a href="https://yesterweb.org/about/">Yesterweb</a></span>
    </blockquote>
    <Markdown :source="manifesto"></Markdown>
    <hr/>
      <div id="embeds-container">
        <a href="https://data.typeracer.com/pit/profile?user=lzawbrito&ref=badge"
        target="_top"><img
        src="https://data.typeracer.com/misc/badge?user=lzawbrito" 
        alt="TypeRacer.com scorecard for user lzawbrito"/></a>
      <GoodReadsShelfVue/>
    </div>
    <hr/>
    <div :style="{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', gap: '20px'}">
    <pre :style="{fontSize: '12px'}">
  _   _                 _           __                 
 | | | |               | |         / _|                
 | |_| |__   __ _ _ __ | | _____  | |_ ___  _ __       
 | __| '_ \ / _` | '_ \| |/ / __| |  _/ _ \| '__|      
 | |_| | | | (_| | | | |   &lt\__ \ | || (_) | |         
  \__|_| |_|\__,_|_| |_|_|\_\___/ |_| \___/|_|         
     | |                  (_)             | |          
  ___| |_ ___  _ __  _ __  _ _ __   __ _  | |__  _   _ 
 / __| __/ _ \| '_ \| '_ \| | '_ \ / _` | | '_ \| | | |
 \__ \ || (_) | |_) | |_) | | | | | (_| | | |_) | |_| |
 |___/\__\___/| .__/| .__/|_|_| |_|\__, | |_.__/ \__, |
              | |   | |             __/ |         __/ |
              |_|   |_|            |___/         |___/ 

    </pre>
    <pre :style="{fontSize: '12px'}">
THIS SITE BROUGHT TO YOU BY:
VueJS, Vite, GitHub Pages, vsalvino's Computer Mo-
dern CDN webfonts, Visual Studio Code, downtime at 
the airport, etc.

SPECIAL THANKS TO: all my friends and family... 

lzbrito.com is made possible by to web-surfers li-
ke you. 



(c) 2163 BRITO INDUSTRIES INC. ALL RIGHTS RESERVED. 
  </pre>
  </div>
    <img :style="{'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}" width=120 src="/assets/animations/alienbyewaving.gif"/>
    
  </main>
</template>

<style scoped>
  #links-container {
    display: grid; 
    grid-template-columns: 1fr 10px 1fr;
    justify-content: center;
  }

  #links-container h2 {
    margin-bottom: 10px;
  }

  #links-container a {
    font-family: "Computer Modern Typewriter", monospace;
    border: 1px solid var(--color-background-soft);
    padding: 7px;
  }

  #links-wrapper {
    display: flex; 
    flex-wrap: wrap;
    gap: 5px;
    /* height: 100px; */
    /* overflow-y: scroll; */
    /* justify-content: space-between; */
    align-items: flex-start;
  }

  /* #links-wrapper a {
    flex-grow: 1;
  } */

  #embeds-container {
    display: flex;
    gap: 10px;
    justify-content: center; 
    align-items: center;
  }
</style>