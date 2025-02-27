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
          console.log(f)
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
      Presently my research interests are in quantum many-body physics and
      quantum statistical mechanics, namely decoherence, quantum chaos, and
      Hamiltonian reconstruction. I typically study these systems using simulations 
      of SU(2) spin chains. 
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
    font-family: "Computer Modern Typewriter", monospace;
    padding-bottom: 10px;
  }
</style>