let opts = {
        'help': {
            // eslint-disable-next-line no-unused-vars
            filterFunc: (arg, art) => false,
        },
        'year': {
            filterFunc: (arg, art) => art.date.includes(arg),
        },
        'sort': {
            sortFunc: function (arg, art1, art2) {
                if (arg === 'latest') {
                    return new Date(art2.date) - new Date(art1.date);
                } else if (arg === 'oldest') {
                    return new Date(art1.date) - new Date(art2.date);
                }
            }
        }
    }

function containsStringWords(str, text) {
    let wordList = str.toLowerCase().replace(/[^\w\s]/gi, '').split(' ')
    let formattedText = text.toLowerCase().replace(/[^\w\s]/gi, '')
    return wordList.reduce((acc, cur) => acc && (formattedText.includes(cur)), true)
}

function stripOpts(str) {
    let words = str.split(" ")
    let filteredWords = words.filter((s) => !(s.startsWith('--')))
    return filteredWords.join(' ')
}

function parseOptions(str) {
    // console.log("splitting");
    let words = str.split(" ")
    // console.log("filtering for -- ");
    let filteredWords = words.filter((s) => s.startsWith('--'))

    function handleOpt(opt) {
        if (!(opt.includes('='))) {
            return { opt: opt.replace('--', '') }
        }
        let splitOpt = opt.split('=')
        return {
            opt: splitOpt[0].replace('--', ''), 
            arg: splitOpt[1]
        }
    }
    return filteredWords.map((i) => handleOpt(i))
}

function filterOptions(parsedOpts, a) {
    let matches = true
    for (let i = 0; i < parsedOpts.length; i++) {
        const o = parsedOpts[i];
        if (!('filterFunc' in opts[o.opt])) {
            continue
        }
        matches = matches && opts[o.opt].filterFunc(o.arg, a)
    }
    return matches
}

export function searchFilter(rawsearch, articles) {
    // console.log('handling empty search');

    // console.log("parsing options");
    let parsedOpts = parseOptions(rawsearch)
    let exitCode = 0

    // console.log("checking if opts includes help");
    if (parsedOpts.some(e => e.opt === 'help')) {
        exitCode = 1
    } 

    let sortedArticles = articles.sort((a, b) => opts.sort.sortFunc('latest', a, b))

    if (rawsearch === "") {
        return [0, sortedArticles]
    }

    // console.log("checking for illegal opts"); 
    for (let i = 0; i < parsedOpts.length; i++) {
        let o = parsedOpts[i];
        if (!(o.opt in opts)) {
            return exitCode = 2
        }
        if (o.opt === 'sort' && !(o.arg === 'latest')) {
            if (o.arg === 'oldest')
                articles = articles.sort((a, b) => opts.sort.sortFunc(o.arg, a, b))
        } 
    }

    // console.log("filtering");
    let filteredArticles = articles.filter(function (a) {
        return filterOptions(parsedOpts, a) && containsStringWords(
                stripOpts(rawsearch), a.title + ' ' + a.subtitle + ' ' + a.content
            )
    })
    return [exitCode, filteredArticles]
}

