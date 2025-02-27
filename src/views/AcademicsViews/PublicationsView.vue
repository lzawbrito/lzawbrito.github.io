<script>
  import PublicationsList from '../../components/PublicationsList.vue'

  export default {
    components: { PublicationsList },
    data() {
      return {
        fname: '/assets/animations/spin-chain/spin-chain',
        fext: '.png',
        frame: '0001',
      }
    },
    mounted() {
      const update = () => {
          let f = parseInt(this.frame)
          if (f === 250) {
            this.frame = String(1).padStart(4, '0')
          } else {
            this.frame = String(f + 1).padStart(4, '0')
          }
        this.handle = requestAnimationFrame(update)
        }

      update()
    },
    unmounted() {
      cancelAnimationFrame(this.handle)
    },
}
</script>

<template>
	<main>
    <h1>Research</h1>
    <p>
    I am broadly interested in the intersection of quantum statistical mechanics,
    quantum field theory, and quantum information theory; this interest is
    informed by scientific and technological demands to understand the
    foundational principles of quantum matter, and more generally by the
    philosophical puzzles offered by quantum theory. I am especially drawn to work
    that leverages computational methods to treat and provide intuition for
    previously intractable problems.
    </p>
    <!-- <img :style="{'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}" width=120 :src="fname + frame + fext"/> -->
    <img :style="{'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}" width=120 src="/assets/animations/spin-chain.gif"/>
    <h1>Publications</h1>
    <a id="download-bib" href="/docs/pubs.bib">Download .bib</a>
    <PublicationsList/>
	</main>
</template>

<style>
  #download-bib {
    font-style: italic;
    font-family: var(--mono-font), monospace;
    padding-bottom: 10px;
  }
</style>