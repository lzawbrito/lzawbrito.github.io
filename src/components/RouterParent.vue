<script>
import { isFirstRoute } from './scripts/routeTools'
export default {
  props: ['name'],
  data() {
   return {
      mouseOver: false,
      atParentRoute: false,
      childrenDisplay: 'none',
    }
  },
  mounted() {
    this.checkRoute()
  },
  watch: {
    $route() {
      this.checkRoute()
    }
  },
  methods: {
    checkRoute() {
      this.atParentRoute = isFirstRoute(this.$route.path, this.name)
      this.updateChildrenDisplay()
    },
    handleMouseOver() {
      this.mouseOver = true
      this.updateChildrenDisplay()
    },
    handleMouseLeave() {
      this.mouseOver = false
      this.updateChildrenDisplay()
    },
    updateChildrenDisplay() {
      this.childrenDisplay = (this.mouseOver) ? 'flex' : 'none' // don't stay displayed if on parent route
    }
  }
}
</script>


<template>
  <div v-on:mouseover="handleMouseOver()" v-on:mouseleave="handleMouseLeave()">
    <pre v-if="mouseOver && !(atParentRoute)" class="parent">> {{ name }}</pre>
    <pre v-else-if="atParentRoute" class="parent-active">> {{ name }}</pre>
    <pre v-else class="parent">  {{ name }} </pre>
    <div :style="{'display': childrenDisplay}" id="hover-menu">
      <hr class="brace brace-left">
      <div id="children-menu">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>

.parent {
  font-family: 'Computer Modern Typewriter', monospace;
  color: var(--link)
}

.parent-active {
  color: var(--color-text);
  font-family: 'Computer Modern Typewriter', monospace;
}

#hover-menu {
  flex-direction: row;
  position: absolute;
  left: 4em;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 40px;
  margin: 0 auto;
  z-index: 0;
}

#children-menu {
  padding-left: 0px;
}

</style>
<style lang="scss" scoped>
  @import "./styles/braces.scss";
</style>