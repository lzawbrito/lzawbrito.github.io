<script setup>
import { RouterLink } from 'vue-router'
</script>

<script>
import { flattenSections } from './scripts/routeTools'
import { sections, MAIN_PATH } from '../router/index'
const avgSpeed = 1 / 30
// Cap the timestep so particles don't jump after the tab was in the background
const maxStep = 50
// Spring constant for edges (1/ms^2); sets an oscillation period of ~8s
const stiffness = 3e-7
// How quickly (ms) particle speeds relax back towards avgSpeed, so the forces
// shape the motion without the graph either freezing or flying apart
const relaxTime = 1500
// Pointer movement (px) before a press counts as a drag rather than a click
const dragThreshold = 4
// Cap on the speed (px/ms) a released box can be thrown at
const maxThrow = 1.5
// Time constant (ms) for easing the simulation to a halt on hover or pause,
// and back up to speed afterwards; also used for drawing in on hover
const hoverEase = 200
// Fraction of the gap a hovered box draws its children in by
const gatherAmount = 0.2
// Closest (px) drawn-in boxes come to touching the box they are drawn towards
const gatherMargin = 8

// Make particles out of routes, and edges between them
function makeGraph() {
  const [rs, es] = flattenSections(sections, MAIN_PATH)
  const particles = rs.map((r, i) => {
    // Random velocity
    let v = [Math.random() * avgSpeed, Math.random() * avgSpeed]
    return {
      id: i, x: [10, 10], v: v, dim: [0, 0], text: r.name, path: r.path, noLink: r.noLink,
      parent: null, children: [],
      // Visual displacement from the simulated position, from hovering
      offset: [0, 0],
    }
  })
  for (const [a, b] of es) {
    particles[b].parent = a
    particles[a].children.push(b)
  }
  const edges = es.map((e) => ({ nodes: e, points: [0, 0, 0, 0] }))
  return { particles, edges }
}

