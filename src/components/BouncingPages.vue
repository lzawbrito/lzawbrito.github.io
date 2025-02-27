<script setup>
import { RouterLink } from 'vue-router'
</script>

<script>
import { flattenRoutes } from './scripts/routeTools'
import { routes } from '../router/index'
let id = 0
let edgeId = 0

let flat = flattenRoutes(routes)
let rs = flat[0]
let es = flat[1]
let edges = es.map((e) => {return { id: edgeId++, nodes: e, coords: [[0, 0], [0, 0]]}})
// eslint-disable-next-line no-unused-vars
let lineConfigs = es.map((e) => {return { 
  x: 0, y: 0, points: [0, 0, 0, 0], stroke: "grey", strokeWidth: 1
}})

 
// Make particles out of routes
function makeParticles() {
  function makeParticle(r) {
    // Random velocity
    let v = [Math.random() / 10, Math.random() / 10]
    let x = [10, 10]
    return { id: id++, x: x, v: v, dims: [0, 0], text: r.name, path: r.path, noLink: r.noLink }
  }
  return rs.map(makeParticle)
}

export default {
  data() {
    return {
      hovered: false,
      paused: false,
      particles: makeParticles(),
      boxStyle: null,
      boxHeight: 0,
      boxWidth: 0,
      edges: edges,
      lineConfigs: lineConfigs,
      configKonva: {
        width: 100, 
        height: 200
      },
    }
  },
  beforeCreate() {

  },
  created() {

  },
  beforeMount() {

  },
  mounted() {
    // Get container dimensions
    var sty = window.getComputedStyle(document.getElementById("bouncing-container"))
    this.boxHeight = parseFloat(sty.height)
    this.boxWidth = parseFloat(sty.width)
 
    // Now that DOM components mounted relocate particles inside container and 
    // obtain their dimensions
    for (let i = 0; i < this.particles.length; i++) {
      var p = this.particles[i]

      let particleStyle = window.getComputedStyle(document.getElementById(p.id))
      let particleHeight = parseFloat(particleStyle.height)
      let particleWidth = parseFloat(particleStyle.width)

      // Relocate particles to random position within container
      p.x = [Math.random() * (this.boxWidth - particleWidth), Math.random() * (this.boxHeight - particleHeight)]

      // Update particle dimensions
      p.dim = [particleWidth, particleHeight]
    }


    let lastTime = performance.now()
    const update = () => {
      const time = performance.now()


      if (!this.hovered && !this.paused) {
        // Update particles


        var sty = window.getComputedStyle(document.getElementById("bouncing-container"))
        this.boxHeight = parseFloat(sty.height)
        this.boxWidth = parseFloat(sty.width)
        this.configKonva = {width: this.boxWidth, height: this.boxHeight}

        for (let i = 0; i < this.particles.length; i++) {

          var p = this.particles[i]

          // Move by velocity vector
          p.x[0] += p.v[0] * (time - lastTime)
          p.x[1] += p.v[1] * (time - lastTime)

          // Collision with container 
          // Relocate particle to prevent getting locked halfway outside box
          if (p.x[0] + p.dim[0] > this.boxWidth) {
            p.x[0] = this.boxWidth - p.dim[0]
            p.v[0] = - p.v[0]
          } else if (p.x[0] < 0) {
            p.x[0] = 0
            p.v[0] = - p.v[0]
          }
    
          // Same as above but with height
          if (p.x[1] + p.dim[1] > this.boxHeight) {
            p.x[1] = this.boxHeight - p.dim[1]
            p.v[1] = - p.v[1]
          } else if (p.x[1] < 0) {
            p.x[1] = 1
            p.v[1] = - p.v[1]
          }
        }

        // Update edges
        for (let i = 0; i < this.edges.length; i++) {
          var e = this.edges[i]
          let p1 = this.particles[e.nodes[0]]
          let p2 = this.particles[e.nodes[1]]

          // Get midpoints
          let x1 = p1.x[0] + p1.dim[0] / 2
          let y1 = p1.x[1] + p1.dim[1] / 2
          let x2 = p2.x[0] + p2.dim[0] / 2
          let y2 = p2.x[1] + p2.dim[1] / 2

          e.coords[0][0] = x1
          e.coords[0][1] = y1 
          e.coords[1][0] = x2
          e.coords[1][1] = y2
          
          this.lineConfigs[i].points = [x1, y1, x2, y2]
          this.lineConfigs[i].points = [x1, y1, x2, y2]
        }
      }
      lastTime = time
      this.handle = requestAnimationFrame(update)
      }

    update()
  },
  unmounted() {
    cancelAnimationFrame(this.handle)
  },
  methods: {
    handleClick() {
      console.log('hello');
      this.paused = !this.paused
    }
  }
}
</script>

<template>
  <div id="bouncing-container" ref="container" v-on:click="handleClick">
    <v-stage :config="configKonva">
      <v-layer>
        <v-line v-for="c in lineConfigs" :key="c.points" 
          :config="c"
          ></v-line>
      </v-layer>
    </v-stage>


    <div v-for="p in particles" 
         :key="p.id" 
         :id="p.id" class="bouncing-page" 
         :style="{'left': p.x[0] + 'px', 'top': p.x[1] + 'px'}"
          v-on:mouseover="hovered = true" 
          v-on:mouseleave="hovered = false"
        >
      <span v-if="p.noLink">{{ p.text }}</span>
      <RouterLink v-else :to="p.path"> {{p.text}} </RouterLink>
    </div>
  </div>
</template>

<style scoped>
canvas {
  width: 100%; 
  height: 100%;
}

#bouncing-container {
  width: calc(100vw - 2 * var(--side-padding));
  height: calc(100vh - 2 * var(--top-padding));
  border: 1px solid var(--color-text);
  overflow: hidden;
  background-color: var(--color-background-mute);
}

#bouncing-container svg {
  /* Exact dimensions of #bouncing-container */
  width: 100%;
  height: 100%;
  z-index: 0;
}

line {
  stroke-width: 1px;
  stroke: var(--color-text);
}


.bouncing-page {
  font-size: 20px;
  font-family: 'Computer Modern Typewriter', monospace;
  border: 1px solid var(--color-text);
  padding: 5px;
  position: absolute; 
  background-color: var(--color-background);
  z-index: 1;
}

a.router-link-exact-active {
  color: var(--color-text);
}

a.router-link-exact-active:hover {
  text-decoration: none;
  cursor: default;
}


@media (max-width: 1024px) {
  #bouncing-container {
    position: fixed;
    width: 100vw;
    height: 100%;
    border: 0;
  }
}

</style>

