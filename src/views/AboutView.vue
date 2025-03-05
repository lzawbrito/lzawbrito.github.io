<script>
export default {
  data() {
    return {
      friendsSites: [
        { link: "https://www.liv-victorino.com/", name: 'liv-victorino.com' },
        { link: "https://cyrawirth.neocities.org/", name: 'Cyra Wirth' },
        { link: "https://bricedickerson.com/", name: 'Brice' },
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
        { link: "https://ascii.town/explore.html", name: "ascii.town Torus" },
        { link: "https://www.cameronsworld.net/", name: "cameronsworld.net" },
        { link: "https://laboriacuboniks.net/", name: "Laboria Cuboniks" },
      ],
    }
  }
}
</script>


<template>
  <main>
    <h1 class="line-header">About</h1>
    <p>
      Incoming physics PhD student at some yet-to-be-determined
      university. I am interested in quantum many-body theory and field
      theory. You can check out some of my physics work <a href="/work">here</a>.
    </p>
    <p>
      I also make music with and without other people, which you can check out 
      <a href="/music">here</a>. 
    </p>
    <div id="links-container">
        <h1>Friends</h1>
        <div id="links-wrapper">
          <a v-for="p in friendsSites" :key="p.link" :href="p.link"> {{ p.name }} </a>
      </div>
    </div>
  </main>
</template>

<style scoped>

#links-container h2 {
  margin-bottom: 10px;
}

#links-container a {
  font-family: var(--mono-font), monospace;
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