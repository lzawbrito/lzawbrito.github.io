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
            console.log(b)
            return -(parseInt(a[0]) - parseInt(b[0]))
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
        <h3 id="year"> {{ y[0] }} </h3> 
          <p v-for="p in y[1]" :key="p.citationKey">
            <p id="title">{{ p.entryTags.TITLE }}</p>
            <p id="authors" v-html="formatAuthors(p.entryTags.AUTHOR)"></p>
            <span id="journal" v-if="p.entryTags.JOURNAL"> {{p.entryTags.JOURNAL}}</span>
            <span v-if="p.entryTags.DOI" id="arxiv-link">
              [<a :href="p.entryTags.URL" target="_blank">{{ p.entryTags.DOI.split("/").slice(-1)[0] }}</a>]
            </span>
            <span v-else-if="p.entryTags.EPRINT" id="arxiv-link">
              [<a :href="p.entryTags.URL" target="_blank">{{ p.entryTags.ARCHIVEPREFIX + ":" + p.entryTags.EPRINT }}</a>]
            </span>
            <hr/>
          </p>
      </div>
    </div>
	</Transition>
</template>

<style scoped>
  #year { 
    margin-top: 5px;
  }

  #title {
    font-style: italic;
    font-weight: bold;
    padding-bottom: 0px;
    /* color: rgb(118, 101, 165); */
  }

  #authors { 
    padding-bottom: 0px;
    color: var(--color-text-soft);
  }

  #journal {
    color: var(--color-text-soft);
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
    font-family: var(--mono-font), monospace;
  }

  span {
    /* white-space: pre-wrap; */
  }

  hr {
    border: 0px;
    height: 1px;
    margin: 0px;
    margin-top: 8px; 
    margin-bottom: 0px;
    background-color: var(--color-background-soft);
  }
  </style>