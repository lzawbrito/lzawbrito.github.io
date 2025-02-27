<script>
import LoadingAnim from './LoadingAnim.vue'
import bibtexParse from 'bibtex-parser-js'

	export default {
    props: {
      n: { // Number of publications to fetch.
        default: 5
      },
    },
    data() {
        return {
            pubs: null
        };
    },
    methods: {
        handlePubs(p) {
          let pubs = bibtexParse.toJSON(p)
          const groupedPubs = pubs.reduce((groups, item) => {
            const group = (groups[item.entryTags.YEAR] || [])
            group.push(item)
            groups[item.entryTags.YEAR] = group 
            return groups 
          }, {})
          this.pubs = Object.entries(groupedPubs).sort((a, b) => {
            return parseInt(a[0]) < parseInt(b[0])
          })
        },
        async fetchData() {
            this.releases = null;
            const res = await fetch(`/docs/pubs.bib`);
            const p = await res.text()
            await this.handlePubs(p);
        },
        formatAuthors(a) {
          let namelist = a.split(' and ')
          let formNames = namelist.map((n) => {
            let name = n.split(', ').reverse().join(' ')
            if (name === 'Lucas Z. Brito') {
              return '<b>Lucas Z. Brito</b>'
            }
            return name 
          })
          return formNames.join(', ')
        }
    },
    mounted() {
        this.fetchData();
    },
    components: { LoadingAnim }
}
</script>
<template>
	<Transition>
    <LoadingAnim v-if="!pubs"/>
    <div v-else>
      <div v-for="y in pubs.slice(0, n)" :key="y[0]">
        <h3> {{ y[0] }} </h3> 
        <ul>
          <li v-for="p in y[1]" :key="p.citationKey">
            <span v-html="formatAuthors(p.entryTags.AUTHOR)"></span>
            <span>, </span>
            <span id="title">"{{ p.entryTags.TITLE }}," </span>
            <span v-if="p.entryTags.JOURNAL"> {{p.entryTags.JOURNAL}}</span>
            <span v-if="p.entryTags.VOLUME">&nbsp{{ p.entryTags.VOLUME }}</span>
            <span v-if="p.entryTags.PAGES">, {{ p.entryTags.PAGES }}</span>
            <span>&nbsp({{ p.entryTags.YEAR }}). </span>
            <span id="arxiv-link">
              [<a :href="p.entryTags.URL" target="_blank">{{ p.entryTags.DOI }}</a>]
            </span>
          </li>
        </ul>
      </div>
      
    </div>
	</Transition>
</template>

<style scoped>
  #title {
    font-style: italic;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  #arxiv-link {
    font-family: 'Computer Modern Typewriter', monospace;
  }

  span {
    white-space: pre-wrap;
  }

  </style>