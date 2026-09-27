<script>
export default {
  data() {
    return {
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
  <div class="about-wrapper">
    <img class="portrait" src="/assets/portrait_transparent.png" alt="Drawing of Lucas Z. Brito"
      width="868" height="886" />
    <div class="about-text">
    <p>
      Physics PhD student at Harvard. I am interested in quantum many-body
      theory and quantum field theory. Currently I'm thinking about higher groups 
      and anomalies in lattice systems in and out of equilibrium. You can find my physics work <RouterLink :to="{ hash: '#science' }">here.</RouterLink>
    </p>
    <p>
      I also make music with and without other people, which you can check out 
      <RouterLink :to="{ hash: '#music' }">here :)</RouterLink>
    </p>
    <p>
      Reach me at <span class="email">lbrito[at]g.harvard.edu</span>.
    </p>
    </div>
  </div>
</template>

<style scoped>
.email {
  font-family: var(--mono-font), monospace;
}

.about-wrapper {
  display: flex;
  /* Portrait comes first in the markup so it sits above the text on mobile */
  flex-direction: row-reverse;
  align-items: center;
  gap: 20px;
}

.portrait {
  width: 160px;
  height: auto;
  flex-shrink: 0;
}

.about-text {
  flex: 1;
}

@media (max-width: 1024px) {
  .about-wrapper {
    flex-direction: column;
  }
}

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