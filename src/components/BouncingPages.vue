<script setup>
import { RouterLink } from 'vue-router'
</script>

<script>
import { flattenSections } from './scripts/routeTools'
import { sections, MAIN_PATH } from '../router/index'
const avgSpeed = 1 / 30
// Cap the timestep so particles don't jump after the tab was in the background
const maxStep = 50

// Make particles out of routes, and edges between them
function makeGraph() {
  const [rs, es] = flattenSections(sections, MAIN_PATH)
  const particles = rs.map((r, i) => {
    // Random velocity
    let v = [Math.random() * avgSpeed, Math.random() * avgSpeed]
    return { id: i, x: [10, 10], v: v, dim: [0, 0], text: r.name, path: r.path, noLink: r.noLink }
  })
  const edges = es.map((e) => ({ nodes: e, points: [0, 0, 0, 0] }))
  return { particles, edges }
}

export default {
  data() {
    return {
      hovered: false,
      paused: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      boxHeight: 0,
      boxWidth: 0,
      ...makeGraph(),
    }
  },
  mounted() {
    this.measure()
    // Place particles at random positions inside the container, retrying a
    // few times to avoid starting on top of one another
    this.particles.forEach((p, i) => {
      for (let tries = 0; tries < 50; tries++) {
        p.x = [Math.random() * (this.boxWidth - p.dim[0]), Math.random() * (this.boxHeight - p.dim[1])]
        const placed = this.particles.slice(0, i)
        if (placed.every((q) => this.overlap(p, q).some((o) => o <= 0))) break
      }
    })
    this.updateEdges()

    window.addEventListener('resize', this.measure)
    // Particle sizes change once the web font loads
    document.fonts.ready.then(() => this.measure())

    let lastTime = performance.now()
    const update = () => {
      const time = performance.now()
      if (!this.hovered && !this.paused) {
        this.step(Math.min(time - lastTime, maxStep))
      }
      lastTime = time
      this.handle = requestAnimationFrame(update)
    }
    update()
  },
  unmounted() {
    cancelAnimationFrame(this.handle)
    window.removeEventListener('resize', this.measure)
  },
  methods: {
    // Read container and particle dimensions from the DOM; only needed on
    // mount, resize, and font load rather than every frame
    measure() {
      const container = this.$refs.container
      if (!container) return
      this.boxWidth = container.clientWidth
      this.boxHeight = container.clientHeight
      const els = container.querySelectorAll('.bouncing-page')
      this.particles.forEach((p, i) => {
        p.dim = [els[i].offsetWidth, els[i].offsetHeight]
      })
      // Pull particles back inside if the container shrank
      this.step(0)
    },
    step(dt) {
      // Move by velocity vector
      for (const p of this.particles) {
        p.x[0] += p.v[0] * dt
        p.x[1] += p.v[1] * dt
      }

      // Collisions between particles
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          this.collide(this.particles[i], this.particles[j])
        }
      }

      for (const p of this.particles) {
        // Collision with container
        // Relocate particle to prevent getting locked halfway outside box.
        // Velocity signs are set rather than flipped so a particle pushed into
        // a wall by another one doesn't get stuck reversing every frame
        if (p.x[0] + p.dim[0] > this.boxWidth) {
          p.x[0] = this.boxWidth - p.dim[0]
          p.v[0] = -Math.abs(p.v[0])
        } else if (p.x[0] < 0) {
          p.x[0] = 0
          p.v[0] = Math.abs(p.v[0])
        }

        // Same as above but with height
        if (p.x[1] + p.dim[1] > this.boxHeight) {
          p.x[1] = this.boxHeight - p.dim[1]
          p.v[1] = -Math.abs(p.v[1])
        } else if (p.x[1] < 0) {
          p.x[1] = 0
          p.v[1] = Math.abs(p.v[1])
        }
      }
      this.updateEdges()
    },
    // Overlap of two particles along each axis (positive if they intersect)
    overlap(a, b) {
      return [0, 1].map((k) =>
        Math.min(a.x[k] + a.dim[k], b.x[k] + b.dim[k]) - Math.max(a.x[k], b.x[k]))
    },
    // Elastic collision between equal-mass boxes: separate them along the axis
    // of least overlap and swap their velocity components along it
    collide(a, b) {
      const o = this.overlap(a, b)
      if (o[0] <= 0 || o[1] <= 0) return
      const k = o[0] < o[1] ? 0 : 1
      // Which way b sits relative to a along the axis
      const dir = (b.x[k] + b.dim[k] / 2) >= (a.x[k] + a.dim[k] / 2) ? 1 : -1
      a.x[k] -= dir * o[k] / 2
      b.x[k] += dir * o[k] / 2
      // Only exchange momentum if they are moving towards each other
      if ((b.v[k] - a.v[k]) * dir < 0) {
        const v = a.v[k]
        a.v[k] = b.v[k]
        b.v[k] = v
      }
    },
    // Connect the midpoints of each edge's particles
    updateEdges() {
      for (const e of this.edges) {
        const [p1, p2] = e.nodes.map((n) => this.particles[n])
        e.points = [
          p1.x[0] + p1.dim[0] / 2, p1.x[1] + p1.dim[1] / 2,
          p2.x[0] + p2.dim[0] / 2, p2.x[1] + p2.dim[1] / 2,
        ]
      }
    },
    togglePause() {
      this.paused = !this.paused
    }
  }
}
</script>

<template>
  <div id="bouncing-container" ref="container" v-on:click="togglePause">
    <button class="fine-print pause-toggle" v-on:click.stop="togglePause">
      {{ paused ? '(click/tap to resume)' : '(click/tap to pause)' }}
    </button>
    <svg class="edges" :width="boxWidth" :height="boxHeight" aria-hidden="true">
      <line v-for="(e, i) in edges" :key="i"
        :x1="e.points[0]" :y1="e.points[1]" :x2="e.points[2]" :y2="e.points[3]" />
    </svg>

    <div v-for="p in particles"
         :key="p.id"
         class="bouncing-page"
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
#bouncing-container {
  position: relative;
  width: calc(100vw - 2 * var(--side-padding));
  height: calc(100vh - 2 * var(--top-padding));
  border: 1px solid var(--color-text);
  overflow: hidden;
  background-color: var(--color-background-mute);
}

.pause-toggle {
  position: relative;
  z-index: 2;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.edges {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

line {
  stroke-width: 1px;
  stroke: grey;
}


.bouncing-page {
  font-size: 20px;
  font-family: var(--mono-font), monospace;
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