export default {
  data() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return {
      // The box under the pointer, if any
      hoverTarget: null,
      reducedMotion,
      paused: reducedMotion,
      boxHeight: 0,
      boxWidth: 0,
      restLength: 0,
      // The box being dragged, if any, and the pointer's motion
      drag: null,
      ...makeGraph(),
    }
  },
  mounted() {
    this.measure()
    this.place()

    window.addEventListener('resize', this.measure)
    // Particle sizes change once the web font loads
    document.fonts.ready.then(() => this.measure())

    let lastTime = performance.now()
    // Rate the simulation runs at relative to real time. Starts at rest if
    // already paused (reduced motion), so there's no movement at all
    let timeScale = this.paused ? 0 : 1
    const update = () => {
      const time = performance.now()
      const dt = Math.min(time - lastTime, maxStep)
      // Pausing slows the simulation to a halt, as does hovering so links are
      // easy to click (except while dragging)
      const target = this.paused || (this.hoverTarget && !this.drag) ? 0 : 1
      timeScale += (target - timeScale) * (1 - Math.exp(-dt / hoverEase))
      // Snap once close, so it comes to a true stop rather than creeping
      if (Math.abs(target - timeScale) < 0.01) timeScale = target
      if (timeScale > 0) {
        this.step(dt * timeScale)
      }
      // Drawing in runs in real time, since the simulation is stopped while
      // it happens
      this.updateGather(dt)
      this.updateEdges()
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
      // Natural edge length scales with the container
      this.restLength = Math.min(this.boxWidth, this.boxHeight) / 6
      const els = container.querySelectorAll('.bouncing-page')
      this.particles.forEach((p, i) => {
        p.dim = [els[i].offsetWidth, els[i].offsetHeight]
      })
      // Pull particles back inside if the container shrank
      this.step(0)
    },
    // Lay the tree out roughly where the forces would settle it, so the graph
    // doesn't lurch together on load: the root goes somewhere near the middle,
    // and each child sits about one settled edge length from its parent,
    // fanned out away from the grandparent. Retries jitter the position a few
    // times to avoid starting on top of already-placed boxes.
    place() {
      const ps = this.particles
      // Springs settle somewhat longer than restLength because of the repulsion
      const spacing = 1.5 * this.restLength
      const center = (p) => [p.x[0] + p.dim[0] / 2, p.x[1] + p.dim[1] / 2]
      const setCenter = (p, c) => {
        p.x = [
          Math.min(Math.max(c[0] - p.dim[0] / 2, 0), this.boxWidth - p.dim[0]),
          Math.min(Math.max(c[1] - p.dim[1] / 2, 0), this.boxHeight - p.dim[1]),
        ]
      }
      const placed = []
      const tryPlace = (p, randomCenter) => {
        for (let tries = 0; tries < 50; tries++) {
          setCenter(p, randomCenter())
          if (placed.every((q) => this.overlap(p, q).some((o) => o <= 0))) break
        }
        placed.push(p)
      }

      tryPlace(ps[0], () => [
        this.boxWidth * (0.35 + 0.3 * Math.random()),
        this.boxHeight * (0.35 + 0.3 * Math.random()),
      ])
      // Breadth-first from the root, so each parent is placed before its children
      const queue = [0]
      while (queue.length) {
        const i = queue.shift()
        const kids = ps[i].children
        if (!kids.length) continue
        const c = center(ps[i])
        // The root fans its children over the full circle; others over a
        // half-circle facing away from their own parent
        let base = Math.random() * 2 * Math.PI
        let arc = 2 * Math.PI
        if (ps[i].parent !== null) {
          const pc = center(ps[ps[i].parent])
          base = Math.atan2(c[1] - pc[1], c[0] - pc[0]) - Math.PI / 2
          arc = Math.PI
        }
        kids.forEach((k, n) => {
          const slot = base + arc * (n + 0.5) / kids.length
          tryPlace(ps[k], () => {
            const angle = slot + (Math.random() - 0.5) * arc / kids.length
            const d = spacing * (0.8 + 0.4 * Math.random())
            return [c[0] + d * Math.cos(angle), c[1] + d * Math.sin(angle)]
          })
          queue.push(k)
        })
      }
    },
    step(dt) {
      this.applyForces(dt)

      const held = this.drag?.p
      if (held) {
        // The held box moves with the pointer; giving it the pointer's
        // velocity lets it knock other boxes along when they collide. The
        // velocity decays so holding still and releasing doesn't throw it
        const decay = Math.exp(-dt / 100)
        this.drag.vel = this.drag.vel.map((v) => v * decay)
        held.v = [...this.drag.vel]
      }

      // Move by velocity vector
      for (const p of this.particles) {
        if (p === held) continue
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
    },
    // Force-directed layout: springs pull connected particles towards
    // restLength apart, and every pair repels like charges
    applyForces(dt) {
      const ps = this.particles
      const L = this.restLength
      const repulsion = stiffness * L ** 3
      // Softening keeps the repulsion finite when centers nearly coincide
      const softening = (L / 4) ** 2
      const centers = ps.map((p) => [p.x[0] + p.dim[0] / 2, p.x[1] + p.dim[1] / 2])
      const acc = ps.map(() => [0, 0])
      // Add an acceleration of magnitude f to j along the i -> j direction,
      // and the opposite to i
      const push = (i, j, f, dx, dy, d) => {
        acc[i][0] -= f * dx / d
        acc[i][1] -= f * dy / d
        acc[j][0] += f * dx / d
        acc[j][1] += f * dy / d
      }

      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = centers[j][0] - centers[i][0]
          const dy = centers[j][1] - centers[i][1]
          const d2 = dx * dx + dy * dy + softening
          push(i, j, repulsion / d2, dx, dy, Math.sqrt(d2))
        }
      }

      for (const e of this.edges) {
        const [i, j] = e.nodes
        const dx = centers[j][0] - centers[i][0]
        const dy = centers[j][1] - centers[i][1]
        const d = Math.hypot(dx, dy) || 1
        push(i, j, -stiffness * (d - L), dx, dy, d)
      }

      const relax = Math.min(dt / relaxTime, 1)
      ps.forEach((p, i) => {
        p.v[0] += acc[i][0] * dt
        p.v[1] += acc[i][1] * dt
        const speed = Math.hypot(p.v[0], p.v[1])
        if (speed > 0) {
          const scale = 1 + (avgSpeed / speed - 1) * relax
          p.v[0] *= scale
          p.v[1] *= scale
        }
      })
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
      // A held box doesn't budge; the other one takes the whole separation
      const held = this.drag?.p
      const share = a === held ? [0, 1] : b === held ? [1, 0] : [0.5, 0.5]
      a.x[k] -= dir * o[k] * share[0]
      b.x[k] += dir * o[k] * share[1]
      // Only exchange momentum if they are moving towards each other
      if ((b.v[k] - a.v[k]) * dir < 0) {
        const v = a.v[k]
        a.v[k] = b.v[k]
        b.v[k] = v
      }
    },
    // Hovering a box draws its children in towards it, as a purely visual
    // offset on top of the stopped simulation. The hovered box itself never
    // moves, so a drawn-in box stays put under the pointer when moved onto,
    // rather than sliding back out; every other box eases to its target
    updateGather(dt) {
      const ps = this.particles
      const h = this.hoverTarget
      const held = this.drag?.p
      const ease = 1 - Math.exp(-dt / hoverEase)
      const target = ps.map(() => [0, 0])

      // Pull each child along the line towards where the hovered box is shown
      if (h && !held && !this.reducedMotion) {
        const hc = [0, 1].map((k) => h.x[k] + h.offset[k] + h.dim[k] / 2)
        for (const k of h.children) {
          const c = ps[k]
          const dx = (c.x[0] + c.dim[0] / 2) - hc[0]
          const dy = (c.x[1] + c.dim[1] / 2) - hc[1]
          const d = Math.hypot(dx, dy) || 1
          // Center distance along this line at which the two boxes would
          // come within gatherMargin of touching; don't pull any closer
          const closest = Math.min(
            ((h.dim[0] + c.dim[0]) / 2 + gatherMargin) / Math.abs(dx / d),
            ((h.dim[1] + c.dim[1]) / 2 + gatherMargin) / Math.abs(dy / d))
          const pull = Math.min(gatherAmount * d, Math.max(0, d - closest)) / d
          target[k] = [-pull * dx, -pull * dy]
        }
      }

      ps.forEach((p, i) => {
        if (p === h || p === held) return
        p.offset = p.offset.map((o, k) => {
          const next = o + (target[i][k] - o) * ease
          return Math.abs(next - target[i][k]) < 0.1 ? target[i][k] : next
        })
      })
    },
    // Where a box is drawn: its simulated position plus any hover offset,
    // kept inside the container
    shown(p) {
      return [0, 1].map((k) => {
        const max = (k ? this.boxHeight : this.boxWidth) - p.dim[k]
        return Math.min(Math.max(p.x[k] + p.offset[k], 0), max)
      })
    },
    // Connect the midpoints of each edge's particles
    updateEdges() {
      for (const e of this.edges) {
        const [p1, p2] = e.nodes.map((n) => this.particles[n])
        const [s1, s2] = [this.shown(p1), this.shown(p2)]
        e.points = [
          s1[0] + p1.dim[0] / 2, s1[1] + p1.dim[1] / 2,
          s2[0] + p2.dim[0] / 2, s2[1] + p2.dim[1] / 2,
        ]
      }
    },
    startDrag(p, e) {
      if (e.button !== 0) return
      // Pick the box up from where it's shown, in case it's been pulled in
      p.x = this.shown(p)
      p.offset = [0, 0]
      const pos = [e.clientX, e.clientY]
      this.drag = {
        p,
        el: e.currentTarget,
        pointerId: e.pointerId,
        // Where in the box it was grabbed, so it doesn't jump to the pointer
        offset: [pos[0] - p.x[0], pos[1] - p.x[1]],
        start: pos,
        last: pos,
        lastTime: e.timeStamp,
        vel: [0, 0],
        moved: false,
      }
    },
    moveDrag(e) {
      const drag = this.drag
      if (!drag || e.pointerId !== drag.pointerId) return
      const pos = [e.clientX, e.clientY]
      if (!drag.moved &&
          Math.hypot(pos[0] - drag.start[0], pos[1] - drag.start[1]) > dragThreshold) {
        drag.moved = true
        // Only capture once it's a drag: capturing on press would retarget the
        // click to the box, so a plain click would never reach its link
        drag.el.setPointerCapture(e.pointerId)
      }
      if (!drag.moved) return

      // Smooth the pointer velocity over the last ~40ms of motion
      const dt = e.timeStamp - drag.lastTime
      if (dt > 0) {
        const a = Math.min(dt / 40, 1)
        drag.vel = drag.vel.map((v, k) => v + ((pos[k] - drag.last[k]) / dt - v) * a)
      }
      drag.last = pos
      drag.lastTime = e.timeStamp
      drag.p.x = [pos[0] - drag.offset[0], pos[1] - drag.offset[1]]
      // While paused, still shove other boxes aside and keep within the walls
      if (this.paused) this.step(0)
    },
    endDrag(e) {
      const drag = this.drag
      if (!drag || e.pointerId !== drag.pointerId) return
      this.drag = null
      if (!drag.moved) return

      // Throw the box with the pointer's velocity
      const speed = Math.hypot(...drag.vel)
      const scale = e.type === 'pointerup' && speed > 0 ? Math.min(1, maxThrow / speed) : 0
      drag.p.v = drag.vel.map((v) => v * scale)
      // The pointer is still over the box, but let it fly rather than pausing
      this.hoverTarget = null
      // Swallow the click that ends the drag, so it neither follows the link
      // nor toggles pause. Cleared afterwards in case no click arrives
      this.suppressClick = true
      setTimeout(() => { this.suppressClick = false })
    },
    swallowDragClick(e) {
      if (!this.suppressClick) return
      e.preventDefault()
      e.stopPropagation()
      this.suppressClick = false
    },
    togglePause() {
      this.paused = !this.paused
    }
  }
}
</script>

<template>
  <div id="bouncing-container" ref="container"
       v-on:click="togglePause" v-on:click.capture="swallowDragClick">
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
         :class="{ dragging: drag && drag.p === p }"
         :style="{'left': shown(p)[0] + 'px', 'top': shown(p)[1] + 'px'}"
          v-on:mouseover="hoverTarget = p"
          v-on:mouseleave="hoverTarget = null"
          v-on:pointerdown="startDrag(p, $event)"
          v-on:pointermove="moveDrag"
          v-on:pointerup="endDrag"
          v-on:pointercancel="endDrag"
          v-on:dragstart.prevent
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
  cursor: grab;
  user-select: none;
  /* Let touch drags move the box instead of scrolling the page */
  touch-action: none;
}

.bouncing-page.dragging {
  cursor: grabbing;
  z-index: 2;
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
