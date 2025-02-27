<script>
  let timePerDot = 0.5

  export default {
    data() {
      return {
        dots: ''
      }
    },
    mounted() {
      const update = () => {
        // console.log(t)
        if (this.dots.length === 3) {
          this.dots = ''
        } else {
          this.dots = this.dots.concat('.')
        }
        // startTime = t
        this.handle = requestAnimationFrame(() => setTimeout(update, 1000 * timePerDot))
      }
      update()
    },
    unmounted() {
      cancelAnimationFrame(this.handle)
    },
  }
</script>

<template>
  <div id="loading-wrapper">
    <div id="loading">
      Loading{{ dots }}
    </div>
  </div>
</template>

<style scoped>
  #loading-wrapper {
    position: relative
  }

  #loading {
    font-family: 'Computer Modern Typewriter', monospace;
    position: absolute;
  }
  
</style>