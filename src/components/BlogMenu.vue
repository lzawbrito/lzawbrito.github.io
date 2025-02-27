<script>
  import BlogEntry from '../components/BlogEntry.vue'
  import LoadingAnim from './LoadingAnim.vue'
  import { searchFilter } from './scripts/searchAlgorithm'

  export default {
    components: {
      BlogEntry, 
      LoadingAnim
    },
    data() {
      return {
        searchText: '',
        articles: null,
        searchExitCode: 0,
        helpText: `Search by words that occur in articles. Use -- to set filters and sort, separate by spaces. E.g., 
>>> --year=2022 --sort=recent kripke naming necessity philosophy 

--year : Year of article. Ex: '--year=2022'.
--sort : Sort articles. Must be 'latest' or 'oldest'. Ex: '--sort=oldest'.
--help : Display this text.
        `
      }
    },
    watch: {
      // eslint-disable-next-line no-unused-vars
      searchText(val, old) {
        this.fetchData(val)
      }
    },
    methods: {
      getDate(str) {
        return new Date(str).toDateString()
      },
      async fetchData() {
        this.articles = null
        const res = await fetch(
          `/docs/articles/index.json`
        )

        let unsorted = await res.json()
        let searchResult = searchFilter(this.searchText, unsorted)
        this.searchExitCode = searchResult[0]
        this.articles = searchResult[1]
      }
  },
  mounted() {
    this.fetchData("")
  },
}
</script>

<template>
	<input 
		type="text" 
    v-model.lazy="searchText"
		placeholder="Search (try '--help')..."/>
  <Transition>
    <LoadingAnim v-if="!articles"/>
    <div v-else-if="(articles.length === 0) && (searchExitCode === 0)" :style="{position: 'relative'}">
      <p :style="{
          fontFamily: 'Courier New, monospace', 
          position: 'absolute'
        }" >No results... :(</p>
    </div>
    <div v-else-if="searchExitCode === 1" :style="{position: 'relative'}">
      <div :style="{
          fontFamily: 'Courier New, monospace', 
          position: 'absolute',
          whiteSpace: 'pre-wrap',
        }" >
      {{helpText}}
      </div>
    </div>
    <div v-else>
      <BlogEntry v-for="a in articles" 
        :key="a.path" :title="a.title" 
        :subtitle="a.subtitle" 
        :content="a.content" 
        :to="a.path"
        :date="getDate(a.date)"
        :time="a.time"
        />
    <!-- <p class="fine-print">You've reached the end of the blog... don't you have anything else better to do??</p> -->
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

	input {
		position: sticky;
		z-index: 10;
		/* width: 100%; */
		top: 20px;
		background-color: var(--color-background-mute);
		color: var(--color-text);
		border: 1px solid transparent;
		font-family: var(--mono-font), monospace;
		font-size: 1.2rem;
		margin-bottom: 20px;
    padding: 5px;
		border-radius: 0px;
		box-shadow: 0px 0px 20px 10px var(--color-background);
		-webkit-appearance: none;
	}

	input:focus {
		outline: none;
		border: 1px solid var(--color-border-hover);
	}

	@media (max-width: 1024px) {
		input {
			position: fixed;
			margin-left: 70px;
			top: 10px;
			width: calc(100vw - 70px - 2 * 20px);
			font-size: 1rem;
		}
	}


</style>